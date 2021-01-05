import React from 'react';
import ScrollSelector from '@/components/ScrollSelector';
import Colors from '@/constants/Colors';
import VivText from '@/components/VivText';
import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { resize } from '@/utils';
interface SongSelectorProps {
  data: any[];
}

export default function SongSelector({ data }: SongSelectorProps) {
  return (
    <>
      <VivText fontName={resize('Title5', 'Body', 'Title3')} color={Colors.greyLight1}>
        Up next...
      </VivText>
      <ScrollSelector
        dataSource={data}
        overrideFontName={resize(['Headline', 'Footnote'], ['Subhead', 'Caption'], ['Title1', 'Title2'])}
        selectedIndex={1}
        onValueChange={(data) => {}}
        wrapperWidth={Dimensions.get('window').width}
        wrapperHeight={wp('50%')}
        itemHeight={resize(50, 45, 110)}
        highlightColor={Colors.white}
        highlightBorderWidth={0.001}
      />
    </>
  );
}
