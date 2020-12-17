import * as alarmService from '@/services/alarm.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MockStorage from '~/tests/mockStorage';
import { storageKeys } from '@/constants/Values';
import { AlarmInterface } from '@/interfaces';
import * as utils from '@/utils';
import { twelveHrTime } from '@/types';

const mockStorageCache = {};
const mockAsyncStorage = new MockStorage(mockStorageCache);
const timeMock: AlarmInterface = { active: true, key: '1130PM', hour: '11', minute: '30', meridiem: 'PM' };
const alarmsDataMock = { '1130PM': { active: true, key: '1130PM', hour: '11', minute: '30', meridiem: 'PM' } };

describe('alarm.service tests', () => {
  beforeEach(() => {
    jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
  });

  describe('alarm.service getAlarms', () => {
    it('should call AsyncStorage.getItem with key: @vivifiiy-alarm-app/alarms', async () => {
      await alarmService.getAlarms();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(storageKeys.alarms);
    });

    it('should get all alarms saved', async () => {
      AsyncStorage.setItem(storageKeys.alarms, JSON.stringify(alarmsDataMock));
      await alarmService.getAlarms().then((data) => {
        expect(data).toEqual(alarmsDataMock);
      });
    });
  });

  describe('alarm.service createNewAlarm', () => {
    it('should call alarmService.getAlarms', async () => {
      const getAlarmsSpy = jest.spyOn(alarmService, 'getAlarms');
      alarmService
        .createNewAlarm(
          { active: true, key: '1130PM', hour: '11', minute: '30', meridiem: 'PM' },
          (setAlarmsState) => {}
        )
        .then(() => {
          expect(getAlarmsSpy).toHaveBeenCalled();
        });
    });

    it('should AsyncStorage.setItem with the right jsonValue when storage is empty', async () => {
      const setAlarmsStateMock = jest.fn((newAlarms) => {
        return newAlarms;
      });
      await alarmService.createNewAlarm(timeMock, setAlarmsStateMock);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(storageKeys.alarms, JSON.stringify(alarmsDataMock));
    });

    it('should AsyncStorage.setItem with the right jsonValue when storage already has a value', async () => {
      const setAlarmsStateMock = jest.fn((newAlarms) => {
        return newAlarms;
      });
      const secondTimeMock: AlarmInterface = { active: true, key: '0142AM', hour: '01', minute: '42', meridiem: 'AM' };

      await AsyncStorage.setItem(storageKeys.alarms, JSON.stringify(alarmsDataMock)).then(async () => {
        await alarmService.createNewAlarm(secondTimeMock, setAlarmsStateMock);
      });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        storageKeys.alarms,
        JSON.stringify({ ...alarmsDataMock, [secondTimeMock.key]: secondTimeMock })
      );
    });
  });

  describe('alarm.service updateAlarms', () => {
    it('should AsyncStorage.setItem', async () => {
      await alarmService.updateAlarms(alarmsDataMock);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(storageKeys.alarms, JSON.stringify(alarmsDataMock));
    });

    it('should overwrite/update alarms with passed parameter', async () => {
      const updatedAlarm = { '1100AM': { active: true, key: '1100AM', hour: '11', minute: '00', meridiem: 'AM' } };
      AsyncStorage.setItem(storageKeys.alarms, JSON.stringify(alarmsDataMock));
      alarmService.updateAlarms({
        '1100AM': { active: true, key: '1100AM', hour: '11', minute: '00', meridiem: 'AM' }
      });
      let updated = await AsyncStorage.getItem(storageKeys.alarms);
      expect(updated).toEqual(JSON.stringify(updatedAlarm));
    });
  });

  describe('alarm.service getTimeTillAlarm', () => {
    it('should return the hours and minutes till an alarm', () => {
      const timeNow = new Date();
      const timeTill = alarmService.getTimeTillAlarm({
        hour: (timeNow.getHours() + 2).toString(),
        minute: (timeNow.getMinutes() + 2).toString(),
        meridiem: timeNow.getHours() > 12 ? 'PM' : 'AM'
      });
      expect(timeTill.hour.toString()).toMatch(/2|14/);
      expect(timeTill.minute).toEqual(1);
    });

    it('should call utils.convertTo24Hour', () => {
      const convertTo24HourSpy = jest.spyOn(utils, 'convertTo24Hour');
      const timeNow = new Date();
      const mockTwelveHrTime: twelveHrTime = {
        hour: timeNow.getHours().toString(),
        minute: timeNow.getMinutes().toString(),
        meridiem: timeNow.getHours() > 12 ? 'PM' : 'AM'
      };
      alarmService.getTimeTillAlarm(mockTwelveHrTime);

      expect(convertTo24HourSpy).toHaveBeenCalledWith(mockTwelveHrTime);
    });
  });

  describe('alarms.service findNearestActiveAlarm', () => {
    const activeAlarmsMap: Map<string, AlarmInterface> = new Map();
    const timeNow = new Date();
    const mockAlarmOne: AlarmInterface = {
      active: true,
      key: `${(timeNow.getHours() + 2).toString()}${(timeNow.getMinutes() + 2).toString()}${
        timeNow.getHours() > 12 ? 'PM' : 'AM'
      }`,
      hour: (timeNow.getHours() + 2).toString(),
      minute: (timeNow.getMinutes() + 2).toString(),
      meridiem: timeNow.getHours() > 12 ? 'PM' : 'AM'
    };
    const mockAlarmTwo: AlarmInterface = {
      active: true,
      key: `${(timeNow.getHours() + 5).toString()}${(timeNow.getMinutes() + 8).toString()}${
        timeNow.getHours() > 12 ? 'PM' : 'AM'
      }`,
      hour: (timeNow.getHours() + 5).toString(),
      minute: (timeNow.getMinutes() + 8).toString(),
      meridiem: timeNow.getHours() > 12 ? 'PM' : 'AM'
    };
    activeAlarmsMap.set(mockAlarmOne.key, mockAlarmOne);
    activeAlarmsMap.set(mockAlarmTwo.key, mockAlarmTwo);

    it('should return the nearest alarm', () => {
      const nearestAlarm = alarmService.findNearestActiveAlarm(activeAlarmsMap);
      expect(nearestAlarm).toEqual(mockAlarmOne);
    });
  });
});
