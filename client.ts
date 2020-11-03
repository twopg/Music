import { EventEmitter } from 'events';
import { Player, PlayerOptions } from './player';

export class MusicClient {
  readonly players: Player[] = [];

  private emitter = new EventEmitter();

  async spawn(options: PlayerOptions) {
    this.players.push(new Player(options));
  }

  /** Listen to music client events. */
  on(event: MusicClientEvent, listener: (...args: any[]) => void) {
    this.emitter.on(event, listener);
  }
}

export type MusicClientEvent = 'ready' | 'play' | 'end';
export { Player, PlayerOptions, Track } from './player';