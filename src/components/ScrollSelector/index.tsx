import Colors from '@/constants/Colors';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { ScrollView, Platform, TextStyle, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import Container from './src/Container';
import HighlightView from './src/HighlightView';
import ItemText from './src/ItemText';
import PlaceHolder from './src/Placeholder';
import SelectedItem from './src/SelectedItem';

interface IProps<T> {
  dataSource: T[];
  overrideFontName?: string[] | string;
  renderItem?: (data: T, index: number) => React.ReactNode | ReactElement;
  selectedIndex?: number;
  onValueChange?: (value: T, index: number) => void;
  onEndReached?: (event: NativeSyntheticEvent<NativeScrollEvent> | NativeScrollEvent) => void;
  highlightColor?: string;
  itemHeight?: number;
  wrapperBackground?: string | any;
  wrapperWidth?: number | string;
  wrapperHeight?: number;
  highlightWidth?: number | string;
  highlightBorderWidth?: number;
  itemTextStyle?: TextStyle;
  activeItemTextStyle?: TextStyle;
  onMomentumScrollEnd?: () => void;
  onScrollEndDrag?: () => void;
}

let timer: NodeJS.Timeout;

const ScrollSelector = <T,>({
  selectedIndex,
  renderItem,
  dataSource,
  wrapperHeight,
  itemHeight,
  overrideFontName,
  onValueChange,
  onEndReached,
  onScrollEndDrag,
  onMomentumScrollEnd,
  highlightWidth,
  wrapperWidth,
  wrapperBackground,
  highlightColor,
  highlightBorderWidth,
  activeItemTextStyle,
  itemTextStyle
}: IProps<T>) => {
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(1);

  let isScrollTo = useRef(false);
  let dragStarted = useRef(false);
  let momentumStarted = useRef(false);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (selectedIndex !== undefined) {
      setTimeout(() => {
        scrollToIndex(selectedIndex);
      }, 1);
    }

    if (timer) return () => clearTimeout(timer);
  }, []);

  const scrollFix = (e: any) => {
    let verticalY = 0;
    if (e?.nativeEvent?.contentOffset) {
      verticalY = e.nativeEvent.contentOffset.y;
    }
    const h = itemHeight || 60;
    const selectedIndex = Math.round(verticalY / h);
    const verticalElem = selectedIndex * h;
    if (verticalElem !== verticalY) {
      if (Platform.OS === 'ios') isScrollTo.current = true;
      scrollViewRef.current?.scrollTo({ y: verticalElem });
    }
    if (currentSelectedIndex === selectedIndex) return;
    setCurrentSelectedIndex(selectedIndex);

    if (onValueChange) {
      onValueChange(dataSource[selectedIndex], selectedIndex);
    }
  };

  const onScrollBeginDrag = () => {
    dragStarted.current = true;
    if (Platform.OS === 'ios') isScrollTo.current = false;
    if (timer) clearTimeout(timer);
  };

  const onScrollEndDragPrivate = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScrollEndDrag && onScrollEndDrag();
    e.persist();
    dragStarted.current = false;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (!momentumStarted.current && !dragStarted.current) scrollFix(e);
    }, 10);
  };

  const onMomentumScrollBegin = () => {
    momentumStarted.current = true;
    if (timer) clearTimeout(timer);
  };

  const onMomentumScrollEndPrivate = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    onMomentumScrollEnd && onMomentumScrollEnd();
    momentumStarted.current = false;
    if (!isScrollTo.current && !momentumStarted.current && !dragStarted.current) scrollFix(e);
  };

  const scrollToIndex = (ind: number) => {
    setCurrentSelectedIndex(ind);
    const y = (itemHeight || 60) * ind;
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y });
    }, 1);
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const renderItemPrivate = (data: T, index: number) => {
    const isSelected = index === currentSelectedIndex;

    let setFontName = () => {
      if (overrideFontName && Array.isArray(overrideFontName)) {
        return isSelected ? overrideFontName[0] : overrideFontName[1];
      } else if (overrideFontName && typeof overrideFontName == 'string') {
        return overrideFontName;
      } else {
        return isSelected ? 'Title1' : 'Title2';
      }
    };

    const item = (
      <ItemText fontName={setFontName()} color={isSelected ? Colors.greyLight1 : Colors.greyLight2}>
        {data}
      </ItemText>
    );

    return (
      <SelectedItem key={index} itemHeight={itemHeight || 60}>
        {item}
      </SelectedItem>
    );
  };

  return (
    <Container
      wrapperHeight={wrapperHeight || 180}
      wrapperWidth={wrapperWidth || 150}
      wrapperBackground={wrapperBackground || null}
    >
      <HighlightView
        highlightColor={highlightColor || '#333'}
        highlightWidth={highlightWidth || '100%'}
        wrapperHeight={wrapperHeight || 180}
        itemHeight={itemHeight || 60}
        highlightBorderWidth={highlightBorderWidth || 2}
      />
      <ScrollView
        ref={scrollViewRef}
        onScroll={({ nativeEvent }) => {
          if (onEndReached) {
            if (isCloseToBottom(nativeEvent)) {
              onEndReached(nativeEvent);
            }
          }
        }}
        scrollEventThrottle={400}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onMomentumScrollBegin={() => onMomentumScrollBegin()}
        onMomentumScrollEnd={(e) => onMomentumScrollEndPrivate(e)}
        onScrollBeginDrag={() => onScrollBeginDrag()}
        onScrollEndDrag={(e) => onScrollEndDragPrivate(e)}
      >
        <PlaceHolder itemHeight={itemHeight} wrapperHeight={wrapperHeight} />
        {dataSource.map(renderItem ? renderItem : renderItemPrivate)}
        <PlaceHolder itemHeight={itemHeight} wrapperHeight={wrapperHeight} />
      </ScrollView>
    </Container>
  );
};

export default ScrollSelector;
