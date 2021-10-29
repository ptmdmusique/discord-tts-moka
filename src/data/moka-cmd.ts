export const mokaTextCmdList = ["hello", "ping", "goodnight"] as const;
export type MokaTextCmd = typeof mokaTextCmdList[number];

export const mokaConfigCmdList = ["prefix"] as const;
export type MokaConfigCmd = typeof mokaConfigCmdList[number];

export const mokaSupportedCmdList = [
  ...mokaTextCmdList,
  ...mokaConfigCmdList,
] as const;
export type MokaSupportedCmd = typeof mokaSupportedCmdList[number];

export const doesMokaSupportCmd = (cmd: string): cmd is MokaSupportedCmd =>
  mokaSupportedCmdList.includes(cmd as MokaSupportedCmd);

export const isMokaTextCmd = (cmd: string): cmd is MokaTextCmd =>
  mokaTextCmdList.includes(cmd as MokaTextCmd);

export const isMokaConfigCmd = (cmd: string): cmd is MokaConfigCmd =>
  mokaConfigCmdList.includes(cmd as MokaConfigCmd);
