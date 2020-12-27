import React from 'react';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import { View, StyleSheet, Dimensions } from 'react-native';
import { AlarmInterface } from '@/interfaces';
import { smallScreenWidthBreakpoint, largeScreenWidthBreakpoint } from '@/constants/Values';

interface ActiveAlarmsProps {
  nearestAlarm: AlarmInterface;
}
const windowWidth = Dimensions.get('window').width;
export default function ActiveAlarms({ nearestAlarm }: ActiveAlarmsProps) {
  return (
    <View style={styles.container}>
      <VivText
        fontName={
          windowWidth < smallScreenWidthBreakpoint
            ? 'Title6'
            : windowWidth > largeScreenWidthBreakpoint
            ? 'Title2'
            : 'Title4'
        }
        color={Colors.greyLight3}
      >
        Next alarm at...
      </VivText>
      <View style={styles.time}>
        <VivText
          fontName={
            windowWidth < smallScreenWidthBreakpoint
              ? 'Title3'
              : windowWidth > largeScreenWidthBreakpoint
              ? 'TitleBig1'
              : 'Title1'
          }
          color={Colors.greyLight1}
        >
          {nearestAlarm.hour} : {nearestAlarm.minute}{' '}
          <VivText
            fontName={
              windowWidth < smallScreenWidthBreakpoint
                ? 'Title4'
                : windowWidth > largeScreenWidthBreakpoint
                ? 'TitleBig2'
                : 'Title2'
            }
            color={Colors.greyLight1}
          >
            {nearestAlarm.meridiem}
          </VivText>
        </VivText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20
  },
  time: {
    flexDirection: 'row',
    marginTop: 30
  }
});
