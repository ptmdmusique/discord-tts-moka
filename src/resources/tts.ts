import { TTSConfig } from "../data/tts";

export const ttsConfig = new TTSConfig();

export async function convertTextToSpeech(text: string) {
  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  } as const;

  // Performs the text-to-speech request
  const [response] = await ttsConfig.client.synthesizeSpeech(request);
  return response.audioContent;
}
