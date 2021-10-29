import { Client, Intents, Message } from "discord.js";
import { doesMokaSupportCmd, isMokaTextCmd } from "./data/moka-cmd";
import { mokaToken } from "./utils/env";
import { logInfo } from "./utils/logger.util";
import { getTextFromMokaCmd } from "./utils/moka-cmd-handler";

let cmdPrefix = "~";

const handleNewMessage = (client: Client) => (message: Message) => {
  if (client.user?.id === message.author.id) {
    return;
  }

  if (!message.content.startsWith(cmdPrefix)) {
    return;
  }

  const [cmd, ...args] = message.content.slice(cmdPrefix.length).split(/ +/);

  if (!doesMokaSupportCmd(cmd)) {
    message.channel.send(`Bạn ơi mình hông hiểu lệnh ${cmd}`);
    return;
  }

  if (isMokaTextCmd(cmd)) {
    const texter = getTextFromMokaCmd(client, message);
    message.channel.send(texter(cmd, args));
    return;
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
