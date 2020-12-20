import React from 'react';
import renderer from 'react-test-renderer';
import AlarmsList from '@/components/Alarm/AlarmsList';
import { AlarmInterface } from '@/interfaces';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { NavigationContainer } from '@react-navigation/native';
import LinkingConfiguration from '@/components/navigation/LinkingConfiguration';

jest.useFakeTimers();
describe('<AlarmsList />', () => {
  it(`renders correctly`, () => {
    const mockActiveAlarm: AlarmInterface = { active: true, key: '0730AM', hour: '07', minute: '30', meridiem: 'AM' };
    const mockMap = new Map();
    mockMap.set(mockActiveAlarm.key, mockActiveAlarm);
    const Stack = createStackNavigator<RootStackParamList>();
    const tree = renderer
      .create(
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={AlarmsList} />
          </Stack.Navigator>
        </NavigationContainer>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
