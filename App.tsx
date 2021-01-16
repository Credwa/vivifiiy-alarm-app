import Navigation from '@/components/navigation';
import useCachedResources from '@/hooks/useCachedResources';
import useLoadAlarms from '@/hooks/useLoadAlarms';
import useLoadSettings from '@/hooks/useLoadSettings';
import { Nunito_400Regular, Nunito_600SemiBold, useFonts as useFontsNunito } from '@expo-google-fonts/nunito';
import { Roboto_400Regular, Roboto_500Medium, useFonts as useFontsRoboto } from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useLoadCredentials from '@/hooks/useLoadCredentials';
import { QueryClient, QueryClientProvider } from 'react-query';
import { registerForPushNotificationsAsync } from '@/services/notification.service';
import { getAvailableDevice, playTrackAsync } from '@/services/spotify.service';
import * as Notifications from 'expo-notifications';
import useStore from '@/store/settings';
const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const getSetting = useStore((state) => state.getSetting);
  const notificationListener = useRef();
  const responseListener = useRef();
  const isAlarmsLoaded = useLoadAlarms();
  const isCredentialsLoaded = useLoadCredentials();
  const isSettingsLoaded = useLoadSettings();
  const [robotoLoaded, robotoError] = useFontsRoboto({ Roboto_400Regular, Roboto_500Medium });
  const [nunitoLoaded, nunitoError] = useFontsNunito({ Nunito_400Regular, Nunito_600SemiBold });

  if (robotoError) throw robotoError;
  if (nunitoError) throw nunitoError;

  useEffect(() => {
    // @ts-ignore
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    // @ts-ignore
    notificationListener.current = Notifications.addNotificationReceivedListener(async (notification) => {
      // @ts-ignore
      const track = getSetting('track');
      let device = getSetting('deviceSaved') ?? (await getAvailableDevice());
      playTrackAsync({ uri: track.song.uri, deviceId: device.id as string });
    });
    // @ts-ignore
    // responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
    //   // console.log(response);
    // });

    return () => {
      // @ts-ignore
      Notifications.removeNotificationSubscription(notificationListener);
      // @ts-ignore
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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
