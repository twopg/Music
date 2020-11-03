import { EventEmitter } from 'events';
import { Player, PlayerOptions, Track } from './player';
import searchYT from 'yt-search';

export class MusicClient {
  readonly players = new Map<string, Player>();

  private emitter = new EventEmitter();

  /** Listen to music client events. */
  on(event: MusicClientEvent, listener: (...args: any[]) => void) {
    this.emitter.on(event, listener);
  }

  /** Get or create a player for a guild. */
  get(options: PlayerOptions): Player {
    const guildId = options.voiceChannel.guild.id;
    return this.players.get(guildId)
      ?? this.players
        .set(guildId, new Player(options))
        .get(guildId) as Player;
  }
  
  /** Search YouTube for tracks. */
  async search(query: string): Promise<Track[]> {
    const result = await searchYT(query);
    return result.videos;
  }
}

export type MusicClientEvent = 'play' | 'end';
export { Player, PlayerOptions, Track } from './player';
