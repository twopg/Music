import { Player, PlayerOptions, Track } from './player';
export declare class MusicClient {
    readonly players: Map<string, Player>;
    private emitter;
    /** Listen to music client events. */
    on(event: MusicClientEvent, listener: (...args: any[]) => void): void;
    /** Get or create a player for a guild. */
    get(options: PlayerOptions): Player;
    /** Search YouTube for tracks. */
    search(query: string): Promise<Track[]>;
}
export declare type MusicClientEvent = 'play' | 'end';
export { Player, PlayerOptions, Track } from './player';
