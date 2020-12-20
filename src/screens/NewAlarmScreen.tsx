import Background from '@/components/Background';
import VivButton from '@/components/VivButton';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import Alarm from '@/components/Alarm';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '@/store';
import { AlarmsTabParamList, twelveHrTime } from '@/types';
import { AlarmInterface } from '@/interfaces';
import { createNewAlarm, getTimeTillAlarm, updateAlarms } from '@/services/alarm.service';
import { StackScreenProps } from '@react-navigation/stack';

export default function NewAlarmScreen({ navigation }: StackScreenProps<AlarmsTabParamList, 'NewAlarmScreen'>) {
  const alarmInitValue: AlarmInterface = { active: true, key: '0730AM', hour: '07', minute: '30', meridiem: 'AM' };
  const [time, setTime] = useState<twelveHrTime>(useStore.getState().getCurrentAlarm());
  const [timeTillAlarm, setTimeTillAlarm] = useState({ hour: 0, minute: 0 });
  const setAlarmsState = useStore((state) => state.setAlarms);

  const onCreateAlarm = () => {
    createNewAlarm({ ...time, active: true, key: time.hour + time.minute + time.meridiem }, setAlarmsState);
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
    setTimeTillAlarm(getTimeTillAlarm(time));
    setInterval(() => {
      setTimeTillAlarm(getTimeTillAlarm(time));
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
              Create alarm
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
            text="Create alarm"
            onPress={onCreateAlarm}
            iconPosition="right"
            icon={<Ionicons name="md-alarm" size={22} />}
            paddingHorizontal={{ left: 65, right: 65 }}
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
    alignContent: 'flex-start',
    alignItems: 'flex-start',
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
