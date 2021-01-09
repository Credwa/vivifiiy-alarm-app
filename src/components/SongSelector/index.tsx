import React, { useEffect, memo, useRef, useState } from 'react';
import ScrollSelector from '@/components/ScrollSelector';
import Colors from '@/constants/Colors';
import VivText, { FontName } from '@/components/VivText';
import { Dimensions, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { debounce, resize } from '@/utils';
import { useQuery } from 'react-query';
import {
  fetchDevicesAsync,
  fetchTopTracksAsync,
  getAvailableDevice,
  playTrackAsync,
  TopTrack
} from '@/services/spotify.service';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import ItemText from '@/components/ScrollSelector/src/ItemText';
import SelectedItem from '@/components/ScrollSelector/src/SelectedItem';
import useStore from '@/store/settings';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export default memo(function SongSelector() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const spotifySongs = useQuery('topTracks', fetchTopTracksAsync);
  const setSetting = useStore((state) => state.setSetting);
  const spotifyDevices = useQuery('devices', fetchDevicesAsync);
  let spotifyTopSongsData: TopTrack[] = [];
  if (!spotifySongs.isFetching) spotifyTopSongsData = spotifySongs.data;
  useEffect(() => {
    fetchTopTracksAsync().then((songs) => {
      // console.log(songs);
      spotifyTopSongsData = songs;
    });
  }, []);

  useEffect(() => {
    // @ts-ignore
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
    // @ts-ignore
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      // @ts-ignore
      setNotification(notification);
    });
    // @ts-ignore
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      // @ts-ignore
      Notifications.removeNotificationSubscription(notificationListener);
      // @ts-ignore
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' }
      },
      trigger: { seconds: 2 }
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      });
    }

    return token;
  }

  const onSongChange = debounce(async (track: TopTrack) => {
    let device = await getAvailableDevice();
    if (device) {
      setSetting('savedDevice', device);
      playTrackAsync({ uri: track.song.uri, deviceId: device.id as string });
      await schedulePushNotification();
      Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          body: 'Open the notification to read them all',
          sound: 'email-sound.wav' // <- for Android below 8.0
        },
        trigger: {
          seconds: 2,
          channelId: 'new-emails' // <- for Android 8.0+, see definition above
        }
      });
    }
  }, 1000);

  const renderItem = (trackData: TopTrack, index: number, currentSelectedIndex: number) => {
    const isSelected = index === currentSelectedIndex;
    const overrideFontName = resize<FontName[]>(['Title6', 'Body'], ['Subhead', 'Caption'], ['Title1', 'Title2']);
    let setFontName = () => {
      if (overrideFontName && Array.isArray(overrideFontName)) {
        return isSelected ? overrideFontName[0] : overrideFontName[1];
      } else if (overrideFontName && typeof overrideFontName == 'string') {
        return overrideFontName;
      } else {
        return isSelected ? 'Title1' : 'Title2';
      }
    };
    const item = (
      <ItemText fontName={setFontName()} color={isSelected ? Colors.greyLight1 : Colors.greyLight2}>
        {`${trackData.song.name} - ${trackData.artist.name}`}
      </ItemText>
    );

    return (
      <SelectedItem key={index} itemHeight={resize<number>(50, 45, 110) || 60}>
        {item}
      </SelectedItem>
    );
  };

  return (
    <>
      <VivText
        style={{ paddingVertical: 50 }}
        fontName={resize<FontName>('Title5', 'Body', 'Title3')}
        color={Colors.greyLight1}
      >
        Up next...
      </VivText>
      <ScrollSelector
        dataSource={spotifyTopSongsData}
        renderItem={renderItem}
        overrideFontName={resize<FontName[]>(['Headline', 'Footnote'], ['Subhead', 'Caption'], ['Title1', 'Title2'])}
        selectedIndex={1}
        onValueChange={onSongChange}
        wrapperWidth={Dimensions.get('window').width}
        wrapperHeight={wp('30%')}
        itemHeight={resize<number>(50, 45, 110)}
        highlightColor={Colors.white}
        highlightBorderWidth={0.001}
      />
    </>
  );
});
