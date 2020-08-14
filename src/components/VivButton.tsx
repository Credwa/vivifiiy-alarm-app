import Colors from '@/constants/Colors';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  icon?: React.ReactComponentElement<any>;
  text: string;
  iconPosition?: 'left' | 'right';
  seperator?: boolean;
  color?: 'Primary' | 'Secondary' | 'Default';
}

export default function VivButton(props: ButtonProps) {
  let color = Colors.white;
  let margin = { marginLeft: 0, marginRight: 0 };
  switch (props.color) {
    case 'Primary':
      color = Colors.blueLight2;
      break;
    case 'Secondary':
      color = Colors.orangeMedium;
      break;
    default:
      color = Colors.white;
  }

  switch (props.iconPosition) {
    case 'left':
      margin.marginLeft = 8;
      break;
    default:
      margin.marginRight = 8;
  }

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} {...props}>
      {props.iconPosition && props.iconPosition === 'left' ? props.icon : null}
      <Text style={margin}>{props.text}</Text>
      {!props.iconPosition || props.iconPosition === 'right' ? props.icon : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingVertical: 13.5,
    borderRadius: 7
  }
});
