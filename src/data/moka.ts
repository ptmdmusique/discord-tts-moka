import { AudioPlayer, VoiceConnection } from "@discordjs/voice";

export class Moka {
  // * Genereal
  private _cmdPrefix: string = "~";

  // * Channel
  private _voiceConnection: VoiceConnection | null = null;
  private _audioPlayer: AudioPlayer | null = null;

  // * Getters - Setters
  public get cmdPrefix(): string {
    return this._cmdPrefix;
  }
  public set cmdPrefix(value: string) {
    this._cmdPrefix = value;
  }

  public get voiceConnection(): VoiceConnection | null {
    return this._voiceConnection;
  }
  public set voiceConnection(value: VoiceConnection | null) {
    this._voiceConnection = value;
  }

  public get audioPlayer(): AudioPlayer | null {
    return this._audioPlayer;
  }
  public set audioPlayer(value: AudioPlayer | null) {
    this._audioPlayer = value;
  }
}
