import React from 'react';
import renderer from 'react-test-renderer';
import Alarm from '@/components/Alarm';
import { AlarmInterface } from '@/interfaces';
jest.useFakeTimers();

describe('<Alarm />', () => {
  it(`renders correctly`, () => {
    const mockActiveAlarm: AlarmInterface = { active: true, key: '0730AM', hour: '07', minute: '30', meridiem: 'AM' };
    const tree = renderer.create(<Alarm nearestActiveAlarm={mockActiveAlarm} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
