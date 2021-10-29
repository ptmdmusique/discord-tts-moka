import { Client, Message } from "discord.js/typings/index.js";
import { MokaSupportedCmd } from "../data/moka-cmd";

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
  (client: Client, message: Message) =>
  (cmd: MokaSupportedCmd, args: string[]) => {
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

        if (args.length > 0) {
          return `${args[0]}, ${greeting}!`;
        }

        return `Minasan, ${greeting}!`;

      case "ping":
        return "Pong ~";

      case "goodnight":
        return `Oyasumi, ${message.author.username} ~`;
    }
  };
