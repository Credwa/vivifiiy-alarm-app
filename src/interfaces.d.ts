/**
 * Global interfaces
 */

import { twelveHrTime } from '@/types';

export interface AlarmInterface extends twelveHrTime {
  active: boolean;
  key: string;
}
