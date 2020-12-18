import React from 'react';
import renderer from 'react-test-renderer';
import BottomTabNavigator from '@/components/navigation/BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { NavigationContainer } from '@react-navigation/native';
import LinkingConfiguration from '@/components/navigation/LinkingConfiguration';
jest.useFakeTimers();
describe('<BottomTabNavigator />', () => {
  it(`renders correctly`, () => {
    const Stack = createStackNavigator<RootStackParamList>();
    const tree = renderer
      .create(
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
