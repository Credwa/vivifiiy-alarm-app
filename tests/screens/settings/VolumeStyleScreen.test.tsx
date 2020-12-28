import VolumeStyleScreen from '@/screens/settings/VolumeStyleScreen';
import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import React from 'react';
import renderer from 'react-test-renderer';
jest.useFakeTimers();

describe('<VolumeStyleScreen />', () => {
  beforeEach(async () => {
    await Font.loadAsync({
      ...AntDesign.font
    });
  });

  it(`renders correctly`, async () => {
    const mockNav: any = { goBack: jest.fn() };
    const mockRoute: any = { params: {} };
    let tree = await renderer.create(<VolumeStyleScreen navigation={mockNav} route={mockRoute} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
