import searchYT, { VideoSearchResult } from 'yt-search';
import downloadYT from 'discord-ytdl-core';
import { GuildMember, TextChannel, VoiceChannel, VoiceConnection } from 'discord.js';
import Q from './q';
import { emitter } from './events';

export class Player {  
  readonly q = new Q<Track>();

  private connection?: VoiceConnection | null;

  /** Whether the queue is not empty and audio is being emitted. */
  get isPlaying() {
    return !(this.q.isEmpty || this.isPaused);
  }
  /** Whether the player is paused or not. */
  get isPaused() {
    return this.connection?.dispatcher.paused;
  }
  /** The time (in milliseconds) that the track has been playing audio for. */
  get position() {
    return this.connection?.dispatcher.totalStreamTime;
  }

  /** Text channel that the player is connected to. */
  get textChannel() {
    return this.options.textChannel;
  }
  /** Voice channel that the player is connected to. */
  get voiceChannel() {
    return this.options.voiceChannel;
  }
  /** Guild ID of the player. */
  get guildId() {
    return this.options.guildId;
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
    if (!this.voiceChannel?.joinable)
      throw new TypeError(`Channel is not joinable.`);

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
  
  /** Play track from YouTube.
   * If a track is already playing, it will be queued.
   * @param query Term to search YouTube for tracks.
   * @param requestor Guild member who requested to play this track.
  */
  async play(query: string, requestor?: GuildMember) {
    const { videos } = await searchYT(query);
    if (videos.length <= 0)
      throw new TypeError('No results found.');

    const track: Track = videos[0];
    track.requestor = requestor;
    this.q.enqueue(track);

    if (!this.isPlaying)
      this.playTrack(track);

    return track;
  }
  private async playTrack(track: Track, seek = 0) {
    await this.join();

    const stream = downloadYT(track.url, { fmt: 'mp3', filter: 'audioonly' });
    
    this.connection?.play(stream, { seek, volume: 1 });
    
    if (seek <= 0)
      emitter.emit('trackStart', this, track);

    return track;
  }

  /** Set volume of player.
   * @param amount Value from 0 - 1.
   */ 
  async setVolume(amount: number) {
    if (!this.isPlaying)
      throw new TypeError('Player is not playing anything.');

    this.connection.dispatcher.setVolume(amount);
  }

  /** Move position in current playing track.
   * @param position Time (in seconds) to seek to.
   */ 
  async seek(position: number) {
    if (!this.isPlaying)
      throw new TypeError('Player is not playing anything.');
    if (position >= this.q.peek().duration.seconds)
      throw new TypeError('Position is longer than track duration.');

    await this.playTrack(this.q.peek(), position);
  }

  /** Stop playing and clear queue. */
  async stop() {
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

  /** Skip one or more tracks, and return track to play.
   * @param count Number of tracks to skip.
  */
  async skip(count = 1) {
    if (count > this.q.length)
      throw new TypeError('Not enough items to skip.');
    else if (count <= 0)
      throw new RangeError('Number to skip should be greater than 0');
    else if (this.q.length <= 1)
      throw new TypeError('Cannot skip only one track.');
    
    for (let i = 0; i < count; i++)     
      this.q.dequeue();
  
    return this.playTrack(this.q.peek());
  }
}

export interface PlayerOptions {
  textChannel: TextChannel;
  voiceChannel: VoiceChannel;
  guildId?: string;
}

export type Track = { requestor?: GuildMember } & VideoSearchResult;
