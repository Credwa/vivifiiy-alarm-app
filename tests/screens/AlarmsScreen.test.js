import AlarmsScreen from '@/screens/AlarmsScreen';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as React from 'react';
import renderer from 'react-test-renderer';

describe('<AlarmsScreen />', () => {
  beforeEach(async () => {
    await Font.loadAsync({
      ...Ionicons.font
    });
  });

  it(`renders correctly`, () => {
    const tree = renderer.create(<AlarmsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
