import { AlarmInterface } from '@/interfaces';
import { alarmObject, meridiem, twelveHrTime } from '@/types';
import create from 'zustand';
import { updateAlarms } from '@/services/alarm.service';
import { scheduleAlarmNotification } from '@/services/notification.service';

type State = {
  timeStandard: string;
  hour: string;
  minute: string;
  meridiem: meridiem;
  alarms: alarmObject;
  setHour: (hr: string) => void;
  setMinute: (min: string) => void;
  setMeridiem: (mer: meridiem) => void;
  setAlarms: (newAlarms: alarmObject) => void;
  setAlarm: (key: string, value: AlarmInterface) => void;
  removeAlarm: (key: string) => void;
  getCurrentAlarm: () => twelveHrTime;
  getActiveAlarms: () => Map<string, AlarmInterface>;
  getAllAlarms: () => Map<string, AlarmInterface>;
};

const useStore = create<State>((set, get) => ({
  timeStandard: '12h',
  hour: '07',
  minute: '30',
  alarms: {},
  meridiem: 'AM',
  setHour: (newHour: string) => set(() => ({ hour: newHour })),
  setMinute: (newMinute: string) => set(() => ({ minute: newMinute })),
  setMeridiem: (newMeridiem: meridiem) => set(() => ({ meridiem: newMeridiem })),
  setAlarms: (newAlarms: alarmObject) =>
    set(() => {
      for (const alarm in newAlarms) {
        if (newAlarms[alarm].active) {
          scheduleAlarmNotification(newAlarms[alarm]);
        }
      }
      return { alarms: newAlarms };
    }),
  setAlarm: (key: string, value: AlarmInterface) => {
    const newAlarms = { ...get().alarms };
    newAlarms[key] = value;
    if (value.active) {
      scheduleAlarmNotification(value);
    }
    updateAlarms(newAlarms).catch((e) => {
      console.log(e);
    });
    return set(() => ({ alarms: newAlarms }));
  },
  removeAlarm: (key: string) => {
    const newAlarms = { ...get().alarms };
    delete newAlarms[key];
    updateAlarms(newAlarms).catch((e) => {
      console.log(e);
    });
    return set(() => ({ alarms: newAlarms }));
  },
  getCurrentAlarm: () => {
    const time = { hour: get().hour, minute: get().minute, meridiem: get().meridiem };
    return time;
  },
  getAllAlarms: () => {
    const alarms = get().alarms;
    const allAlarms: Map<string, AlarmInterface> = new Map();
    for (const alarm in alarms) {
      allAlarms.set(alarm, alarms[alarm]);
    }
    return new Map(
      [...allAlarms].sort((a, b) => {
        function findValue(alarm: AlarmInterface) {
          let value = Number(alarm.hour) + Number(alarm.minute) / 100 + (alarm.meridiem === 'PM' ? 12 : 0);
          return value;
        }
        return findValue(a[1]) > findValue(b[1]) ? 1 : -1;
      })
    );
  },
  getActiveAlarms: () => {
    const alarms = get().alarms;
    const activeAlarms: Map<string, AlarmInterface> = new Map();
    for (const alarm in alarms) {
      if (alarms[alarm].active) {
        activeAlarms.set(alarm, alarms[alarm]);
      }
    }
    return activeAlarms;
  }
}));

export default useStore;
