import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import ScrollSelector from '@/components/ScrollSelector';
import Colors from '@/constants/Colors';
import useStore from '@/store';
import { findSelectedAlarmViewIndex, resize } from '@/utils';
import { FontName } from '../VivText';
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
      overrideFontName={resize<FontName[]>(['Title1', 'Title2'], ['Title3', 'Title4'], ['TitleBig1', 'TitleBig2'])}
      selectedIndex={findSelectedAlarmViewIndex(data, initValue, 11)}
      onValueChange={(data) => {
        updateHourOnChange(data);
      }}
      wrapperHeight={resize<number>(200, 175, 300)}
      wrapperWidth={resize<number>(60, 45, 150)}
      onEndReached={onEndReached}
      itemHeight={resize<number>(75, 65, 110)}
      highlightColor={Colors.greyLight3}
      highlightBorderWidth={1}
    />
  );
}
