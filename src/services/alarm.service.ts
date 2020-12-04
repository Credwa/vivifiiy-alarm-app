import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlarmInterface } from '@/interfaces';
import { alarmObject } from '@/types';

export const clearAlarms = async () => {
  await AsyncStorage.removeItem('@alarms');
};

export const createNewAlarm = async (time: AlarmInterface, setAlarmsState: (newAlarms: alarmObject) => void) => {
  try {
    getAlarms().then(async (alarmData) => {
      let jsonValue: string;
      if (alarmData) {
        let alarmSet: alarmObject = { ...alarmData, [time.key]: time };
        jsonValue = JSON.stringify(alarmSet);
        await AsyncStorage.setItem('@alarms', jsonValue).then(() => {
          setAlarmsState(alarmSet);
        });
      } else {
        let alarmSet: alarmObject = { [time.key]: time };
        jsonValue = JSON.stringify(alarmSet);
        await AsyncStorage.setItem('@alarms', jsonValue).then(() => {
          setAlarmsState(alarmSet);
        });
      }
    });
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getAlarms = async () => {
  let alarms;
  try {
    alarms = await AsyncStorage.getItem('@alarms');
    return alarms != null ? JSON.parse(alarms) : null;
  } catch (e) {
    // getting error
    console.log(e);
  }
};
