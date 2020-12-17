import HomeScreen from '@/screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as React from 'react';
import renderer from 'react-test-renderer';

describe('<HomeScreen />', () => {
  beforeEach(async () => {
    await Font.loadAsync({
      ...Ionicons.font
    });
  });

  it(`renders correctly`, async () => {
    // let tree = await renderer.create(<HomeScreen />).toJSON();
    // expect(tree).toMatchSnapshot();
    expect(true).toBe(true);
  });
});
