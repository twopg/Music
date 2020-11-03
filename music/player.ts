import searchYT, { VideoSearchResult } from 'yt-search';
import downloadYT from 'ytdl-core';
import { Channel, TextChannel, VoiceChannel, VoiceConnection } from 'discord.js';
import Q from './q';
import { emitter } from './events';

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

  /** Text channel that the player is connected to. */
  get textChannel() {
    return this.options.textChannel;
  }
  /** Voice channel that the player is connected to. */
  get voiceChannel() {
    return this.options.voiceChannel;
  }

  constructor(private options: PlayerOptions) {
    emitter.on('end', async () => {
      this.q.dequeue();
      if (this.q.isEmpty) return;
      
      const nextTrack = this.q.peek();
      await this.playTrack(nextTrack);
    });
  }

  /** Join a voice channel. */
  async join() {
    this.connection = await this.options.voiceChannel.join();
  }

  /** Leave a voice channel. */
  async leave() {
    this.stop();

    this.options.voiceChannel.leave();
    this.options.voiceChannel = null;
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

    const track = videos[0];
    this.q.enqueue(track);

    if (!this.isPlaying)
      this.playTrack(track);

    return track;
  }
  private async playTrack(track: Track) {
    const stream = downloadYT(track.url, { filter: 'audioonly' });
    this.connection?.play(stream, { seek: 0, volume: 1 });
    
    emitter.emit('trackStart', this, track);
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

    emitter.emit('queueEnd', this);
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
    else if (this.q.length <= 1)
      throw new TypeError('Cannot skip only one track.');
    
    for (let i = 0; i < count; i++)     
      this.q.dequeue();
      
    console.log(this.q);    
    await this.playTrack(this.q.peek());
  }
}

export interface PlayerOptions {
  textChannel: TextChannel;
  voiceChannel: VoiceChannel;
}

export type Track = VideoSearchResult;
