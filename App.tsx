import Navigation from '@/components/navigation';
import useCachedResources from '@/hooks/useCachedResources';
import useLoadAlarms from '@/hooks/useLoadAlarms';
import { Nunito_400Regular, Nunito_600SemiBold, useFonts as useFontsNunito } from '@expo-google-fonts/nunito';
import { Roboto_400Regular, Roboto_500Medium, useFonts as useFontsRoboto } from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const isAlarmsLoaded = useLoadAlarms();
  const [robotoLoaded, robotoError] = useFontsRoboto({ Roboto_400Regular, Roboto_500Medium });
  const [nunitoLoaded, nunitoError] = useFontsNunito({ Nunito_400Regular, Nunito_600SemiBold });

  if (robotoError) throw robotoError;
  if (nunitoError) throw nunitoError;

  useEffect(() => {
    try {
      SplashScreen.preventAutoHideAsync();
    } finally {
      if (isLoadingComplete && isAlarmsLoaded && robotoLoaded && nunitoLoaded) {
        SplashScreen.hideAsync();
      }
    }
  }, [isLoadingComplete, isAlarmsLoaded, robotoLoaded, nunitoLoaded]);

  if (!isLoadingComplete || !robotoLoaded || !nunitoLoaded || !isAlarmsLoaded) {
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
