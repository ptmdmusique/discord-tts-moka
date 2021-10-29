import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";
import { logError, logInfo } from "./utils/logger.util";

// Creates a client
const client = new textToSpeech.TextToSpeechClient();
export async function convertTextToSpeech(text: string) {
  try {
    // Construct the request
    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      // select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" },
    } as const;

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    if (response.audioContent) {
      await writeFile("output.mp3", response.audioContent, "binary");
      logInfo("Audio content written to file: output.mp3");
    } else {
      logInfo("Audio is empty");
    }
  } catch (error) {
    logError(error as any);
  }
}
