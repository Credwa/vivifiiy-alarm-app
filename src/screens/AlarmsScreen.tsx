import Background from '@/components/Background';
import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import VivText from '@/components/VivText';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

export default function AlarmsScreen() {
  const createNewAlarm = () => {};

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
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  header: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  addAlarm: {
    height: 44,
    width: 44,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
