import {
  createAudioPlayer,
  VoiceConnection,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import { Client, Message, MessageEmbed } from "discord.js";
import { getLanguageHintEmbed } from "../data/embed";
import {
  isMokaSupportedCmdType,
  MokaConfigCmd,
  MokaGeneralCmd,
  MokaLanguageCmd,
  MokaSupportedCmdType,
  MokaTextCmd,
} from "../data/moka-cmd";
import { isSupportedLanguageCode, isSupportedVoiceName } from "../data/tts";
import { mokaBot } from "../resources/moka";
import { convertTextToSpeech, ttsConfig } from "../resources/tts";
import { bufferToAudioResource } from "../utils/audio";
import {
  isMessageFromVoiceChannel,
  joinVoiceChannelFromMessage,
} from "../utils/channel";
import { handleError } from "../utils/logge";
import { getUnimplementedMessage } from "../utils/misc";

const getDayType = (): "morning" | "afternoon" | "evening" => {
  const today = new Date();
  const curHr = today.getHours();

  if (curHr < 12) {
    return "morning";
  } else if (curHr < 18) {
    return "afternoon";
  }

  return "evening";
};

export const getTextFromMokaCmd =
  (client: Client, message: Message) => (cmd: MokaTextCmd, args: string[]) => {
    switch (cmd) {
      case "hello":
        let greeting: string;
        switch (getDayType()) {
          case "morning":
            greeting = "ohayo";
            break;
          case "afternoon":
            greeting = "konnichiwa";
            break;
          case "evening":
            greeting = "konbanwa";
            break;
        }

        const prefix = args.length > 0 ? args[0] : "Minasan";
        return `${prefix}, ${greeting}! (✿◠‿◠)`;

      case "ping":
        return "Pong ~ (✿◕‿◕✿)";

      case "goodnight":
        return `Oyasumi, ${message.author.username} ~ (^人^)`;
    }
  };

export const handleMokaConfigCmd =
  (client: Client, message: Message) =>
  (cmd: MokaConfigCmd, args: string[]) => {
    switch (cmd) {
      case "prefix":
        if (args.length === 0) {
          message.channel.send("Bạn ơi cho mình xin kí tự mới cho prefix hen");
          return;
        }

        mokaBot.cmdPrefix = args[0];
        message.channel.send(
          `Từ giờ prefix mới là: "${args[0]}" hén ヽ（≧□≦）ノ`,
        );
        return;
    }
  };

const subscribeNewAudioPlayer = (voiceConnection: VoiceConnection) => {
  const audioPlayer = createAudioPlayer();
  voiceConnection.subscribe(audioPlayer);
  mokaBot.audioPlayer = audioPlayer;

  return audioPlayer;
};

export const handleMokaGeneralCmd =
  (client: Client, message: Message) =>
  async (cmd: MokaGeneralCmd, args: string[]) => {
    switch (cmd) {
      case "join":
        if (!isMessageFromVoiceChannel(message)) {
          message.channel.send(
            `${message.author.username} nhớ vào voice channel trước nha ~`,
          );
          return;
        }

        const connection = joinVoiceChannelFromMessage(message);
        if (connection) {
          connection.on(VoiceConnectionStatus.Ready, () => {
            message.channel.send("Moka xin có mặt! ヾ(^▽^*)))");

            mokaBot.voiceConnection = connection;
            subscribeNewAudioPlayer(connection);
          });
        }

      case "help":
        const cmdType = args[0];
        if (!cmdType || !isMokaSupportedCmdType(cmdType)) {
          const embed = new MessageEmbed();
          // TODO: Finish this
          message.channel.send(getUnimplementedMessage("help"));
          return;
        }

        switch (cmdType) {
          case "language":
            message.channel.send({ embeds: [getLanguageHintEmbed()] });
            break;
          // TODO: Finish this
        }
        return;
    }
  };

export const handleMokaVoiceCmd =
  (client: Client, message: Message) => async (textList: string[]) => {
    if (!mokaBot.voiceConnection) {
      message.channel.send(
        `Bạn ơi mời mình vào voice channel bằng lệnh ${mokaBot.cmdPrefix}join trước nha ~`,
      );
      return;
    }

    let audioPlayer = mokaBot.audioPlayer;
    if (!audioPlayer) {
      audioPlayer = subscribeNewAudioPlayer(mokaBot.voiceConnection);
    }

    if (textList.length <= 0) {
      message.channel.send("Bạn ơi hình như chữ lạc giữa đường á ヽ（≧□≦）ノ");
      return;
    }

    try {
      const textStr = textList.join(" ");
      const speechBuffer = await convertTextToSpeech(textStr);

      if (speechBuffer) {
        const audioResource = bufferToAudioResource(speechBuffer);
        audioPlayer.play(audioResource);
      } else {
        message.channel.send("Bạn ơi bị gì rùi mình đọc hổng được ヽ（≧□≦）ノ");
      }
    } catch (error) {
      message.channel.send(handleError(error));
    }
  };

export const handleMokaLanguageCmd =
  (client: Client, message: Message) =>
  async (cmd: MokaLanguageCmd, args: string[]) => {
    let outMessage: string | undefined = undefined;

    const arg = args[0];
    switch (cmd) {
      case "lang-code":
        if (arg.length === 0) {
          outMessage = "Bạn ơi nhớ kèm theo **mã ngôn ngữ** hen.";
          break;
        }

        if (isSupportedLanguageCode(arg)) {
          ttsConfig.languageCode = arg;
        }
        break;
      case "voice":
        if (arg.length === 0) {
          outMessage = "Bạn ơi nhớ kèm theo **tên giọng nói** hen.";
          break;
        }

        if (isSupportedVoiceName(arg)) {
          ttsConfig.voiceName = arg;
        }
        break;
      case "lang-code":
      default:
        // Nothing much
        break;
    }

    if (outMessage) {
      outMessage = ttsConfig.getCurLanguageText();
    }

    message.channel.send(outMessage!);
  };
