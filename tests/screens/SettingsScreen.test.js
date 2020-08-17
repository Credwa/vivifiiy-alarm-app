import SettingsScreen from '@/screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as React from 'react';
import renderer from 'react-test-renderer';

describe('<SettingsScreen />', () => {
  beforeEach(async () => {
    await Font.loadAsync({
      ...Ionicons.font
    });
  });

  it(`renders correctly`, () => {
    const tree = renderer.create(<SettingsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
