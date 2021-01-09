import React from 'react';
import VivText, { FontName } from '@/components/VivText';
import Colors from '@/constants/Colors';
import { View, StyleSheet } from 'react-native';
import { AlarmInterface } from '@/interfaces';
import { resize } from '@/utils';

interface ActiveAlarmsProps {
  nearestAlarm: AlarmInterface;
}

export default function ActiveAlarms({ nearestAlarm }: ActiveAlarmsProps) {
  return (
    <View style={styles.container}>
      <VivText fontName={resize<FontName>('Title4', 'Title6', 'Title2')} color={Colors.greyLight3}>
        Next alarm at...
      </VivText>
      <View style={styles.time}>
        <VivText fontName={resize<FontName>('Title1', 'Title3', 'TitleBig1')} color={Colors.greyLight1}>
          {nearestAlarm.hour} : {nearestAlarm.minute}{' '}
          <VivText fontName={resize<FontName>('Title2', 'Title4', 'TitleBig2')} color={Colors.greyLight1}>
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
