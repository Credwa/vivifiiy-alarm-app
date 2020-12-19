import InsightsScreen from '@/screens/InsightsScreen.tsx';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<InsightsScreen />', () => {
  beforeEach(async () => {
    await Font.loadAsync({
      ...Ionicons.font
    });
  });

  it(`renders correctly`, () => {
    const tree = renderer.create(<InsightsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
