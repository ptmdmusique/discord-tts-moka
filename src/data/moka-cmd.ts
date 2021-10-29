export const mokaTextCmdList = ["hello", "ping", "goodnight"] as const;
export type MokaTextCmd = typeof mokaTextCmdList[number];

export const mokaSupportedCmdList = [...mokaTextCmdList] as const;
export type MokaSupportedCmd = typeof mokaSupportedCmdList[number];

export const doesMokaSupportCmd = (cmd: string): cmd is MokaSupportedCmd =>
  mokaSupportedCmdList.includes(cmd as MokaSupportedCmd);

export const isMokaTextCmd = (cmd: string): cmd is MokaTextCmd =>
  mokaSupportedCmdList.includes(cmd as MokaTextCmd);
