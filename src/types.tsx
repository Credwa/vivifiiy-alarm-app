import { AlarmInterface } from './interfaces';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Alarms: undefined;
  Insights: undefined;
  Settings: undefined;
};

export type HomeTabParamList = {
  HomeTabScreen: undefined;
};

export type AlarmsTabParamList = {
  AlarmsTabScreen: undefined;
};

export type InsightsTabParamList = {
  InsightsTabScreen: undefined;
};

export type SettingsTabParamList = {
  SettingsTabScreen: undefined;
};

export type meridiem = 'AM' | 'PM';

export type twelveHrTime = { hour: string; minute: string; meridiem: meridiem };

export type alarmObject = { [x: string]: AlarmInterface };
