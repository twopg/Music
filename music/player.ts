import searchYT, { VideoSearchResult } from 'yt-search';
import downloadYT from 'ytdl-core';
import Q from './q';
import { VoiceChannel, VoiceConnection } from 'discord.js';

export class Player {  
  readonly q = new Q<Track>();

  private connection?: VoiceConnection | null;

  /** Whether the queue is not empty and audio is being emitted. */
  get isPlaying() {
    return !this.q.isEmpty && this.connection?.dispatcher;
  }
  /** Position in ms of current track. */
  get position() {
    return this.connection?.dispatcher.streamTime;
  }

  constructor(private options: PlayerOptions) {}

  /** Join a voice channel. */
  async join() {
    this.connection = await this.options.voiceChannel.join();
  }

  /** Leave a voice channel. */
  async leave() {
    this.options.voiceChannel.leave();
    this.connection = null;
  }

  /** Move player to another channel. */
  async move(voiceChannel: VoiceChannel) {
    await voiceChannel.join();
    this.options.voiceChannel = voiceChannel;
  }
  
  /** Play track from YouTube. */
  async play(query: string) {
    const { videos } = await searchYT(query);
    if (videos.length <= 0)
      throw new TypeError('No results found.');

    await this.join();

    const video = videos[0];
    this.q.enqueue(video);

    const stream = downloadYT(video.url, { filter: 'audioonly' });
    this.connection?.play(stream, { seek: 0, volume: 1 });
  }

  /** Set volume from 0 - 200 */ 
  async setVolume(amount: number) {
    if (!this.connection?.dispatcher)
      throw new TypeError('Player is not playing anything.');

    this.connection.dispatcher.setVolume(amount);
  }

  /** Stop playing and clear queue. */
  async stop() {
    if (!this.isPlaying)
      throw new TypeError('Player is already stopped.');

    this.connection?.disconnect();

    while (!this.q.isEmpty)
      this.q.dequeue();
  }

  /** Pause playback. */
  async pause() {
    this.connection?.dispatcher.pause();
  }
  /** Resume playback. */
  async resume() {
    this.connection?.dispatcher.resume();
  }

  /** Skip one or more tracks. */
  async skip(count = 1) {
    if (count > this.q.length)
      throw new TypeError('Not enough items to skip.');
    else if (count <= 0)
      throw new RangeError('Number to skip should be greater than 0');

    const skipped = this.q.length > this.q.length - count;
    while (!skipped)
      this.q.dequeue();
  }
}

export interface PlayerOptions {
  voiceChannel: VoiceChannel;
}

export type Track = VideoSearchResult;
