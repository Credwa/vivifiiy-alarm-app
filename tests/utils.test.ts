import * as utils from '@/utils';

describe('utils tests', () => {
  describe('utils convertTo24Hour', () => {
    it('should convert a AM time to proper 24hour equivalent', () => {
      let newTimeOne = utils.convertTo24Hour({ hour: '12', minute: '00', meridiem: 'AM' });
      let newTimeTwo = utils.convertTo24Hour({ hour: '11', minute: '00', meridiem: 'AM' });
      expect(newTimeOne).toEqual({ hour: '00', minute: '00', meridiem: 'AM' });
      expect(newTimeTwo).toEqual({ hour: '11', minute: '00', meridiem: 'AM' });
    });

    it('should convert a PM time to proper 24hour equivalent', () => {
      let newTimeOne = utils.convertTo24Hour({ hour: '12', minute: '00', meridiem: 'PM' });
      let newTimeTwo = utils.convertTo24Hour({ hour: '11', minute: '59', meridiem: 'PM' });
      let newTimeThree = utils.convertTo24Hour({ hour: '01', minute: '00', meridiem: 'PM' });
      expect(newTimeOne).toEqual({ hour: '12', minute: '00', meridiem: 'PM' });
      expect(newTimeTwo).toEqual({ hour: '23', minute: '59', meridiem: 'PM' });
      expect(newTimeThree).toEqual({ hour: '13', minute: '00', meridiem: 'PM' });
    });
  });

  describe('utils generateTimerArray', () => {
    it('should return a string array with the correct values', () => {
      const arr = utils.generateTimerArray(12, false);
      expect(arr[0]).toBe('01');
      expect(arr.length).toBe(12);
      expect(arr[arr.length - 1]).toBe('12');
      expect(arr[5]).toBe('06');
      expect(arr[9]).toBe('10');

      const arr2 = utils.generateTimerArray(12, true);
      expect(arr2[0]).toBe('00');
      expect(arr2[arr2.length - 1]).toBe('12');

      const arr3 = utils.generateTimerArray(12, false, 3);
      expect(arr3.length).toBe(12 * 4);
    });
  });

  describe('utils findSelectedAlarmViewIndex', () => {
    it('should return the value of the matching index from the array', () => {
      const arr = utils.generateTimerArray(12, false, 3);
      const value = utils.findSelectedAlarmViewIndex(arr, '08', 11);
      expect(arr[value]).toBe('08');
    });
  });
});
