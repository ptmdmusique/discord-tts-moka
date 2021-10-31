import chalk, { Chalk } from "chalk";
import { nanoid } from "nanoid";

type LogLevel = "debug" | "error" | "info" | "warn";

const loggerMap: Record<LogLevel, (...arg: any[]) => void> = {
  info: console.info,
  debug: console.debug,
  error: console.error,
  warn: console.warn,
};

export const logWarning = (message: string | object, type?: string) => {
  logHelper("Warning", message, type, chalk.yellow, "warn");
};
export const logInfo = (message: string | object, type?: string) => {
  logHelper("Info", message, type, chalk.blue, "info");
};
export const logError = (message: string | object, type?: string) => {
  logHelper("Error", message, type, chalk.red, "error");
};

export const logSuccess = (message: string | object, type?: string) => {
  logHelper("Success", message, type, chalk.green, "info");
};

export const logDebug = (message: string | object, type?: string) => {
  logHelper("Debug", message, type, chalk.magenta, "debug");
};

const logHelper = (
  level: string,
  message: string | object,
  from?: string,
  chalkColor: Chalk = chalk.white,
  logLevel: LogLevel = "info",
) => {
  const levelPrefix = `[${level}]`;
  const levelStr = chalkColor(levelPrefix);

  const timeStr = `- ${new Date().toISOString()}`;

  const messagePrefix = "Message:";
  const messageStr = `- ${chalkColor(messagePrefix)} ${message}`;

  const fromPrefix = "Type:";
  const fromStr = from ? `- ${chalkColor(fromPrefix)} ${from}` : "";

  loggerMap[logLevel](
    `${levelStr.padEnd(10, " ")} ${timeStr} ${fromStr} ${messageStr}`,
  );
};

// TODO: handle this better
export const handleError = (error: any, botName = "Moka") => {
  const errId = nanoid();
  logError(error as any, `${botName} message handler ${errId}`);

  return `Úi, lỗi gì trên server nè, nhớ hú admin với mã ${errId} nha ヾ(≧へ≦)〃`;
};
