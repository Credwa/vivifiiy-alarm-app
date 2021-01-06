import { AlarmInterface, SettingsInterface } from './interfaces';

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
  NewAlarmScreen: undefined;
  EditAlarmScreen: { alarm: AlarmInterface };
};

export type InsightsTabParamList = {
  InsightsTabScreen: undefined;
};

export type SettingsTabParamList = {
  SettingsTabScreen: undefined;
  VolumeStyleScreen: undefined;
  DataScreen: undefined;
  HelpScreen: undefined;
  LinkedMusicAccountsScreen: undefined;
  ReportBugScreen: undefined;
  AccountDetailsScreen: undefined;
};

export type meridiem = 'AM' | 'PM';

export type twelveHrTime = { hour: string; minute: string; meridiem: meridiem };

export type alarmObject = { [x: string]: AlarmInterface };

export type settingObject = { [x: string]: SettingsInterface };

export type Credentials = {
  token: string;
  refreshToken: string;
  expiresIn: number;
  lastRefreshed: string; // date obj as string for serialization
};
