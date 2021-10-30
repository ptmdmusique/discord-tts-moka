import {
  createAudioPlayer,
  VoiceConnection,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import { Client, Message } from "discord.js";
import { MokaConfigCmd, MokaGeneralCmd, MokaTextCmd } from "../data/moka-cmd";
import { mokaBot } from "../resources/moka";
import { convertTextToSpeech } from "../resources/tts";
import { bufferToAudioResource } from "../utils/audio.util";
import {
  isMessageFromVoiceChannel,
  joinVoiceChannelFromMessage,
} from "../utils/channel.util";
import { handleError } from "../utils/logger.util";

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
