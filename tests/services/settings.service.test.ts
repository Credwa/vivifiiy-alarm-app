import * as settingService from '@/services/settings.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MockStorage from '~/tests/mockStorage';
import { storageKeys } from '@/constants/Values';
import { SettingsInterface } from '@/interfaces';

const mockStorageCache = {};
const mockAsyncStorage = new MockStorage(mockStorageCache);
const settingsDataMock: SettingsInterface = {
  snoozeDuration: 10,
  snooze: true,
  maxVolume: 1,
  volumeStyle: 'Progressive'
};

describe('setting.service tests', () => {
  beforeEach(() => {
    jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
  });

  describe('alarm.service getSettings', () => {
    it('should call AsyncStorage.getItem with key: @vivifiiy-alarm-app/setting', async () => {
      await settingService.getSettings();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(storageKeys.settings);
    });

    it('should get all alarms saved', async () => {
      AsyncStorage.setItem(storageKeys.settings, JSON.stringify(settingsDataMock));
      await settingService.getSettings().then((data) => {
        expect(data).toEqual(settingsDataMock);
      });
    });
  });

  describe('alarm.service updateSettings', () => {
    it('should get all settings saved', async () => {
      const settingsDataMockTwo: SettingsInterface = {
        snoozeDuration: 45,
        snooze: false,
        maxVolume: 0.5355,
        volumeStyle: 'Adaptive'
      };

      const settingDataMockTwoMap = new Map();
      for (const setting in settingsDataMockTwo) {
        settingDataMockTwoMap.set(setting, settingsDataMockTwo[setting]);
      }
      await AsyncStorage.setItem(storageKeys.settings, JSON.stringify(settingsDataMock)).then(async () => {
        await settingService.updateSettings(settingDataMockTwoMap);
      });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(storageKeys.settings, JSON.stringify(settingsDataMockTwo));
    });
  });
});
