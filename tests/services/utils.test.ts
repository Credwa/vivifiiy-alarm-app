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
});
