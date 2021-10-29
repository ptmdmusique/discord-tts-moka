import { Client, Message } from "discord.js/typings/index.js";
import { MokaConfigCmd, MokaTextCmd } from "../data/moka-cmd";
import { mokaGlobalConfig } from "../moka";

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

        mokaGlobalConfig.cmdPrefix = args[0];
        message.channel.send(
          `Từ giờ prefix mới là: "${args[0]}" hén ヽ（≧□≦）ノ`,
        );
        return;
    }
  };
