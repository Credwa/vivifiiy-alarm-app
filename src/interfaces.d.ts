/**
 * Global interfaces
 */

import { twelveHrTime } from '@/types';

export interface AlarmInterface extends twelveHrTime {
  active: boolean;
  key: string;
}

export interface SettingsInterface {
  [key: string]: any;
  volumeStyle: string;
  snooze: boolean;
  snoozeDuration: number;
  maxVolume: number;
  connectedMusicAccounts: Array<string>;
}
export interface MusicAccount {
  accountName: string;
  accountIconUri: any;
  available: boolean;
  connected: boolean;
}
