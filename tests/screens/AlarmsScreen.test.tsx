import React from 'react';
import AlarmsScreen from '@/screens/AlarmsScreen.tsx';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import renderer from 'react-test-renderer';
jest.useFakeTimers();
describe('<AlarmsScreen />', () => {
  beforeEach(async () => {
    await Font.loadAsync({
      ...Ionicons.font,
      ...AntDesign.font
    });
  });

  it(`renders correctly`, () => {
    const tree = renderer.create(<AlarmsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
