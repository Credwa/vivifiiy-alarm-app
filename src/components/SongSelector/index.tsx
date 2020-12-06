import * as React from 'react';
import ScrollSelector from '@/components/ScrollSelector';
import Colors from '@/constants/Colors';
import VivText from '@/components/VivText';

interface SongSelectorProps {
  data: any[];
}

export default function SongSelector({ data }: SongSelectorProps) {
  return (
    <>
      <VivText fontName="Title5" color={Colors.greyLight1}>
        Up next...
      </VivText>
      <ScrollSelector
        dataSource={data}
        overrideFontName={['Headline', 'Footnote']}
        selectedIndex={1}
        onValueChange={(data) => {}}
        wrapperWidth={350}
        itemHeight={50}
        highlightColor={Colors.white}
        highlightBorderWidth={0.001}
      />
    </>
  );
}
