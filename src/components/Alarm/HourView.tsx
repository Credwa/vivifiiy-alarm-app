import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native';
import ScrollSelector from '@/components/ScrollSelector';
import Colors from '@/constants/Colors';
import useStore from '@/store';
import { smallScreenWidthBreakpoint, largeScreenWidthBreakpoint } from '@/constants/Values';
import { findSelectedAlarmViewIndex } from '@/utils';
interface SnapScrollProps {
  data: string[];
  initValue: string;
}

const windowWidth = Dimensions.get('window').width;

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
      overrideFontName={
        windowWidth < smallScreenWidthBreakpoint
          ? ['Title3', 'Title4']
          : windowWidth > largeScreenWidthBreakpoint
          ? ['TitleBig1', 'TitleBig2']
          : ['Title1', 'Title2']
      }
      selectedIndex={findSelectedAlarmViewIndex(data, initValue, 11)}
      onValueChange={(data) => {
        updateHourOnChange(data);
      }}
      wrapperHeight={
        windowWidth < smallScreenWidthBreakpoint ? 175 : windowWidth > largeScreenWidthBreakpoint ? 300 : 200
      }
      wrapperWidth={
        windowWidth < smallScreenWidthBreakpoint ? 45 : windowWidth > largeScreenWidthBreakpoint ? 150 : 60
      }
      onEndReached={onEndReached}
      itemHeight={windowWidth < smallScreenWidthBreakpoint ? 65 : windowWidth > largeScreenWidthBreakpoint ? 110 : 75}
      highlightColor={Colors.greyLight3}
      highlightBorderWidth={1}
    />
  );
}
