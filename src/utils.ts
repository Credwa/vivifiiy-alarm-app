import { meridiem, twelveHrTime } from '@/types';

/**
 * ConvertTo24Hour
 *
 * Convert 12 hour time to military time (24 hour)
 *
 * @param time
 *
 */
export const convertTo24Hour = (time: twelveHrTime) => {
  const newTime: twelveHrTime = { hour: time.hour, minute: time.minute, meridiem: time.meridiem };
  if (time.meridiem === 'AM' && time.hour === '12') {
    newTime.hour = '00';
  } else if (time.meridiem === 'PM' && time.hour !== '12') {
    newTime.hour = (Number(time.hour) + 12).toString();
  }
  return newTime;
};

/**
 * generateTimerArray
 *
 * Generates an array of continuous numbers starting from 0 (if included) to max. Option to repeat (append generate array to itself) a specific number of time
 *
 * @param max
 * @param zeroIncluded
 * @param startingRepeats
 *
 */
export const generateTimerArray = (max: number, zeroIncluded: boolean, startingRepeats?: number) => {
  let tempArr: string[] = [];
  for (let index = zeroIncluded ? 0 : 1; index <= max; index++) {
    tempArr.push(index.toLocaleString('en-IN', { minimumIntegerDigits: 2 }));
  }
  if (startingRepeats) {
    let originalArr = tempArr;
    for (let index = 0; index < startingRepeats; index++) {
      tempArr = [...tempArr, ...originalArr];
    }
  }
  return tempArr;
};

/**
 * findSelectedAlarmViewIndex
 *
 * returns the index for matching initial alarm view value
 *
 * @param data
 * @param initValue
 * @param startingIndex
 */
export const findSelectedAlarmViewIndex = (
  data: meridiem[] | string[],
  initValue: meridiem | string,
  startingIndex: number
) => {
  let index = Math.floor(data.length / 2);
  for (let i = startingIndex; i < data.length; i++) {
    if (data[i] === initValue) {
      index = i;
    }
  }
  return index;
};

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
