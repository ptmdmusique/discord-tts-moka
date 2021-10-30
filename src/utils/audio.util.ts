import { AudioResource, createAudioResource } from "@discordjs/voice";
import { Readable } from "stream";

export const bufferToAudioResource = (
  buffer: string | Uint8Array,
): AudioResource => {
  const stream = Readable.from(buffer);
  return createAudioResource(stream, { inlineVolume: true });
};
