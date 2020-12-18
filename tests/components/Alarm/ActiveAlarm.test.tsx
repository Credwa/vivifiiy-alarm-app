import React from 'react';
import renderer from 'react-test-renderer';
import ActiveAlarms from '@/components/Alarm/ActiveAlarm';
import { AlarmInterface } from '@/interfaces';

describe('<ActiveAlarms />', () => {
  it(`renders correctly`, () => {
    const mockActiveAlarm: AlarmInterface = { active: true, key: '0730AM', hour: '07', minute: '30', meridiem: 'AM' };
    const tree = renderer.create(<ActiveAlarms nearestAlarm={mockActiveAlarm} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
