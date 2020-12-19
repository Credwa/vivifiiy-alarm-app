import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import ScrollSelector from '@/components/ScrollSelector';
import Colors from '@/constants/Colors';
import useStore from '@/store';
import { findSelectedAlarmViewIndex } from '@/utils';

interface SnapScrollProps {
  data: string[];
  initValue: string;
}

export default function MinuteView({ data, initValue }: SnapScrollProps) {
  const [listState, setEndOfList] = useState(data);
  const [timesExtended, setTimesExtended] = useState(0);
  const updateMinuteOnChange = useStore((state) => state.setMinute);
  const onEndReached = (event: NativeSyntheticEvent<NativeScrollEvent> | NativeScrollEvent) => {
    if (timesExtended <= 2) {
      setEndOfList([...listState, ...data]);
      setTimesExtended(timesExtended + 1);
    }
  };
  useEffect(() => {
    updateMinuteOnChange(initValue);
  }, []);

  return (
    <ScrollSelector
      dataSource={listState}
      selectedIndex={findSelectedAlarmViewIndex(data, initValue, 58)}
      onValueChange={(data) => {
        updateMinuteOnChange(data);
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
