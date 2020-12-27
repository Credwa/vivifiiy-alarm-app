import React from 'react';
import ScrollSelector from '@/components/ScrollSelector';
import Colors from '@/constants/Colors';
import VivText from '@/components/VivText';
import { smallScreenWidthBreakpoint, largeScreenWidthBreakpoint } from '@/constants/Values';
import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;

interface SongSelectorProps {
  data: any[];
}

export default function SongSelector({ data }: SongSelectorProps) {
  return (
    <>
      <VivText
        fontName={
          windowWidth < smallScreenWidthBreakpoint
            ? 'Body'
            : windowWidth > largeScreenWidthBreakpoint
            ? 'Title3'
            : 'Title5'
        }
        color={Colors.greyLight1}
      >
        Up next...
      </VivText>
      <ScrollSelector
        dataSource={data}
        overrideFontName={
          windowWidth < smallScreenWidthBreakpoint
            ? ['Subhead', 'Caption']
            : windowWidth > largeScreenWidthBreakpoint
            ? ['Title1', 'Title2']
            : ['Headline', 'Footnote']
        }
        selectedIndex={1}
        onValueChange={(data) => {}}
        wrapperWidth={windowWidth}
        wrapperHeight={wp('50%')}
        itemHeight={
          windowWidth < smallScreenWidthBreakpoint ? 45 : windowWidth > largeScreenWidthBreakpoint ? 110 : 50
        }
        highlightColor={Colors.white}
        highlightBorderWidth={0.001}
      />
    </>
  );
}
