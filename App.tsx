import Navigation from '@/components/navigation';
import useCachedResources from '@/hooks/useCachedResources';
import useLoadAlarms from '@/hooks/useLoadAlarms';
import useLoadSettings from '@/hooks/useLoadSettings';
import { Nunito_400Regular, Nunito_600SemiBold, useFonts as useFontsNunito } from '@expo-google-fonts/nunito';
import { Roboto_400Regular, Roboto_500Medium, useFonts as useFontsRoboto } from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useLoadCredentials from '@/hooks/useLoadCredentials';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const isAlarmsLoaded = useLoadAlarms();
  const isCredentialsLoaded = useLoadCredentials();
  const isSettingsLoaded = useLoadSettings();
  const [robotoLoaded, robotoError] = useFontsRoboto({ Roboto_400Regular, Roboto_500Medium });
  const [nunitoLoaded, nunitoError] = useFontsNunito({ Nunito_400Regular, Nunito_600SemiBold });

  if (robotoError) throw robotoError;
  if (nunitoError) throw nunitoError;

  useEffect(() => {
    try {
      SplashScreen.preventAutoHideAsync().catch(console.warn);
    } catch (e) {
      console.warn('hide async error');
    } finally {
      if (
        isLoadingComplete &&
        isAlarmsLoaded &&
        isSettingsLoaded &&
        isCredentialsLoaded &&
        robotoLoaded &&
        nunitoLoaded
      ) {
        SplashScreen.hideAsync().catch(console.warn);
      }
    }
  }, [isLoadingComplete, isAlarmsLoaded, isSettingsLoaded, robotoLoaded, nunitoLoaded]);

  if (
    !isLoadingComplete ||
    !robotoLoaded ||
    !nunitoLoaded ||
    !isAlarmsLoaded ||
    !isSettingsLoaded ||
    !isCredentialsLoaded
  ) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider style={styles.container}>
          <Navigation />
          <StatusBar style="light" />
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
