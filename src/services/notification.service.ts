import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { AlarmInterface } from '@/interfaces';
import { getTimeTillAlarm } from '@/services/alarm.service';
import { NotificationContentInput, NotificationTriggerInput } from 'expo-notifications';

export async function registerForPushNotificationsAsync() {
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

export async function schedulePushNotification(content: NotificationContentInput, trigger: NotificationTriggerInput) {
  await Notifications.scheduleNotificationAsync({
    content,
    trigger
  });
}

export async function scheduleAlarmNotification(alarm: AlarmInterface) {
  const timeTill = getTimeTillAlarm(alarm);
  const seconds = timeTill.hour * 3600 + timeTill.minute * 60;
  console.log('seconds:', seconds);
  schedulePushNotification({ title: 'Vivifiiy alarm' }, { seconds: seconds === 0 ? 30 : seconds });
}
