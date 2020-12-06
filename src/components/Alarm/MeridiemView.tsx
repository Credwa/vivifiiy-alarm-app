import * as React from 'react';
import ScrollSelector from '@/components/ScrollSelector';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { meridiem } from '@/types';
import useStore from '@/store';
import { useEffect } from 'react';
import { findSelectedAlarmViewIndex } from '@/utils';
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
      overrideFontName={['Title3', 'Title4']}
      selectedIndex={findSelectedAlarmViewIndex(data, initValue, 0)}
      onValueChange={(data) => {
        updateMeridiemOnChange(data);
      }}
      wrapperHeight={200}
      wrapperWidth={80}
      itemHeight={75}
      highlightColor={Colors.greyLight3}
      highlightBorderWidth={1}
    />
  );
}
