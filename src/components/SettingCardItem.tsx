import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, View, Dimensions } from 'react-native';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { resize } from '@/utils';

interface SettingCardItemProps {
  style?: any;
  icon?: any;
  rightIcon?: any;
  title?: string;
  slider?: boolean;
  horizontalRule?: boolean;
  extraInfo?: string;
  switchValue?: boolean;
  sliderValue?: number;
  buttonsValue?: number;
  onButtonsValueChange?: (value: number) => void;
  onSwitchValueChange?: () => void;
  onSliderValueChange?: (value: number) => void;
  onCardItemPress?: () => void;
  itemRight?: 'switch' | 'icon' | 'buttons' | 'default';
}

export default function SettingCardItem({
  style,
  icon,
  horizontalRule,
  title,
  itemRight,
  rightIcon,
  slider,
  extraInfo,
  switchValue,
  sliderValue,
  buttonsValue,
  onButtonsValueChange,
  onSwitchValueChange,
  onSliderValueChange,
  onCardItemPress
}: SettingCardItemProps) {
  const [snoozeNumber, setSnoozeNumber] = useState(buttonsValue as number | 10);
  let itemRightComponent: React.ReactNode;

  const addTime = () => {
    if (snoozeNumber < 60 && onButtonsValueChange) {
      setSnoozeNumber(snoozeNumber + 1);
      onButtonsValueChange(snoozeNumber + 1);
    }
  };

  const subtractTime = () => {
    if (snoozeNumber > 1 && onButtonsValueChange) {
      setSnoozeNumber(snoozeNumber - 1);
      onButtonsValueChange(snoozeNumber + 1);
    }
  };

  switch (itemRight) {
    case 'switch':
      itemRightComponent = (
        <Switch
          style={styles.switch}
          trackColor={{ false: Colors.orangeMedium, true: Colors.orangeMedium }}
          thumbColor={Colors.greyLight1}
          ios_backgroundColor={Colors.greyLight2}
          value={switchValue}
          onValueChange={onSwitchValueChange}
        />
      );
      break;
    case 'icon':
      itemRightComponent = rightIcon;
      break;
    case 'buttons':
      itemRightComponent = (
        <View style={styles.rightControls}>
          <LinearGradient colors={Colors.blueGradient} style={{ borderRadius: 15 }} locations={[0.9, 0.1]}>
            <Pressable onPress={subtractTime} style={styles.rightButtons}>
              {({ pressed }) => (
                <AntDesign name="minus" size={24} color={pressed ? Colors.greyLight3 : Colors.greyLight1} />
              )}
            </Pressable>
          </LinearGradient>

          <VivText
            style={{ alignSelf: 'center', marginHorizontal: 5 }}
            fontName={resize('Body', 'Footnote', 'Title6')}
            color={Colors.greyLight1}
          >
            {snoozeNumber} {snoozeNumber !== 1 ? 'mins' : 'min'}
          </VivText>

          <LinearGradient colors={Colors.blueGradient} style={{ borderRadius: 15 }} locations={[0.9, 0.1]}>
            <Pressable onPress={addTime} style={styles.rightButtons}>
              {({ pressed }) => (
                <AntDesign name="plus" size={24} color={pressed ? Colors.greyLight3 : Colors.greyLight1} />
              )}
            </Pressable>
          </LinearGradient>
        </View>
      );
      break;
    default:
      itemRightComponent = (
        <SimpleLineIcons style={{ marginLeft: 5 }} name="arrow-right" size={12} color={Colors.greyLight2} />
      );
  }
  return (
    <Pressable style={{ ...styles.itemContainer, ...style }} onPress={onCardItemPress}>
      {({ pressed }) => (
        <>
          <View style={styles.item}>
            <View style={styles.row}>
              <View style={{ ...styles.icon }}>
                {icon
                  ? React.cloneElement(icon, {
                      color: pressed && !slider ? Colors.greyBodyText : Colors.greyLight2,
                      name: icon.props.name,
                      size: 24
                    })
                  : null}
              </View>
              <VivText
                fontName={resize('Body', 'Subhead', 'Title4')}
                color={pressed ? Colors.greyLight2 : Colors.greyLight1}
              >
                {title}
              </VivText>
              {slider ? (
                <Slider
                  style={{ width: resize(wp('60%'), wp('60%'), wp('85%')) }}
                  minimumValue={0}
                  maximumValue={1}
                  value={sliderValue}
                  onValueChange={onSliderValueChange}
                  minimumTrackTintColor={Colors.blueLight}
                  maximumTrackTintColor={Colors.greyBodyText}
                />
              ) : null}
            </View>

            <View style={styles.row}>
              {extraInfo ? (
                <VivText fontName={resize('Caption', 'Caption', 'Body')} color={Colors.greyLight2}>
                  {extraInfo}
                </VivText>
              ) : null}
              {itemRightComponent}
            </View>
          </View>
          {horizontalRule ? <View style={styles.hairline} /> : null}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column'
  },
  icon: {
    marginRight: 17
  },
  switch: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }]
  },
  rightControls: {
    flexDirection: 'row'
  },
  rightButtons: {
    padding: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 17
  },
  hairline: {
    borderBottomColor: Colors.greyLight3,
    borderWidth: 0.5
  }
});
