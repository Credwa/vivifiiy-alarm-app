import * as React from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import ScrollSelector from '@/components/ScrollSelector';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import useStore from '@/store';
interface SnapScrollProps {
  data: string[];
}

export default function HourView({ data }: SnapScrollProps) {
  const [listState, setEndOfList] = useState(data);
  const [timesExtended, setTimesExtended] = useState(0);
  const updateHourOnChange = useStore((state) => state.setHour);
  const onEndReached = (event: NativeSyntheticEvent<NativeScrollEvent> | NativeScrollEvent) => {
    if (timesExtended <= 2) {
      setEndOfList([...listState, ...data]);
      setTimesExtended(timesExtended + 1);
    }
  };

  return (
    <ScrollSelector
      dataSource={listState}
      selectedIndex={Math.ceil(data.length / 2)}
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