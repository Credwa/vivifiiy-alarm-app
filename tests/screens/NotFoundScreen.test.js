import NotFoundScreen from '@/screens/NotFoundScreen';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as React from 'react';
import renderer from 'react-test-renderer';

describe('<NotFoundScreen />', () => {
  beforeEach(async () => {
    await Font.loadAsync({
      ...Ionicons.font
    });
  });

  it(`renders correctly`, () => {
    const tree = renderer.create(<NotFoundScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
