import * as React from 'react';
import { StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import ScrollSelector from '@/components/ScrollSelector';
import { useState } from 'react';
import Colors from '@/constants/Colors';

interface SnapScrollProps {
  data: string[];
}

export default function MinuteView({ data }: SnapScrollProps) {
  const [listState, setEndOfList] = useState(data);
  const [timesExtended, setTimesExtended] = useState(0);

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
      onValueChange={(data, selectedIndex) => {
        console.log(data);
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

const styles = StyleSheet.create({
  slide: {
    flex: 0.2,
    alignItems: 'center'
  }
});
