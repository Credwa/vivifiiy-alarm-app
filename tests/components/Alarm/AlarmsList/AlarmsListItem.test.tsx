import React from 'react';
import renderer from 'react-test-renderer';
import AlarmsListItem from '@/components/Alarm/AlarmsList/AlarmsListItem';
import { AlarmInterface } from '@/interfaces';

describe('<AlarmsListItem />', () => {
  it(`renders correctly`, () => {
    const mockActiveAlarm: AlarmInterface = { active: true, key: '0730AM', hour: '07', minute: '30', meridiem: 'AM' };
    const tree = renderer
      .create(
        <AlarmsListItem alarm={mockActiveAlarm} key={mockActiveAlarm.key} setOpenAlarm={() => {}} isLastAlarm={true} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
