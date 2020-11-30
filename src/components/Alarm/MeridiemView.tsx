import * as React from 'react';
import { StyleSheet } from 'react-native';
import ScrollSelector from '@/components/ScrollSelector';
import { useState } from 'react';
import Colors from '@/constants/Colors';
interface SnapScrollProps {
  data: string[];
}

export default function MeridiemView({ data }: SnapScrollProps) {
  const [listState, setEndOfList] = useState(data);

  return (
    <ScrollSelector
      dataSource={listState}
      overrideFontName={['Title3', 'Title4']}
      selectedIndex={0}
      onValueChange={(data, selectedIndex) => {
        console.log(data, selectedIndex);
      }}
      wrapperHeight={200}
      wrapperWidth={80}
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
