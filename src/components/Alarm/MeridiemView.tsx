import React, { useEffect } from 'react';
import ScrollSelector from '@/components/ScrollSelector';
import Colors from '@/constants/Colors';
import { meridiem } from '@/types';
import useStore from '@/store';
import { smallScreenWidthBreakpoint, largeScreenWidthBreakpoint } from '@/constants/Values';
import { findSelectedAlarmViewIndex } from '@/utils';
import { Dimensions } from 'react-native';
interface SnapScrollProps {
  data: meridiem[];
  initValue: meridiem;
}

const windowWidth = Dimensions.get('window').width;

export default function MeridiemView({ data, initValue }: SnapScrollProps) {
  const updateMeridiemOnChange = useStore((state) => state.setMeridiem);
  useEffect(() => {
    updateMeridiemOnChange(initValue);
  }, []);

  return (
    <ScrollSelector
      dataSource={data}
      overrideFontName={
        windowWidth < smallScreenWidthBreakpoint
          ? ['Title5', 'Title6']
          : windowWidth > largeScreenWidthBreakpoint
          ? ['Title1', 'Title2']
          : ['Title3', 'Title4']
      }
      selectedIndex={findSelectedAlarmViewIndex(data, initValue, 0)}
      onValueChange={(data) => {
        updateMeridiemOnChange(data);
      }}
      wrapperHeight={
        windowWidth < smallScreenWidthBreakpoint ? 175 : windowWidth > largeScreenWidthBreakpoint ? 300 : 200
      }
      wrapperWidth={
        windowWidth < smallScreenWidthBreakpoint ? 55 : windowWidth > largeScreenWidthBreakpoint ? 150 : 80
      }
      itemHeight={windowWidth < smallScreenWidthBreakpoint ? 65 : windowWidth > largeScreenWidthBreakpoint ? 110 : 75}
      highlightColor={Colors.greyLight3}
      highlightBorderWidth={1}
    />
  );
}
