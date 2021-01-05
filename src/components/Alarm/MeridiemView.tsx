import React, { useEffect } from 'react';
import ScrollSelector from '@/components/ScrollSelector';
import Colors from '@/constants/Colors';
import { meridiem } from '@/types';
import useStore from '@/store';
import { findSelectedAlarmViewIndex, resize } from '@/utils';
interface SnapScrollProps {
  data: meridiem[];
  initValue: meridiem;
}

export default function MeridiemView({ data, initValue }: SnapScrollProps) {
  const updateMeridiemOnChange = useStore((state) => state.setMeridiem);
  useEffect(() => {
    updateMeridiemOnChange(initValue);
  }, []);

  return (
    <ScrollSelector
      dataSource={data}
      overrideFontName={resize(['Title3', 'Title4'], ['Title5', 'Title6'], ['Title1', 'Title2'])}
      selectedIndex={findSelectedAlarmViewIndex(data, initValue, 0)}
      onValueChange={(data) => {
        updateMeridiemOnChange(data);
      }}
      wrapperHeight={resize(200, 175, 300)}
      wrapperWidth={resize(80, 55, 150)}
      itemHeight={resize(75, 65, 110)}
      highlightColor={Colors.greyLight3}
      highlightBorderWidth={1}
    />
  );
}
