import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import fs from "fs";
import { envVariables } from "../resources/env";
import { logInfo } from "../utils/logger";
import {
  SSMLGender,
  SupportedLanguageCode,
  SupportedLanguageInfo,
  supportedLanguageMap,
  SupportedVoiceName,
  supportedLanguageCode,
} from "./supported-language";

export class TTSConfig {
  private _client: TextToSpeechClient;
  private _ssmlGender: SSMLGender = "FEMALE";
  private _languageCode: SupportedLanguageCode = "vi-VN";
  private _voiceName: SupportedVoiceName = "vi-VN-Standard-A";

  constructor() {
    this._client = new TextToSpeechClient({
      projectId: envVariables.gcpProjectId,
      keyFilename: envVariables.gcpKeyFileName,
    });
  }

  // * Helpers
  async writeSupportedVoicesToFile(path = "tts.json") {
    const [result] = await this._client.listVoices({});
    const voices = result.voices;

    const outData: Record<string, SupportedLanguageInfo> = {};
    voices?.forEach((voice) => {
      if (voice.name) {
        outData[voice.name] = voice;
      }
    });
    fs.writeFileSync(path, JSON.stringify(outData), "utf8");
    logInfo(`Supported language wrote to ${path}`);
  }

  getCurLanguageText() {
    return `🌸🌸 Giọng nói hiện tại là ${this.languageCode} với kiểu ${this.voiceName} nhé (^人^) 🌸🌸` as const;
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

  get languageCode() {
    return this._languageCode;
  }
  set languageCode(language: SupportedLanguageCode) {
    const isVoiceValid = !(
      supportedLanguageMap[this._voiceName].languageCodes as [
        SupportedLanguageCode,
      ]
    ).includes(language);

    if (!isVoiceValid) {
      // Find a suitable new voice if the language code doesn't
      //  match with the voice language codes
      const languageInfoList = Object.values(supportedLanguageMap);
      const newVoice = languageInfoList.find(
        ({ languageCodes, ssmlGender }) =>
          (languageCodes as unknown as string[]).includes(language) &&
          ssmlGender === this._ssmlGender,
      );

      if (newVoice) {
        this._voiceName = newVoice.name;
      }
    }

    this._languageCode = language;
  }

  get voiceName() {
    return this._voiceName;
  }
  set voiceName(voiceName: SupportedVoiceName) {
    const languageCodeList = supportedLanguageMap[voiceName].languageCodes as [
      SupportedLanguageCode,
    ];

    const isValidLanguageCode = languageCodeList.includes(this._languageCode);
    if (!isValidLanguageCode) {
      this._languageCode = languageCodeList[0];
    }

    this._voiceName = voiceName;
  }
}

export const isSupportedLanguageCode = (
  languageCode: string,
): languageCode is SupportedLanguageCode =>
  supportedLanguageCode.includes(languageCode as SupportedLanguageCode);

export const isSupportedVoiceName = (
  voiceName: string,
): voiceName is SupportedVoiceName =>
  supportedLanguageMap.hasOwnProperty(voiceName);
