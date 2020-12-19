import React from 'react';
import renderer from 'react-test-renderer';
import AlarmsList from '@/components/Alarm/AlarmsList';
import { AlarmInterface } from '@/interfaces';

describe('<AlarmsList />', () => {
  it(`renders correctly`, () => {
    const mockActiveAlarm: AlarmInterface = { active: true, key: '0730AM', hour: '07', minute: '30', meridiem: 'AM' };
    const mockMap = new Map();
    mockMap.set(mockActiveAlarm.key, mockActiveAlarm);
    const tree = renderer.create(<AlarmsList alarms={mockMap} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
