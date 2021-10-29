export let mokaToken: string;

export const setupEnv = () => {
  mokaToken = process.env.MOKA_TOKEN || "";
};
