import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlarmInterface } from '@/interfaces';
import { alarmObject, twelveHrTime } from '@/types';
import { convertTo24Hour } from '@/utils';
import { differenceInHours, differenceInMinutes, startOfTomorrow } from 'date-fns';
import { storageKeys } from '@/constants/Values';

/**
 * clearAlarms
 *
 * Clear all alarms in storage
 */
export const clearAlarms = async () => {
  await AsyncStorage.removeItem(storageKeys.alarms);
};

/**
 * createNewAlarm
 *
 * Set a new alarm in storage
 *
 * @param time
 * @param setAlarmsState
 */
export const createNewAlarm = async (time: AlarmInterface, setAlarmsState: (newAlarms: alarmObject) => void) => {
  try {
    getAlarms().then(async (alarmData) => {
      let jsonValue: string;
      if (alarmData) {
        let alarmSet: alarmObject = { ...alarmData, [time.key]: time };
        jsonValue = JSON.stringify(alarmSet);
        await AsyncStorage.setItem(storageKeys.alarms, jsonValue).then(() => {
          setAlarmsState(alarmSet);
        });
      } else {
        let alarmSet: alarmObject = { [time.key]: time };
        jsonValue = JSON.stringify(alarmSet);
        await AsyncStorage.setItem(storageKeys.alarms, jsonValue).then(() => {
          setAlarmsState(alarmSet);
        });
      }
    });
  } catch (e) {
    // saving error
    console.log(e);
  }
};

/**
 * getAlarms
 *
 * Get all alarms in storage
 */
export const getAlarms = async () => {
  let alarms;
  try {
    alarms = await AsyncStorage.getItem(storageKeys.alarms);
    return alarms != null ? JSON.parse(alarms) : null;
  } catch (e) {
    // getting error
    console.log(e);
  }
};

/**
 * updateAlarms
 *
 * Apdate alarms in storage
 *
 * @param alarms
 */
export const updateAlarms = async (alarms: alarmObject) => {
  const jsonValue = JSON.stringify(alarms);
  return AsyncStorage.setItem(storageKeys.alarms, jsonValue);
};

/**
 * getTimeTillAlarm
 *
 * Calculates the remaining time till alarm time passed through parameter goes off
 *
 * @param time
 */
export const getTimeTillAlarm = (time: twelveHrTime | AlarmInterface) => {
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

/**
 * findNearestActiveAlarm
 *
 * Find the nearest active alarm from current time in hours and minutes
 *
 * @param activeAlarms
 */
export const findNearestActiveAlarm = (activeAlarms: Map<string, AlarmInterface>): AlarmInterface | undefined => {
  let nearestAlarm: AlarmInterface | any = activeAlarms.get(activeAlarms.entries().next().value[0]);
  let lowest = getTimeTillAlarm(nearestAlarm);
  for (let [_, alarmValue] of activeAlarms) {
    let tempTimeTill = getTimeTillAlarm(alarmValue);
    if (tempTimeTill.hour < lowest.hour) {
      lowest = tempTimeTill;
      nearestAlarm = alarmValue;
    } else if (lowest.hour === tempTimeTill.hour && tempTimeTill.minute < lowest.minute) {
      lowest = tempTimeTill;
      nearestAlarm = alarmValue;
    }
  }
  return nearestAlarm;
};
