import Colors from '@/constants/Colors';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import VivText from '@/components/VivText';

interface ButtonProps {
  icon?: React.ReactComponentElement<Icon<string, any>>;
  text: string;
  iconPosition?: 'left' | 'right';
  seperator?: boolean;
  type?: 'basic' | 'separated';
  color?: 'Primary' | 'Secondary' | 'Default';
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
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
    case 'right':
      margin.marginRight = 8;
      break;
    default:
      margin.marginRight = 8;
  }

  return !props.type || props.type === 'basic' ? (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} {...props}>
      {props.iconPosition && props.iconPosition === 'left' ? props.icon : null}
      <VivText fontName="Headline" color={Colors.blueDark} style={margin}>
        {props.text}
      </VivText>
      {!props.iconPosition || props.iconPosition === 'right' ? props.icon : null}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={[styles.buttonSeperated, { backgroundColor: color }]} {...props}>
      <VivText fontName="Headline" style={margin}>
        {props.text}
      </VivText>
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
  },
  buttonSeperated: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 7
  }
});
