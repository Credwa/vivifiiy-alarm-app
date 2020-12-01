import { meridiem, twelveHrTime } from '@/types';
import create from 'zustand';

type State = {
  timeStandard: string;
  hour: string;
  minute: string;
  meridiem: meridiem;
  setHour: (hr: string) => void;
  setMinute: (min: string) => void;
  setMeridiem: (mer: meridiem) => void;
  getCurrentAlarm: () => twelveHrTime;
};

const useStore = create<State>((set, get) => ({
  timeStandard: '12h',
  hour: '07',
  minute: '30',
  meridiem: 'AM',
  setHour: (newHour: string) => set((state) => ({ hour: newHour })),
  setMinute: (newMinute: string) => set((state) => ({ minute: newMinute })),
  setMeridiem: (newMeridiem: meridiem) => set((state) => ({ meridiem: newMeridiem })),
  getCurrentAlarm: () => {
    const time = { hour: get().hour, minute: get().minute, meridiem: get().meridiem };
    return time;
  }
}));

export default useStore;
