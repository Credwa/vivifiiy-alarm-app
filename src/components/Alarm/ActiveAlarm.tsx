import React from 'react';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import { View, StyleSheet } from 'react-native';
import { AlarmInterface } from '@/interfaces';

interface ActiveAlarmsProps {
  nearestAlarm: AlarmInterface;
}

export default function ActiveAlarms({ nearestAlarm }: ActiveAlarmsProps) {
  return (
    <View style={styles.container}>
      <VivText fontName="Title4" color={Colors.greyLight3}>
        Next alarm at...
      </VivText>
      <View style={styles.time}>
        <VivText fontName="Title1" color={Colors.greyLight1}>
          {nearestAlarm.hour} : {nearestAlarm.minute}{' '}
          <VivText fontName="Title2" color={Colors.greyLight1}>
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
