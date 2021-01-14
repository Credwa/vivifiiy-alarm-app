import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Pressable, GestureResponderEvent, View, Image } from 'react-native';
import VivText, { FontName } from '@/components/VivText';
import { resize } from '@/utils';

interface PaddingHorizontal {
  left: number;
  right: number;
}
interface ButtonProps {
  icon?: any;
  text?: string;
  style?: any;
  iconPosition?: 'left' | 'right';
  separator?: boolean;
  type?: 'basic' | 'separated';
  paddingHorizontal?: PaddingHorizontal;
  paddingVertical?: number;
  color?: 'Primary' | 'Secondary' | 'Spotify' | 'Default';
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export default function VivButton(props: ButtonProps) {
  let color = { default: Colors.white, pressed: Colors.greyLight1 };
  let margin = { marginLeft: 0, marginRight: 0 };
  switch (props.color) {
    case 'Primary':
      color = { default: Colors.blueLight2, pressed: Colors.blueLight3 };
      break;
    case 'Secondary':
      color = { default: Colors.orangeMedium, pressed: Colors.orangeMedium2 };
      break;
    case 'Spotify':
      color = { default: '#1DB954', pressed: '#45ba69' };
    default:
      color = color;
  }

  if (props.iconPosition === 'left') {
    margin.marginLeft = 8;
  } else if (props.iconPosition === 'right') {
    margin.marginRight = 8;
  }

  return !props.separator ? (
    <Pressable
      style={({ pressed }) => [
        {
          ...styles.button,
          ...props.style,
          backgroundColor: pressed ? color.pressed : color.default,
          paddingVertical: props.paddingVertical || 13.5,
          paddingLeft: props.paddingHorizontal && props.paddingHorizontal.left ? props.paddingHorizontal.left : 12.5,
          paddingRight: props.paddingHorizontal && props.paddingHorizontal.right ? props.paddingHorizontal.right : 12.5
        }
      ]}
      onPress={props.onPress}
    >
      {({ pressed }) => (
        <>
          {props.icon && props.iconPosition && props.iconPosition === 'left'
            ? React.cloneElement(props.icon, {
                color: props.icon.props.color,
                name: props.icon.props.name,
                size: resize<number>(24, 20, 34)
              })
            : null}
          <VivText
            fontName={resize<FontName>('Headline', 'Headline', 'Title3')}
            color={pressed ? Colors.black : Colors.blueDark}
            style={margin}
          >
            {props.text}
          </VivText>
          {(props.icon && !props.iconPosition) || props.iconPosition === 'right'
            ? React.cloneElement(props.icon, {
                color: props.icon.props.color,
                name: props.icon.props.name,
                size: resize<number>(24, 20, 34)
              })
            : null}
        </>
      )}
    </Pressable>
  ) : (
    <Pressable
      style={({ pressed }) => [
        { ...props.style, ...styles.buttonSeparated, backgroundColor: pressed ? color.pressed : color.default }
      ]}
      onPress={props.onPress}
    >
      {({ pressed }) => (
        <>
          <View style={[styles.iconSeparatedView, { paddingVertical: props.paddingVertical || 13.5 }]}>
            {props.color === 'Spotify' ? (
              <Image
                style={{
                  height: resize<number>(24, 20, 34),
                  width: resize<number>(24, 20, 34)
                }}
                source={require('~/assets/images/spotify.png')}
              />
            ) : (
              props.icon
            )}
          </View>
          <VivText
            fontName={resize<FontName>('Headline', 'Headline', 'Title3')}
            color={pressed ? Colors.black : Colors.blueDark}
            style={[
              styles.textSeparated,
              {
                paddingVertical: props.paddingVertical || 13.5,
                paddingLeft:
                  props.paddingHorizontal && props.paddingHorizontal.left ? props.paddingHorizontal.left : 12.5,
                paddingRight:
                  props.paddingHorizontal && props.paddingHorizontal.right ? props.paddingHorizontal.right : 12.5
              }
            ]}
          >
            {props.text}
          </VivText>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
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
    borderColor: Colors.blueMediumCardBody,
    paddingHorizontal: 18
  },
  textSeparated: {
    paddingVertical: 13.5,
    paddingLeft: 10,
    paddingRight: 25
  }
});
