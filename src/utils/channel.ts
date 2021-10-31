import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel as joinVoiceChannel_,
  VoiceConnection,
} from "@discordjs/voice";
import { Message } from "discord.js";

export const joinVoiceChannelFromMessage = (
  message: Message,
): VoiceConnection | null => {
  const channelId = message.member?.voice.channel?.id;
  const guildId = message.guildId;
  const adapterCreator = message.guild?.voiceAdapterCreator;

  if (!adapterCreator || !guildId || !channelId) {
    return null;
  }

  return joinVoiceChannel(
    channelId,
    guildId,
    adapterCreator as unknown as DiscordGatewayAdapterCreator,
  );
};

const joinVoiceChannel = (
  channelId: string,
  guildId: string,
  voiceAdapterCreate: DiscordGatewayAdapterCreator,
) => {
  return joinVoiceChannel_({
    channelId,
    guildId,
    adapterCreator: voiceAdapterCreate,
  });
};

export const isMessageFromVoiceChannel = (message: Message): boolean => {
  return !!message.guild && !!message.member?.voice.channel;
};
