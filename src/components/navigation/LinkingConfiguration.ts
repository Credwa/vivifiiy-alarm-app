import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home'
            }
          },
          Alarms: {
            screens: {
              AlarmsScreen: 'alarms'
            }
          },
          Insights: {
            screens: {
              InsightsScreen: 'insights'
            }
          },
          Settings: {
            screens: {
              SettingsScreen: 'settings'
            }
          }
        }
      },
      NotFound: '*'
    }
  }
};
