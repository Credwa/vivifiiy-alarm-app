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
import { getTimeTillAlarm } from '@/utils';
import { AlarmInterface } from '@/interfaces';
import { clearAlarms, createNewAlarm } from '@/services/alarm.service';

export default function HomeTabScreen() {
  const [time, setTime] = useState<twelveHrTime>(useStore.getState().getCurrentAlarm());
  const [timeTillAlarm, setTimeTillAlarm] = useState({ hour: 0, minute: 0 });
  const [hasActiveAlarm, setHasActiveAlarm] = useState(false);
  const setAlarmsState = useStore((state) => state.setAlarms);

  const onCreateAlarm = () => {
    createNewAlarm({ ...time, active: true, key: time.hour + time.minute + time.meridiem }, setAlarmsState);
  };

  const onClearAlarms = () => {
    clearAlarms();
  };

  const onCancelAlarm = () => {
    console.log('cancel alarm');
  };

  const onEditAlarm = () => {
    console.log('edit alarm');
  };

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
    useStore.subscribe(
      (activeAlarms: Map<string, AlarmInterface>) => {
        console.log(activeAlarms);
        if (activeAlarms.size > 0) {
          setHasActiveAlarm(true);
        } else {
          setHasActiveAlarm(false);
        }
      },
      (state) => state.getActiveAlarms()
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
        {hasActiveAlarm ? (
          <View style={styles.hasAlarmButtons}>
            <VivButton
              color="Primary"
              text="Edit alarm"
              onPress={onEditAlarm}
              style={{ marginRight: 25 }}
              paddingHorizontal={{ left: 23, right: 23 }}
            />
            <VivButton
              color="Secondary"
              text="Cancel"
              onPress={onCancelAlarm}
              paddingHorizontal={{ left: 35, right: 35 }}
            />
          </View>
        ) : (
          <VivButton
            color="Primary"
            text="Create alarm"
            onPress={onCreateAlarm}
            iconPosition="right"
            icon={<Ionicons name="md-alarm" size={22} />}
            paddingHorizontal={{ left: 65, right: 65 }}
          />
        )}
        <View style={styles.separator} />
        <VivButton
          color="Secondary"
          text="Clear alarms"
          onPress={onClearAlarms}
          iconPosition="right"
          paddingHorizontal={{ left: 65, right: 65 }}
        />
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
  hasAlarmButtons: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignContent: 'space-around'
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
