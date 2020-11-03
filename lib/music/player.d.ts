import searchYT, { VideoSearchResult } from 'yt-search';
import Q from './q';
import { VoiceChannel } from 'discord.js';
export declare class Player {
    private options;
    readonly q: Q<searchYT.VideoSearchResult>;
    private connection?;
    /** Whether the queue is not empty and audio is being emitted. */
    get isPlaying(): import("discord.js").StreamDispatcher;
    /** Position in ms of current track. */
    get position(): number;
    constructor(options: PlayerOptions);
    /** Join a voice channel. */
    join(): Promise<void>;
    /** Leave a voice channel. */
    leave(): Promise<void>;
    /** Move player to another channel. */
    move(voiceChannel: VoiceChannel): Promise<void>;
    /** Play track from YouTube. */
    play(query: string): Promise<void>;
    /** Set volume from 0 - 200 */
    setVolume(amount: number): Promise<void>;
    /** Stop playing and clear queue. */
    stop(): Promise<void>;
    /** Pause playback. */
    pause(): Promise<void>;
    /** Resume playback. */
    resume(): Promise<void>;
    /** Skip one or more tracks. */
    skip(count?: number): Promise<void>;
}
export interface PlayerOptions {
    voiceChannel: VoiceChannel;
}
export declare type Track = VideoSearchResult;
