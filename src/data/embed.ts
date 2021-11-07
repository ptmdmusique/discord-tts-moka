import { APIEmbed } from "discord-api-types";
import { EmbedField, MessageEmbed, MessageEmbedOptions } from "discord.js";
import { mokaBot } from "../resources/moka";
import { ttsConfig } from "../resources/tts";
import { getUnimplementedEmbedMessage } from "../utils/misc";
import { getMokaImgUrl } from "../utils/moka";
import { mokaColor } from "./color-palette";
import {
  MokaConfigCmd,
  MokaGeneralCmd,
  MokaLanguageCmd,
  MokaSupportedCmd,
  MokaSupportedCmdType,
  MokaTextCmd,
  MokaVoiceCmd,
} from "./moka-cmd";

type Embed = MessageEmbed | MessageEmbedOptions | APIEmbed;

interface CmdHelpField<T extends MokaSupportedCmd | MokaSupportedCmdType>
  extends EmbedField {
  name: `> ${string}`;
  value: `${string}**${T}**${string}`; // bold <cmd> <arg>
}

interface BreakEmbedField {
  name: "\u200b";
  value: "\u200b";
  inline: boolean;
}

export const getBreakEmbedField = (
  inline: boolean = false,
): BreakEmbedField => ({
  name: "\u200b",
  value: "\u200b",
  inline,
});

// * --- General
const generalCmdHelpFieldList: CmdHelpField<MokaGeneralCmd>[] = [
  {
    name: "> Tham gia vào voice channel",
    value: `**join**
      Triệu hồi mình vào voice channel bạn đang ở (★‿★). Bạn nhớ vào 1 kênh trước nha
    `,
    inline: false,
  },
  {
    name: "> Phép màu của Moka",
    value: `**help**
      Tham khảo các phép màu mà mình có thể làm được (○｀ 3′○)
    `,
    inline: false,
  },
];

export const getGeneralHintEmbed = (): Embed => ({
  title: "Lệnh chung của Moka (✿◠‿◠)",
  color: mokaColor.primary,
  thumbnail: { url: getMokaImgUrl("teasing") },
  description: `Bạn có thể tham khảo các lệnh tương tác chung chung ở dưới nè nha

    `,

  fields: generalCmdHelpFieldList,
});

// * --- Config
const getConfigCmdHelpFieldList = (): CmdHelpField<MokaConfigCmd>[] => [
  {
    name: "> Kí tự tương tác với Moka",
    value: `**prefix** <kí tự mới>
      Dùng để sửa dùng để tương tác với mình nha. Kí tự hiện tại là **${mokaBot?.cmdPrefix}**.
    `,
    inline: false,
  },
];

export const getConfigHintEmbed = (): Embed => ({
  title: "Sửa đổi tùy chọn của Moka",
  color: mokaColor.primary,
  thumbnail: { url: getMokaImgUrl("teasing") },
  description: `Bạn có thể sửa đổi các tùy chọn của Moka bằng các lệnh dưới nè

    `,

  fields: getConfigCmdHelpFieldList(),
});

// * --- Text
const textCmdHelpFieldList: CmdHelpField<MokaTextCmd>[] = [
  {
    name: "> Moka xin chào",
    value: `**hello** <tên người bạn muốn chào | để trống nếu muốn mình chào mọi người luôn>
      Mình sẽ chào bạn ấy nha. Mà tùy vào thời gian của ngày, mình chào khác đó. Thông minh chưa (●'◡'●)
    `,
    inline: false,
  },
  {
    name: "> Ping pong! 🏓",
    value: `**ping**
      Thử đi rùi biết
    `,
    inline: false,
  },
  {
    name: "> Ngủ ngon",
    value: `**goodnight**
      Moka sẽ chúc bạn ngủ ngon nhé 💤
    `,
    inline: false,
  },
];

export const getTextHintEmbed = (): Embed => ({
  title: "Tương tác với Moka (✿◠‿◠)",
  color: mokaColor.primary,
  thumbnail: { url: getMokaImgUrl("teasing") },
  description: `Bạn có thể tương tác nhảm với mình bằng các lệnh dưới hen

    `,

  fields: textCmdHelpFieldList,
});

// * --- Voice
const voiceCmdHelpFieldList: CmdHelpField<MokaVoiceCmd>[] = [
  {
    name: "> Tập đọc (/▽＼)",
    value: `**~** <câu bạn muốn mình đọc>
      Đọc câu bạn chỉ định nè
    `,
    inline: false,
  },
];

export const getVoiceHintEmbed = (): Embed => ({
  title: "Moka tập đọc §(*￣▽￣*)§",
  color: mokaColor.primary,
  thumbnail: { url: getMokaImgUrl("teasing") },
  description: `Bạn có thể khiến mình nói bằng lệnh ở dưới nè nha

    `,

  fields: voiceCmdHelpFieldList,
});

// * --- Language
const languageCmdHelpFieldList: (
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

export const getLanguageHintEmbed = (): Embed => ({
  title: "Chọn ngôn ngữ (￣y▽,￣)╭ ",
  color: mokaColor.primary,
  thumbnail: { url: getMokaImgUrl("teasing") },
  description: `${ttsConfig.getCurLanguageText()}

    Bạn có thể đổi ngôn ngữ hoặc xem ngôn ngữ hiện tại bằng các lệnh dưới

    `,

  fields: languageCmdHelpFieldList,
});

// * --- Help
const generalHelpFieldList: (
  | CmdHelpField<MokaSupportedCmdType>
  | BreakEmbedField
)[] = [
  {
    name: '> Mục text (cho "hello", "ping", ...)',
    value: `help **text**
    Hiển thị thông tin về cách chat tương tác với mình 🌸
    ${getUnimplementedEmbedMessage()}
    `,
    inline: false,
  },
  {
    name: '> Mục tùy chỉnh (cho "prefix", ...)',
    value: `help **config**
      Hiển thị thông tin về cách điều chỉnh thông tin của mình 🌸
      ${getUnimplementedEmbedMessage()}
    `,
    inline: false,
  },
  {
    name: '> Mục tổng quát (cho "join", "help", ...)',
    value: `help **general**
      Hiển thị thông tin về cách điều chỉnh thông tin của mình 🤖
      ${getUnimplementedEmbedMessage()}
    `,
    inline: false,
  },
  {
    name: `> Mục giọng nói (cho "~")`,
    value: `help **voice**
      Hiển thị thông tin về việc mình thì thầm cho bạn nghe 🎵
      ${getUnimplementedEmbedMessage()}
    `,
    inline: false,
  },
  {
    name: '> Mục ngôn ngữ (cho "voice", "lang-code", ...)',
    value: `help **language**
      Hiển thị thông tin về cách điều chỉnh ngôn ngữ nói của mình 🍙
    `,
    inline: false,
  },
];

export const getHelpEmbed = (): Embed => ({
  title: "Giúp đỡ nè o((>ω< ))o",
  color: mokaColor.primary,
  thumbnail: { url: getMokaImgUrl("cute") },
  description: `Bạn có thể coi thêm thông tin cho từng loại lệnh bằng các lệnh dưới

    `,

  fields: generalHelpFieldList,
});
