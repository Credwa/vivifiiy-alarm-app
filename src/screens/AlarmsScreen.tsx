import Background from '@/components/Background';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import VivText from '@/components/VivText';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import useStore from '@/store';
import AlarmsList from '@/components/Alarm/AlarmsList';
import { AlarmInterface } from '@/interfaces';
import { StackScreenProps } from '@react-navigation/stack';
import { AlarmsTabParamList } from '@/types';

export default function AlarmsScreen({ navigation }: StackScreenProps<AlarmsTabParamList, 'AlarmsTabScreen'>) {
  const [getAllAlarms, setAllAlarms] = useState(useStore.getState().getAllAlarms());
  const createNewAlarm = () => {
    navigation.navigate('NewAlarmScreen');
  };

  // List to new alarms
  useEffect(() => {
    useStore.subscribe(
      (allAlarms: Map<string, AlarmInterface>) => {
        setAllAlarms(allAlarms);
      },
      (state) => state.getAllAlarms()
    );
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VivText fontName="Title4" color={Colors.greyLight1}>
            Alarms
          </VivText>
          <Pressable onPress={createNewAlarm} style={styles.addAlarm}>
            {({ pressed }) => (
              <AntDesign name="plus" size={28} color={pressed ? Colors.greyLight3 : Colors.greyLight1} />
            )}
          </Pressable>
        </View>
        <AlarmsList alarms={getAllAlarms} />
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    height: 44,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  addAlarm: {
    height: 44,
    width: 44,
    marginRight: -13,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
