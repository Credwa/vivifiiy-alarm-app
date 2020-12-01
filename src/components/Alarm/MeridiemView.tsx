import * as React from 'react';
import ScrollSelector from '@/components/ScrollSelector';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { meridiem } from '@/types';
import useStore from '@/store';
interface SnapScrollProps {
  data: meridiem[];
}

export default function MeridiemView({ data }: SnapScrollProps) {
  const [listState, setEndOfList] = useState(data);
  const updateMeridiemOnChange = useStore((state) => state.setMeridiem);

  return (
    <ScrollSelector
      dataSource={listState}
      overrideFontName={['Title3', 'Title4']}
      selectedIndex={0}
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
