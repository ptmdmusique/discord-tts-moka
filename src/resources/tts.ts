import { protos } from "@google-cloud/text-to-speech";
import { TTSConfig } from "../data/tts";

export let ttsConfig: TTSConfig;
export const setupTTS = () => {
  ttsConfig = new TTSConfig();
};

export async function convertTextToSpeech(text: string) {
  const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
    {
      input: { text },
      voice: {
        languageCode: ttsConfig.languageCode,
        ssmlGender: ttsConfig.ssmGender,
      },
      audioConfig: { audioEncoding: "MP3" },
    } as const;

  const [response] = await ttsConfig.client.synthesizeSpeech(request);
  return response.audioContent;
}
