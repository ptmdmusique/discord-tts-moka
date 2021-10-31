import { APIEmbed } from "discord-api-types";
import { EmbedField, MessageEmbed, MessageEmbedOptions } from "discord.js";
import { ttsConfig } from "../resources/tts";
import { getMokaImgUrl } from "../utils/moka";
import { MokaLanguageCmd, MokaSupportedCmd } from "./moka-cmd";

interface CmdHelpField<T extends MokaSupportedCmd> extends EmbedField {
  value: `**${T}**${string}`; // bold <cmd> <arg>
}

interface BreakEmbedField {
  name: "\u200b";
  value: "\u200b";
  inline: boolean;
}

const getBreakEmbedField = (inline: boolean = false): BreakEmbedField => ({
  name: "\u200b",
  value: "\u200b",
  inline,
});

// * --- Language
const languageHelpFieldList: (
  | CmdHelpField<MokaLanguageCmd>
  | BreakEmbedField
)[] = [
  {
    name: "> Ngôn ngữ hiện tại",
    value: `**lang-info**
    Hiển thị thông tin về ngôn ngữ hiện tại
    `,
    inline: false,
  },
  {
    name: "> Mã ngôn ngữ",
    value: `**lang-code** <mã ngôn ngữ>
      Đổi mã ngôn ngữ
      Bạn có thể xem mã ngôn ngữ hỗ trợ tại [đây](https://cloud.google.com/text-to-speech/docs/voices) dưới mục "Language code" ha
    `,
    inline: false,
  },
  {
    name: "> Tên giọng nói",
    value: `**voice** <tên giọng nói>
      Đổi tên giọng nói
      Bạn có thể coi tên giọng nói hỗ trợ tại [đây](https://cloud.google.com/text-to-speech/docs/voices) dưới mục "Voice name" ha
    `,
    inline: false,
  },
];

type Embed = MessageEmbed | MessageEmbedOptions | APIEmbed;
export const getLanguageHintEmbed = (): Embed => ({
  title: "Chọn ngôn  ngữ",
  color: "#df9698",
  thumbnail: { url: getMokaImgUrl("teasing") },
  description: `${ttsConfig.getCurLanguageText()}

    Bạn có thể đổi ngôn ngữ hoặc xem ngôn ngữ hiện tại bằng các lệnh dưới

    `,

  fields: languageHelpFieldList,
});
