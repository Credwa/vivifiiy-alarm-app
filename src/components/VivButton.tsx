import Colors from '@/constants/Colors';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, Pressable, GestureResponderEvent, View } from 'react-native';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import VivText from '@/components/VivText';

interface PaddingHorizontal {
  left: number;
  right: number;
}
interface ButtonProps {
  icon?: React.ReactComponentElement<Icon<string, any>>;
  text: string;
  iconPosition?: 'left' | 'right';
  separator?: boolean;
  type?: 'basic' | 'separated';
  paddingHorizontal?: PaddingHorizontal;
  paddingVertical?: number;
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

  return !props.separator ? (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: color,
          paddingVertical: props.paddingVertical || 13.5,
          paddingLeft: props.paddingHorizontal && props.paddingHorizontal.left ? props.paddingHorizontal.left : 12.5,
          paddingRight: props.paddingHorizontal && props.paddingHorizontal.right ? props.paddingHorizontal.right : 12.5
        }
      ]}
      onPress={props.onPress}
    >
      {props.iconPosition && props.iconPosition === 'left' ? props.icon : null}
      <VivText fontName="Headline" color={Colors.blueDark} style={margin}>
        {props.text}
      </VivText>
      {!props.iconPosition || props.iconPosition === 'right' ? props.icon : null}
    </Pressable>
  ) : (
    <Pressable style={[styles.buttonSeparated, { backgroundColor: color }]} onPress={props.onPress}>
      <View style={[styles.iconSeparatedView, { paddingVertical: props.paddingVertical || 13.5 }]}>{props.icon}</View>
      <VivText
        fontName="Headline"
        color={Colors.blueDark}
        style={[
          styles.textSeparated,
          {
            paddingVertical: props.paddingVertical || 13.5,
            paddingLeft: props.paddingHorizontal && props.paddingHorizontal.left ? props.paddingHorizontal.left : 12.5,
            paddingRight:
              props.paddingHorizontal && props.paddingHorizontal.right ? props.paddingHorizontal.right : 12.5
          }
        ]}
      >
        {props.text}
      </VivText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    borderRadius: 7
  },
  buttonSeparated: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 7
  },
  iconSeparatedView: {
    borderRightWidth: 0.3,
    borderColor: Colors.greyLight2,
    paddingHorizontal: 18
  },
  textSeparated: {
    paddingVertical: 13.5,
    paddingLeft: 10,
    paddingRight: 25
  }
});
