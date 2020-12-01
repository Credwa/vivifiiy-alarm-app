import Background from '@/components/Background';
import VivButton from '@/components/VivButton';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import Alarm from '@/components/Alarm';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '@/store';
import { useEffect, useState } from 'react';
import { twelveHrTime } from '@/types';
import { convertTo24Hour, getTimeTillAlarm } from '@/utils';

export default function HomeTabScreen() {
  const [time, setTime] = useState<twelveHrTime>(useStore.getState().getCurrentAlarm());
  const [timeTillAlarm, setTimeTillAlarm] = useState({ hour: 0, minute: 0 });

  useEffect(() => {
    useStore.subscribe(
      (timeUpdate: twelveHrTime) => {
        setTime(timeUpdate);
        setTimeTillAlarm(getTimeTillAlarm(timeUpdate));
      },
      (state) => state.getCurrentAlarm()
    );
  }, []);

  useEffect(() => {
    setTimeTillAlarm(getTimeTillAlarm(time));
    setInterval(() => {
      setTimeTillAlarm(getTimeTillAlarm(time));
    }, 60000);
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.timeLeft}>
          <VivText fontName="Body" color={Colors.greyLight2}>
            Time left ~
          </VivText>
          <VivText fontName="Body" color={Colors.blueLight}>
            {' ' + timeTillAlarm.hour} hrs{' '}
            {timeTillAlarm.minute < 59 ? timeTillAlarm.minute + 1 : timeTillAlarm.minute} mins
          </VivText>
        </View>
        <View style={styles.separator} />
        <Alarm />
        <View style={styles.separator} />
        <VivButton
          color="Primary"
          text="Create alarm"
          icon={<Ionicons name="md-alarm" size={22} />}
          paddingHorizontal={{ left: 65, right: 65 }}
        />
        <View style={styles.separator} />
        {/* <VivButton
          color="Default"
          text="Sign in with Apple"
          separator
          paddingHorizontal={{ left: 15, right: 50 }}
          icon={<Ionicons name="logo-apple" size={22} />}
        /> */}
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  timeLeft: {
    flexDirection: 'row'
  },
  separator: {
    marginVertical: 30,
    height: 0.3,
    width: '80%'
  }
});
