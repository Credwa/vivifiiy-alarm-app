import { twelveHrTime } from '@/types';
import { differenceInHours, differenceInMinutes, startOfTomorrow } from 'date-fns';

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
 * getTimeTillAlarm
 *
 * Calculates the remaining time till alarm time passed through parameter goes off
 *
 * @param time
 */
export const getTimeTillAlarm = (time: twelveHrTime) => {
  let currentTime = new Date();
  let newTime = convertTo24Hour(time);
  let alarmIsTomorrow = false;

  if (Number(newTime.hour) < currentTime.getHours()) {
    alarmIsTomorrow = true;
  } else if (Number(newTime.hour) === currentTime.getHours() && Number(newTime.minute) < currentTime.getMinutes()) {
    alarmIsTomorrow = true;
  } else if (Number(newTime.hour) === currentTime.getHours() && Number(newTime.minute) === currentTime.getMinutes()) {
    alarmIsTomorrow = true;
  }

  let alarmTime = alarmIsTomorrow
    ? new Date(
        startOfTomorrow().getFullYear(),
        startOfTomorrow().getMonth(),
        startOfTomorrow().getDate(),
        Number(newTime.hour),
        Number(newTime.minute)
      )
    : new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        Number(newTime.hour),
        Number(newTime.minute)
      );

  return {
    hour: differenceInHours(alarmTime, currentTime),
    get minute() {
      return differenceInMinutes(alarmTime, currentTime) - this.hour * 60;
    }
  };
};
