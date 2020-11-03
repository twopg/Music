import { EventEmitter } from 'events';
import { Player, PlayerOptions, Track } from './player';

export class MusicClient {
  readonly players = new Map<string, Player>();

  private emitter = new EventEmitter();

  /** Listen to music client events. */
  on(event: MusicClientEvent, listener: (...args: any[]) => void) {
    this.emitter.on(event, listener);
  }

  /** Create a player for a guild. */
  create(options: PlayerOptions) {
    return this.players
      .set(options.voiceChannel.guild.id, new Player(options))
      .get(options.voiceChannel.guild.id);
  }

  /** Get player by Guild ID. */
  get(guildId: string) {
    return this.players.get(guildId);
  }
}

export type MusicClientEvent = 'play' | 'end';
export { Player, PlayerOptions, Track } from './player';