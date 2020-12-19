import React from 'react';
import { View, StyleSheet } from 'react-native';
import HourView from './HourView';
import MinuteView from './MinuteView';
import MeridiemView from './MeridiemView';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import { generateTimerArray } from '@/utils';
import { AlarmInterface } from '@/interfaces';

interface AlarmProps {
  nearestActiveAlarm: AlarmInterface;
  style?: any;
}

export default function Alarm({ nearestActiveAlarm, style }: AlarmProps) {
  generateTimerArray(12, false);
  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={styles.timeView}>
        <HourView data={generateTimerArray(12, false, 2)} initValue={nearestActiveAlarm.hour} />
      </View>
      <View>
        <VivText fontName="Title2" color={Colors.white}>
          :
        </VivText>
      </View>
      <View style={styles.timeView}>
        <MinuteView data={generateTimerArray(59, true, 2)} initValue={nearestActiveAlarm.minute} />
      </View>

      <MeridiemView data={['AM', 'PM']} initValue={nearestActiveAlarm.meridiem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center'
  },
  timeView: {
    marginHorizontal: 15
  }
});
