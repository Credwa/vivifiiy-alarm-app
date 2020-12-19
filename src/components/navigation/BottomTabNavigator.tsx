import Colors from '@/constants/Colors';
import AlarmsScreen from '@/screens/AlarmsScreen';
import HomeScreen from '@/screens/HomeScreen';
import InsightsScreen from '@/screens/InsightsScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import {
  AlarmsTabParamList,
  BottomTabParamList,
  HomeTabParamList,
  InsightsTabParamList,
  SettingsTabParamList
} from '@/types';
import { FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.greyLight2,
        tabStyle: { backgroundColor: Colors.blueMediumCardBody },
        style: { backgroundColor: Colors.blueMediumCardBody, borderTopColor: Colors.blueDark }
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={24} color={color} name="moon-o" />
        }}
      />
      <BottomTab.Screen
        name="Alarms"
        component={AlarmsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="md-alarm" size={26} color={color} />
        }}
      />
      <BottomTab.Screen
        name="Insights"
        component={InsightsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <SimpleLineIcons name="bulb" size={24} color={color} />
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <SimpleLineIcons name="settings" size={24} color={color} />
        }}
      />
    </BottomTab.Navigator>
  );
}

const HomeTabStack = createStackNavigator<HomeTabParamList>();

function HomeTabNavigator() {
  return (
    <HomeTabStack.Navigator>
      <HomeTabStack.Screen name="HomeTabScreen" component={HomeScreen} options={{ headerShown: false }} />
    </HomeTabStack.Navigator>
  );
}

const AlarmsTabStack = createStackNavigator<AlarmsTabParamList>();

function AlarmsTabNavigator() {
  return (
    <AlarmsTabStack.Navigator>
      <AlarmsTabStack.Screen name="AlarmsTabScreen" component={AlarmsScreen} options={{ headerShown: false }} />
    </AlarmsTabStack.Navigator>
  );
}

const InsightsTabStack = createStackNavigator<InsightsTabParamList>();

function InsightsTabNavigator() {
  return (
    <InsightsTabStack.Navigator>
      <InsightsTabStack.Screen name="InsightsTabScreen" component={InsightsScreen} options={{ headerShown: false }} />
    </InsightsTabStack.Navigator>
  );
}

const SettingsTabStack = createStackNavigator<SettingsTabParamList>();

function SettingsTabNavigator() {
  return (
    <SettingsTabStack.Navigator>
      <SettingsTabStack.Screen name="SettingsTabScreen" component={SettingsScreen} options={{ headerShown: false }} />
    </SettingsTabStack.Navigator>
  );
}
