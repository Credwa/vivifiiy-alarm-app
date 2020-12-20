import { AlarmInterface } from '@/interfaces';
import EditAlarmScreen from '@/screens/EditAlarmScreen';
import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import React from 'react';
import renderer from 'react-test-renderer';
jest.useFakeTimers();

describe('<EditAlarmScreen />', () => {
  beforeEach(async () => {
    await Font.loadAsync({
      ...AntDesign.font
    });
  });

  it(`renders correctly`, async () => {
    const mockActiveAlarm: AlarmInterface = { active: true, key: '0730AM', hour: '07', minute: '30', meridiem: 'AM' };
    const mockNav: any = { goBack: jest.fn() };
    const mockRoute: any = { params: { alarm: mockActiveAlarm } };
    let tree = await renderer.create(<EditAlarmScreen navigation={mockNav} route={mockRoute} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
