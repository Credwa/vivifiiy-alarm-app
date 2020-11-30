import React, { FC } from 'react';
import { Text, TextStyle } from 'react-native';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';

interface ITextProps {
  style?: TextStyle;
  fontName: any;
  color: string;
}
const ItemText: FC<ITextProps> = ({ fontName, color, children, style }) => (
  <VivText fontName={fontName} color={color}>
    {children}
  </VivText>
);

export default ItemText;
