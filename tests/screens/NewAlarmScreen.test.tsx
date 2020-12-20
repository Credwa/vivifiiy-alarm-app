import { AlarmInterface } from '@/interfaces';
import NewAlarmScreen from '@/screens/NewAlarmScreen';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import React from 'react';
import renderer from 'react-test-renderer';
jest.useFakeTimers();

describe('<NewAlarmScreen />', () => {
  beforeEach(async () => {
    await Font.loadAsync({
      ...Ionicons.font,
      ...AntDesign.font
    });
  });

  it(`renders correctly`, async () => {
    const mockNav: any = { goBack: jest.fn() };
    const mockRoute: any = { params: {} };
    let tree = await renderer.create(<NewAlarmScreen navigation={mockNav} route={mockRoute} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
