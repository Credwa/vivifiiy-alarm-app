import React, { useEffect, useState } from 'react';
import ScrollSelector from '@/components/ScrollSelector';
import Colors from '@/constants/Colors';
import { meridiem } from '@/types';
import useStore from '@/store';
import { findSelectedAlarmViewIndex, resize } from '@/utils';
import { FontName } from '../VivText';
interface SnapScrollProps {
  data: meridiem[];
  initValue: meridiem;
}

export default function MeridiemView({ data, initValue }: SnapScrollProps) {
  const [listState, setEndOfList] = useState(data);
  const updateMeridiemOnChange = useStore((state) => state.setMeridiem);
  useEffect(() => {
    updateMeridiemOnChange(initValue);
  }, []);

  return (
    <ScrollSelector
      dataSource={listState}
      overrideFontName={resize<FontName[]>(['Title3', 'Title4'], ['Title5', 'Title6'], ['Title1', 'Title2'])}
      selectedIndex={findSelectedAlarmViewIndex(data, initValue, 0)}
      onValueChange={(data) => {
        updateMeridiemOnChange(data);
      }}
      wrapperHeight={resize<number>(200, 175, 300)}
      wrapperWidth={resize<number>(80, 55, 150)}
      itemHeight={resize<number>(75, 65, 110)}
      highlightColor={Colors.greyLight3}
      highlightBorderWidth={1}
    />
  );
}
