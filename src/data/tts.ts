import { TextToSpeechClient } from "@google-cloud/text-to-speech/build/src/v1";
import { envVariables } from "../resources/env";

export class TTSConfig {
  private _client: TextToSpeechClient;

  constructor() {
    this._client = new TextToSpeechClient({
      projectId: envVariables.gcpProjectId,
      keyFilename: envVariables.gcpKeyFileName,
    });
  }

  get client(): TextToSpeechClient {
    return this._client;
  }
}
