import Navigation from '@/components/navigation';
import useCachedResources from '@/hooks/useCachedResources';
import { Nunito_400Regular, Nunito_600SemiBold, useFonts as useFontsNunito } from '@expo-google-fonts/nunito';
import { Roboto_400Regular, Roboto_500Medium, useFonts as useFontsRoboto } from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [robotoLoaded, robotoError] = useFontsRoboto({ Roboto_400Regular, Roboto_500Medium });
  const [nunitoLoaded, nunitoError] = useFontsNunito({ Nunito_400Regular, Nunito_600SemiBold });

  if (!isLoadingComplete || !robotoLoaded || !nunitoLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider style={styles.container}>
        <Navigation />
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
