export const mokaTextCmdList = ["hello", "ping", "goodnight"] as const;
export type MokaTextCmd = typeof mokaTextCmdList[number];

export const mokaConfigCmdList = ["prefix"] as const;
export type MokaConfigCmd = typeof mokaConfigCmdList[number];

export const mokaGeneralCmdList = ["join", "help"] as const;
export type MokaGeneralCmd = typeof mokaGeneralCmdList[number];

export const mokaVoiceCmd = "~";
export type MokaVoiceCmd = typeof mokaVoiceCmd;

export const mokaLanguageCmdList = ["voice", "lang-code", "lang-info"] as const;
export type MokaLanguageCmd = typeof mokaLanguageCmdList[number];

export const mokaSupportedCmdList = [
  ...mokaTextCmdList,
  ...mokaConfigCmdList,
  ...mokaGeneralCmdList,
  mokaVoiceCmd,
  ...mokaLanguageCmdList,
] as const;
export type MokaSupportedCmd = typeof mokaSupportedCmdList[number];

// * ---
export const supportedCmdType = [
  "text",
  "config",
  "general",
  "voice",
  "language",
] as const;
export type MokaSupportedCmdType = typeof supportedCmdType[number];

// * --- Helpers
export const doesMokaSupportCmd = (cmd: string): cmd is MokaSupportedCmd =>
  mokaSupportedCmdList.includes(cmd as MokaSupportedCmd);

export const isMokaTextCmd = (cmd: string): cmd is MokaTextCmd =>
  mokaTextCmdList.includes(cmd as MokaTextCmd);

export const isMokaConfigCmd = (cmd: string): cmd is MokaConfigCmd =>
  mokaConfigCmdList.includes(cmd as MokaConfigCmd);

export const isMokaGenerealCmd = (cmd: string): cmd is MokaGeneralCmd =>
  mokaGeneralCmdList.includes(cmd as MokaGeneralCmd);

export const isMokaVoiceCmd = (cmd: string) => mokaVoiceCmd === cmd;

export const isMokaLanguageCmd = (cmd: string): cmd is MokaLanguageCmd =>
  mokaLanguageCmdList.includes(cmd as MokaLanguageCmd);

export const isMokaSupportedCmdType = (
  cmd: string,
): cmd is MokaSupportedCmdType =>
  supportedCmdType.includes(cmd as MokaSupportedCmdType);
