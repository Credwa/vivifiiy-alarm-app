import { getAlarms } from '@/services/alarm.service';
import { useState, useEffect } from 'react';
import useStore from '@/store';
import { alarmObject } from '@/types';

export default function useLoadAlarms() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const setAlarmsState = useStore((state) => state.setAlarms);
  useEffect(() => {
    getAlarms()
      .then((alarms: alarmObject) => {
        setAlarmsState(alarms);
      })
      .finally(() => {
        setLoadingComplete(true);
      });
  }, []);

  return isLoadingComplete;
}
