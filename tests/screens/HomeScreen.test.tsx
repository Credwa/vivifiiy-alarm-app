import HomeScreen from '@/screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as React from 'react';
import renderer from 'react-test-renderer';
jest.useFakeTimers();

describe('<HomeScreen />', () => {
  beforeEach(async () => {
    await Font.loadAsync({
      ...Ionicons.font
    });
  });

  it(`renders correctly`, () => {
    let tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
