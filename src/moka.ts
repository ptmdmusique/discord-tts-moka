import { Client, Intents, Message } from "discord.js";
import {
  doesMokaSupportCmd,
  isMokaConfigCmd,
  isMokaTextCmd,
} from "./data/moka-cmd";
import { mokaToken } from "./utils/env";
import { logError, logInfo } from "./utils/logger.util";
import {
  getTextFromMokaCmd,
  handleMokaConfigCmd,
} from "./utils/moka-cmd-handler";
import { nanoid } from "nanoid";

export const mokaGlobalConfig = {
  cmdPrefix: "~",
};

const handleNewMessage = (client: Client) => (message: Message) => {
  try {
    if (
      client.user?.id === message.author.id ||
      !message.content.startsWith(mokaGlobalConfig.cmdPrefix)
    ) {
      return;
    }

    const [cmd, ...args] = message.content
      .slice(mokaGlobalConfig.cmdPrefix.length)
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
  } catch (error) {
    const errId = nanoid();
    logError(error as any, `Moka message handler ${errId}`);
    message.channel.send(
      `Úi, lỗi gì trên server nè, nhớ hú admin với mã ${errId} nha ヾ(≧へ≦)〃`,
    );
  }
};

export const startMokaBot = async () => {
  const mokaClient = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });

  await mokaClient.login(mokaToken);

  // --- Handlers
  mokaClient.on("ready", () => {
    logInfo(`Moka is ready! Name: ${mokaClient.user?.username}`);
  });

  mokaClient.on("messageCreate", handleNewMessage(mokaClient));

  // ---
};
