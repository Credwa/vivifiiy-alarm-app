import VivButton from '@/components/VivButton';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<VivButton />', () => {
  beforeEach(async () => {
    await Font.loadAsync({
      ...Ionicons.font
    });
  });

  it(`renders a basic button correctly`, () => {
    const tree = renderer.create(<VivButton text="Hello World" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`renders a basic button correctly with all props`, () => {
    const tree = renderer
      .create(
        <VivButton
          text="Hello World props"
          color="Primary"
          onPress={() => {
            return;
          }}
          paddingVertical={14}
          paddingHorizontal={{ left: 12, right: 12 }}
          iconPosition="left"
          icon={<Ionicons name="md-alarm" size={22} />}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`renders a separated button correctly with all props`, () => {
    const tree = renderer
      .create(
        <VivButton
          text="Hello World props"
          color="Secondary"
          onPress={() => {
            return;
          }}
          separator
          paddingVertical={11}
          paddingHorizontal={{ left: 15, right: 15 }}
          icon={<Ionicons name="md-alarm" size={22} />}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
