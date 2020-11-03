import { Player, PlayerOptions, Track } from './player';
import { MusicClientEvent } from './events';
export declare class MusicClient {
    readonly players: Map<string, Player>;
    /** Listen to music client events. */
    on(event: MusicClientEvent, listener: (...args: any[]) => void): void;
    /** Create a player for a guild. */
    create(guildId: string, options: PlayerOptions): Player;
    /** Get or create a player for a guild. */
    get(guildId: string): Player;
    /** Search YouTube for tracks. */
    search(query: string): Promise<Track[]>;
}
export { Player, PlayerOptions, Track } from './player';
