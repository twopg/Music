import { EventEmitter } from 'events';

export const emitter = new EventEmitter();
export type MusicClientEvent = 'trackStart' | 'queueEnd';