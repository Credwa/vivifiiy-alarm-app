import { AlarmInterface } from '@/interfaces';
import { alarmObject, meridiem, twelveHrTime } from '@/types';
import create from 'zustand';

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
  getCurrentAlarm: () => twelveHrTime;
  getActiveAlarms: () => Map<string, AlarmInterface>;
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
  setAlarms: (newAlarms: alarmObject) => set(() => ({ alarms: newAlarms })),
  getCurrentAlarm: () => {
    const time = { hour: get().hour, minute: get().minute, meridiem: get().meridiem };
    return time;
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
