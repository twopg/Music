import { Player, PlayerOptions, Track } from './player';
import searchYT from 'yt-search';
import { emitter, MusicClientEvent } from './events';

export class MusicClient {
  readonly players = new Map<string, Player>();

  /** Listen to music client events. */
  on(event: MusicClientEvent, listener: (...args: any[]) => void) {
    emitter.on(event, listener);
  }

  /** Create a player for a guild. */
  create(guildId: string, options: PlayerOptions): Player {
    return this.players
        .set(guildId, new Player(options))
        .get(guildId) as Player;
  }
  /** Get or create a player for a guild. */
  get(guildId: string): Player {
    return this.players.get(guildId);
  }
  
  /** Search YouTube for tracks. */
  async search(query: string): Promise<Track[]> {
    const result = await searchYT(query);
    return result.videos;
  }
}

export { Player, PlayerOptions, Track } from './player';
