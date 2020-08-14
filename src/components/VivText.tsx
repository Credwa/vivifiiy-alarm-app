import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '@/constants/Colors';

interface FontStyle {
  fontFamily: string;
  fontSize: number;
}
interface TextProps {
  children?: React.ReactNode;
  color?: string;
  fontName:
    | 'Title1'
    | 'Title2'
    | 'Title3'
    | 'Title4'
    | 'Title5'
    | 'Title6'
    | 'Headline'
    | 'Body'
    | 'Callout'
    | 'Subhead'
    | 'Footnote'
    | 'Caption'
    | 'CardSubtitle'
    | 'CardTitle';
}

export type VivTextProps = TextProps & Text['props'];

function setFontStyle(size: number, family: string): FontStyle {
  const fontStyle: FontStyle = { fontSize: size, fontFamily: family };
  return fontStyle;
}

export default function VivText(props: VivTextProps) {
  let fontStyle: FontStyle;
  switch (props.fontName) {
    case 'Title1':
      fontStyle = setFontStyle(48, 'Nunito_400Regular');
      break;
    case 'Title2':
      fontStyle = setFontStyle(44, 'Nunito_400Regular');
      break;
    case 'Title3':
      fontStyle = setFontStyle(34, 'Nunito_400Regular');
      break;
    case 'Title4':
      fontStyle = setFontStyle(28, 'Nunito_400Regular');
      break;
    case 'Title5':
      fontStyle = setFontStyle(22, 'Nunito_400Regular');
      break;
    case 'Title6':
      fontStyle = setFontStyle(20, 'Nunito_400Regular');
      break;
    case 'Headline':
      fontStyle = setFontStyle(17, 'Nunito_600SemiBold');
      break;
    case 'Body':
      fontStyle = setFontStyle(17, 'Nunito_400Regular');
      break;
    case 'Callout':
      fontStyle = setFontStyle(16, 'Nunito_400Regular');
      break;
    case 'Subhead':
      fontStyle = setFontStyle(15, 'Nunito_400Regular');
      break;
    case 'Footnote':
      fontStyle = setFontStyle(13, 'Nunito_400Regular');
      break;
    case 'Caption':
      fontStyle = setFontStyle(12, 'Nunito_400Regular');
      break;
    default:
      fontStyle = setFontStyle(17, 'Nunito_400Regular');
  }
  return <Text style={[styles.text, fontStyle, { color: props.color }, props.style]}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: Colors.greyLight2
  }
});
