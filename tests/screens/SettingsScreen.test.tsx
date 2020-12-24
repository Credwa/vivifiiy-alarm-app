import SettingsScreen from '@/screens/SettingsScreen';
import { AntDesign, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import React from 'react';
import renderer from 'react-test-renderer';

jest.useFakeTimers();
describe('<SettingsScreen />', () => {
  beforeEach(async () => {
    await Font.loadAsync({
      ...Ionicons.font,
      ...AntDesign.font,
      ...FontAwesome.font,
      ...SimpleLineIcons.font
    });
  });

  it(`renders correctly`, async () => {
    const tree = await renderer.create(<SettingsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
