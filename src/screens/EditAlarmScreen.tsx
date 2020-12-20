import Background from '@/components/Background';
import VivButton from '@/components/VivButton';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import Alarm from '@/components/Alarm';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '@/store';
import { AlarmsTabParamList, twelveHrTime } from '@/types';
import { AlarmInterface } from '@/interfaces';
import { getTimeTillAlarm, updateAlarms } from '@/services/alarm.service';
import { StackScreenProps } from '@react-navigation/stack';

export default function EditAlarmScreen({
  navigation,
  route
}: StackScreenProps<AlarmsTabParamList, 'EditAlarmScreen'>) {
  const { alarm } = route.params;
  const alarmInitValue: AlarmInterface = alarm;
  const [time, setTime] = useState<twelveHrTime>(useStore.getState().getCurrentAlarm());
  const [timeTillAlarm, setTimeTillAlarm] = useState({ hour: 0, minute: 0 });
  const setAlarmsState = useStore((state) => state.setAlarms);
  const alarms = useStore((state) => state.alarms);
  const onUpdateAlarm = () => {
    let tempAlarms = alarms;
    delete tempAlarms[alarm.key];
    const updatedAlarm: AlarmInterface = {
      ...time,
      active: alarm.active,
      key: time.hour + time.minute + time.meridiem
    };
    tempAlarms = { ...tempAlarms, [updatedAlarm.key]: updatedAlarm };
    setAlarmsState(tempAlarms);
    setTimeTillAlarm(getTimeTillAlarm(updatedAlarm));
    updateAlarms(tempAlarms).catch((e) => {
      // if saving to storage fails don't update
      setAlarmsState(alarms);
      // error handler goes here when built
      console.log(e);
    });
    navigation.goBack();
  };

  const onCancelEditAlarm = () => {
    navigation.goBack();
  };

  // Listen to time changes
  useEffect(() => {
    useStore.subscribe(
      (timeUpdate: twelveHrTime) => {
        setTime(timeUpdate);
        setTimeTillAlarm(getTimeTillAlarm(timeUpdate));
      },
      (state) => state.getCurrentAlarm()
    );
  }, []);

  // Calculate time left till next alarm goes off every 60s
  useEffect(() => {
    setTimeTillAlarm(getTimeTillAlarm(alarm || time));
    setInterval(() => {
      setTimeTillAlarm(getTimeTillAlarm(alarm || time));
    }, 60000);
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Pressable onPress={navigation.goBack} style={styles.backButton}>
              {({ pressed }) => (
                <AntDesign name="arrowleft" size={28} color={pressed ? Colors.greyLight3 : Colors.greyLight1} />
              )}
            </Pressable>
            <VivText fontName="Title6" color={Colors.greyLight1} style={{ marginLeft: -15 }}>
              Editing {alarm.hour}:{alarm.minute} {alarm.meridiem}
            </VivText>
            <Pressable onPress={navigation.goBack} style={{ opacity: 0 }}>
              {({ pressed }) => (
                <AntDesign name="arrowleft" size={28} color={pressed ? Colors.greyLight3 : Colors.greyLight1} />
              )}
            </Pressable>
          </View>
        </View>

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
        <Alarm style={{ paddingVertical: 30 }} nearestActiveAlarm={alarmInitValue} />
        <View style={styles.separator} />
        <View style={styles.hasAlarmButtons}>
          <VivButton
            color="Primary"
            text={'Update alarm'}
            onPress={onUpdateAlarm}
            style={{ marginRight: 25 }}
            paddingHorizontal={{ left: 23, right: 23 }}
          />
          <VivButton
            color="Secondary"
            text={'Cancel edit'}
            onPress={onCancelEditAlarm}
            paddingHorizontal={{ left: 35, right: 35 }}
          />
        </View>
        <View style={styles.separator} />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        ></View>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25
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
  backButton: {
    height: 44,
    width: 44,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    height: 44,
    marginBottom: 50,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'space-around'
  },
  separator: {
    marginVertical: 30,
    height: 0.3,
    width: '80%'
  }
});
