import * as React from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import ScrollSelector from '@/components/ScrollSelector';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import useStore from '@/store';
import { useEffect } from 'react';
import { findSelectedAlarmViewIndex } from '@/utils';
interface SnapScrollProps {
  data: string[];
  initValue: string;
}

export default function HourView({ data, initValue }: SnapScrollProps) {
  const [listState, setEndOfList] = useState(data);
  const [timesExtended, setTimesExtended] = useState(0);
  const updateHourOnChange = useStore((state) => state.setHour);
  const onEndReached = (event: NativeSyntheticEvent<NativeScrollEvent> | NativeScrollEvent) => {
    if (timesExtended <= 2) {
      setEndOfList([...listState, ...data]);
      setTimesExtended(timesExtended + 1);
    }
  };
  useEffect(() => {
    updateHourOnChange(initValue);
  }, []);

  return (
    <ScrollSelector
      dataSource={listState}
      selectedIndex={findSelectedAlarmViewIndex(data, initValue, 11)}
      onValueChange={(data) => {
        updateHourOnChange(data);
      }}
      wrapperHeight={200}
      wrapperWidth={60}
      onEndReached={onEndReached}
      itemHeight={75}
      highlightColor={Colors.greyLight3}
      highlightBorderWidth={1}
    />
  );
}
