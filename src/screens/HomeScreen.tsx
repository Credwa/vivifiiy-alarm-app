import Background from '@/components/Background';
import VivButton from '@/components/VivButton';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeTabScreen() {
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <View style={styles.separator} />
        <VivButton
          color="Primary"
          text="Create alarm"
          iconPosition="right"
          icon={<Ionicons name="md-alarm" size={17} />}
        />
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
});
