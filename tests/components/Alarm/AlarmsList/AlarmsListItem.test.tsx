import React from 'react';
import renderer from 'react-test-renderer';
import AlarmsListItem from '@/components/Alarm/AlarmsList/AlarmsListItem';
import { AlarmInterface } from '@/interfaces';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { NavigationContainer } from '@react-navigation/native';
import LinkingConfiguration from '@/components/navigation/LinkingConfiguration';

jest.useFakeTimers();
describe('<AlarmsListItem />', () => {
  it(`renders correctly`, () => {
    const mockActiveAlarm: AlarmInterface = { active: true, key: '0730AM', hour: '07', minute: '30', meridiem: 'AM' };
    const Stack = createStackNavigator<RootStackParamList>();
    const tree = renderer
      .create(
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={AlarmsListItem} />
          </Stack.Navigator>
        </NavigationContainer>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
