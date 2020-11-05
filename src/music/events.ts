import { EventEmitter } from 'events';

/** @ignore */
export const emitter = new EventEmitter();

/** Events to listen to.
 * 
 * `trackStart` -> when a track is started for the first time.</br> 
 * `queueEnd` -> when the queue is cleared, or when the last track ends.
 */
export type MusicClientEvent = 'trackStart' | 'queueEnd';