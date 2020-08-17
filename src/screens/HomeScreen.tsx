import Background from '@/components/Background';
import VivButton from '@/components/VivButton';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import VivText from '@/components/VivText';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

export default function HomeTabScreen() {
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.timeLeft}>
          <VivText fontName="Body" color={Colors.greyLight2}>
            Time left ~
          </VivText>
          <VivText fontName="Body" color={Colors.blueLight}>
            {' '}
            8 hrs 23 mins
          </VivText>
        </View>
        <View style={styles.separator} />
        <VivButton color="Primary" text="Create alarm" icon={<Ionicons name="md-alarm" size={22} />} />
        <View style={styles.separator} />
        <VivButton
          color="Default"
          text="Sign in with Apple"
          separator
          paddingHorizontal={{ left: 15, right: 50 }}
          icon={<Ionicons name="logo-apple" size={22} />}
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
  timeLeft: {
    flexDirection: 'row'
  },
  separator: {
    marginVertical: 30,
    height: 0.3,
    width: '80%'
  }
});
