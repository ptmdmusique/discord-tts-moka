import { Client, Intents, Message } from "discord.js";
import { Moka } from "../data/moka";
import {
  doesMokaSupportCmd,
  isMokaConfigCmd,
  isMokaGenerealCmd,
  isMokaTextCmd,
  isMokaVoiceCmd,
} from "../data/moka-cmd";
import {
  getTextFromMokaCmd,
  handleMokaConfigCmd,
  handleMokaGeneralCmd,
  handleMokaVoiceCmd,
} from "../handlers/moka-cmd.handler";
import { handleError, logInfo } from "../utils/logger.util";
import { envVariables } from "./env";

export let mokaBot: Moka;

const handleNewMessage = (client: Client) => (message: Message) => {
  try {
    if (
      client.user?.id === message.author.id ||
      !message.content.startsWith(mokaBot.cmdPrefix)
    ) {
      return;
    }

    const [cmd, ...args] = message.content
      .slice(mokaBot.cmdPrefix.length)
      .split(/ +/);

    if (!cmd) {
      message.channel.send(`Bạn ơi lệnh rớt giữa đường kìa (。﹏。*)`);
      return;
    }
    if (!doesMokaSupportCmd(cmd)) {
      message.channel.send(`Bạn ơi mình hông hiểu lệnh "${cmd}" (≧﹏ ≦)`);
      return;
    }

    if (isMokaTextCmd(cmd)) {
      const texter = getTextFromMokaCmd(client, message);
      message.channel.send(texter(cmd, args));
      return;
    }

    if (isMokaConfigCmd(cmd)) {
      handleMokaConfigCmd(client, message)(cmd, args);
      return;
    }

    if (isMokaGenerealCmd(cmd)) {
      handleMokaGeneralCmd(client, message)(cmd, args);
      return;
    }

    if (isMokaVoiceCmd(cmd)) {
      handleMokaVoiceCmd(client, message)(args);
      return;
    }
  } catch (error) {
    message.channel.send(handleError(error));
  }
};

export const startMokaBot = async () => {
  const mokaClient = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_PRESENCES,
    ],
  });

  await mokaClient.login(envVariables.mokaToken);

  // --- Handlers
  mokaClient.on("ready", () => {
    logInfo(`Moka is ready! Name: ${mokaClient.user?.username}`);
    mokaBot = new Moka();
  });

  mokaClient.on("messageCreate", handleNewMessage(mokaClient));
};
