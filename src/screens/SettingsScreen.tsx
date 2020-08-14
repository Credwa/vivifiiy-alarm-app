import Background from '@/components/Background';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsTabScreen() {
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <View style={styles.separator} />
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
