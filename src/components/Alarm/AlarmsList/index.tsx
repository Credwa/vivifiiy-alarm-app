import { AlarmInterface } from '@/interfaces';
import React, { useRef } from 'react';
import AlarmListItem from './AlarmsListItem';
import { FlatList } from 'react-native-gesture-handler';

interface AlarmsListProps {
  alarms: Map<string, AlarmInterface>;
}

export default function AlarmList({ alarms }: AlarmsListProps) {
  let openAlarm: any = useRef(0);
  const onSetOpenAlarm = (ref: any) => {
    if (ref?.props?.children?._owner?.key !== openAlarm?.props?.children?._owner?.key && openAlarm.props) {
      openAlarm.close();
    }
    openAlarm = ref;
  };

  const renderAlarmListItem = ({ item }: any) => (
    <AlarmListItem
      alarm={item[1]}
      key={item[0]}
      setOpenAlarm={onSetOpenAlarm}
      isLastAlarm={[...alarms][alarms.size - 1][1].key === item[0]}
    />
  );
  return (
    <FlatList data={[...alarms]} bounces={false} renderItem={renderAlarmListItem} keyExtractor={(item) => item[0]} />
  );
}
