import { protos, TextToSpeechClient } from "@google-cloud/text-to-speech";
import { envVariables } from "../resources/env";
import { logError } from "../utils/logger.util";

const supportedWavenetLanguage = [
  "ro-RO",
  "ar-XA",
  "bn-IN",
  "en-GB",
  "fr-CA",
  "en-US",
  "es-ES",
  "fi-FI",
  "gu-IN",
  "ja-JP",
  "kn-IN",
  "ml-IN",
  "sv-SE",
  "ta-IN",
  "tr-TR",
  "ms-MY",
  "pa-IN",
  "cs-CZ",
  "de-DE",
  "en-AU",
  "en-IN",
  "es-US",
  "fr-FR",
  "hi-IN",
  "id-ID",
  "it-IT",
  "ko-KR",
  "ru-RU",
  "uk-UA",
  "cmn-CN",
  "cmn-TW",
  "da-DK",
  "el-GR",
  "fil-PH",
  "hu-HU",
  "nb-NO",
  "nl-BE",
  "nl-NL",
  "pt-PT",
  "sk-SK",
  "vi-VN",
  "pl-PL",
  "pt-BR",
] as const;

export type SupportedLanguage = typeof supportedWavenetLanguage[number];

type SSMLGender =
  | protos.google.cloud.texttospeech.v1.SsmlVoiceGender
  | keyof typeof protos.google.cloud.texttospeech.v1.SsmlVoiceGender;
export class TTSConfig {
  private _client: TextToSpeechClient;

  private _ssmlGender: SSMLGender = "FEMALE";

  private _language: SupportedLanguage = "vi-VN";

  constructor() {
    this._client = new TextToSpeechClient({
      projectId: envVariables.gcpProjectId,
      keyFilename: envVariables.gcpKeyFileName,
    });
  }

  // * Setters - Getters
  get client(): TextToSpeechClient {
    return this._client;
  }

  get ssmGender() {
    return this._ssmlGender;
  }
  set ssmGender(gender: SSMLGender) {
    this._ssmlGender = gender;
  }

  get language() {
    return this._language;
  }
  set language(language: SupportedLanguage) {
    this._language = language;
  }
}

export const isSupportedLanguage = (
  language: SupportedLanguage,
): language is SupportedLanguage => {
  return supportedWavenetLanguage.includes(language);
};
