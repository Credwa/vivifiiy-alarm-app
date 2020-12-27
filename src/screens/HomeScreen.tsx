import Background from '@/components/Background';
import VivButton from '@/components/VivButton';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import Alarm from '@/components/Alarm';
import { smallScreenWidthBreakpoint, largeScreenWidthBreakpoint } from '@/constants/Values';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '@/store';
import { twelveHrTime } from '@/types';
import { AlarmInterface } from '@/interfaces';
import SongSelector from '@/components/SongSelector';
import ActiveAlarms from '@/components/Alarm/ActiveAlarm';
import { createNewAlarm, findNearestActiveAlarm, getTimeTillAlarm, updateAlarms } from '@/services/alarm.service';

const windowWidth = Dimensions.get('window').width;

export default function HomeTabScreen() {
  const fakeActiveAlarm: any = { active: true, key: '0730AM', hour: '07', minute: '30', meridiem: 'AM' };
  const [time, setTime] = useState<twelveHrTime>(useStore.getState().getCurrentAlarm());
  const [activeAlarms, setActiveAlarms] = useState(useStore.getState().getActiveAlarms());
  const [isEditMode, setEditMode] = useState(false);
  const [timeTillAlarm, setTimeTillAlarm] = useState({ hour: 0, minute: 0 });
  const [hasActiveAlarm, setHasActiveAlarm] = useState(false);
  const [nearestActiveAlarm, setNearestActiveAlarm] = useState(fakeActiveAlarm);
  const setAlarmsState = useStore((state) => state.setAlarms);
  const getActiveAlarmsInit = useStore((state) => state.getActiveAlarms);
  const alarms = useStore((state) => state.alarms);
  const mockSongs = ['Escape from LA - The Weeknd', 'POPSTAR (feat Drake) - DJ Khaled, Dra...', 'No Good - dsvn'];

  const onCreateAlarm = () => {
    createNewAlarm({ ...time, active: true, key: time.hour + time.minute + time.meridiem }, setAlarmsState);
  };

  const onCancelAlarm = () => {
    const lastAlarmState = alarms;
    alarms[nearestActiveAlarm.key].active = false;
    setAlarmsState(alarms);
    updateAlarms(alarms).catch((e) => {
      // if saving to storage fails don't update
      setAlarmsState(lastAlarmState);
      // error handler goes here when built
      console.log(e);
    });
  };

  const onEditAlarm = () => {
    setEditMode(true);
  };

  const onUpdateAlarm = () => {
    let tempAlarms = alarms;
    delete tempAlarms[nearestActiveAlarm.key];
    const updatedAlarm: AlarmInterface = { ...time, active: true, key: time.hour + time.minute + time.meridiem };
    tempAlarms = { ...tempAlarms, [updatedAlarm.key]: updatedAlarm };
    setAlarmsState(tempAlarms);
    setEditMode(false);
    setTimeTillAlarm(getTimeTillAlarm(updatedAlarm));
    updateAlarms(tempAlarms).catch((e) => {
      // if saving to storage fails don't update
      setAlarmsState(alarms);
      // error handler goes here when built
      console.log(e);
    });
  };

  const onCancelEditAlarm = () => {
    setTimeTillAlarm(getTimeTillAlarm(nearestActiveAlarm));
    setEditMode(false);
  };

  // Listen to time changes
  useEffect(() => {
    useStore.subscribe(
      (timeUpdate: twelveHrTime) => {
        setTime(timeUpdate);
        setTimeTillAlarm(getTimeTillAlarm(hasActiveAlarm ? nearestActiveAlarm : timeUpdate));
      },
      (state) => state.getCurrentAlarm()
    );
  }, []);

  // Listen to new alarms
  useEffect(() => {
    useStore.subscribe(
      (activeAlarms: Map<string, AlarmInterface>) => {
        setActiveAlarms(activeAlarms);
        if (activeAlarms.size > 0) {
          const nearestAlarm = findNearestActiveAlarm(activeAlarms);
          setTimeTillAlarm(getTimeTillAlarm(nearestAlarm as AlarmInterface));
          setHasActiveAlarm(true);
        } else {
          setHasActiveAlarm(false);
        }
      },
      (state) => state.getActiveAlarms()
    );
  }, []);

  // Set nearest alarm
  useEffect(() => {
    if (activeAlarms.size > 0) {
      const nearestAlarm = findNearestActiveAlarm(activeAlarms);
      setNearestActiveAlarm(nearestAlarm);
    }
  }, [activeAlarms]);

  // Test to see if there are any active alarms
  useEffect(() => {
    if (activeAlarms.size > 0) {
      setHasActiveAlarm(true);
    }
  }, []);

  // Calculate time left till next alarm goes off every 60s
  useEffect(() => {
    const activeAlarmsInit = getActiveAlarmsInit();
    let nearestActiveAlarmInit =
      activeAlarmsInit.size > 0 ? findNearestActiveAlarm(activeAlarmsInit) : nearestActiveAlarm;

    setTimeTillAlarm(getTimeTillAlarm(nearestActiveAlarmInit || time));
    setInterval(() => {
      setTimeTillAlarm(getTimeTillAlarm(nearestActiveAlarmInit || time));
    }, 60000);
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.timeLeft}>
          <VivText
            fontName={
              windowWidth < smallScreenWidthBreakpoint
                ? 'Subhead'
                : windowWidth > largeScreenWidthBreakpoint
                ? 'Title3'
                : 'Body'
            }
            color={Colors.greyLight2}
          >
            Time left ~
          </VivText>
          <VivText
            fontName={
              windowWidth < smallScreenWidthBreakpoint
                ? 'Subhead'
                : windowWidth > largeScreenWidthBreakpoint
                ? 'Title3'
                : 'Body'
            }
            color={Colors.blueLight}
          >
            {' ' + timeTillAlarm.hour} hrs{' '}
            {timeTillAlarm.minute < 59 ? timeTillAlarm.minute + 1 : timeTillAlarm.minute} mins
          </VivText>
        </View>
        <View style={styles.separator} />

        {hasActiveAlarm && !isEditMode ? (
          <ActiveAlarms nearestAlarm={nearestActiveAlarm} />
        ) : (
          <Alarm style={{ paddingVertical: 30 }} nearestActiveAlarm={nearestActiveAlarm} />
        )}
        <View style={styles.separator} />
        {hasActiveAlarm ? (
          <View style={styles.hasAlarmButtons}>
            <VivButton
              color="Primary"
              text={isEditMode ? 'Update alarm' : 'Edit alarm'}
              onPress={isEditMode ? onUpdateAlarm : onEditAlarm}
              style={{ marginRight: 25 }}
              paddingHorizontal={{ left: 23, right: 23 }}
            />
            <VivButton
              color="Secondary"
              text={isEditMode ? 'Cancel edit' : 'Cancel'}
              onPress={isEditMode ? onCancelEditAlarm : onCancelAlarm}
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
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <SongSelector data={mockSongs} />
        </View>
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
    marginVertical: windowWidth < smallScreenWidthBreakpoint ? 15 : windowWidth > largeScreenWidthBreakpoint ? 50 : 30,
    height: 0.3,
    width: '80%'
  }
});
