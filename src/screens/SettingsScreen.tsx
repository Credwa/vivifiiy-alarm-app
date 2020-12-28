import Background from '@/components/Background';
import React from 'react';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import VivCard from '@/components/VivCard';
import SettingCardItem from '@/components/SettingCardItem';
import * as StoreReview from 'expo-store-review';
import { smallScreenWidthBreakpoint, largeScreenWidthBreakpoint } from '@/constants/Values';
import { SettingsTabParamList } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
const windowWidth = Dimensions.get('window').width;

export default function SettingsTabScreen({
  navigation
}: StackScreenProps<SettingsTabParamList, 'SettingsTabScreen'>) {
  const onRateApp = () => {
    StoreReview.requestReview();
  };

  const onVolumeStylePress = () => {
    navigation.navigate('VolumeStyleScreen');
  };

  const onLinkedAccountsPress = () => {
    navigation.navigate('LinkedMusicAccountsScreen');
  };

  const onDataPress = () => {
    navigation.navigate('DataScreen');
  };

  const onAccountDetailsPress = () => {
    navigation.navigate('AccountDetailsScreen');
  };

  const onHelpPress = () => {
    navigation.navigate('HelpScreen');
  };

  const onReportBugPress = () => {
    navigation.navigate('ReportBugScreen');
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VivText fontName="Title4" color={Colors.greyLight1}>
            Settings
          </VivText>
        </View>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <VivCard
            style={styles.card}
            headerChildren={
              <VivText
                fontName={
                  windowWidth < smallScreenWidthBreakpoint
                    ? 'Headline'
                    : windowWidth > largeScreenWidthBreakpoint
                    ? 'Title5'
                    : 'Headline'
                }
                color={Colors.greyLight1}
              >
                Alarm settings
              </VivText>
            }
          >
            <SettingCardItem
              title="Volume style"
              horizontalRule
              onCardItemPress={onVolumeStylePress}
              extraInfo="Progressive"
              icon={<SimpleLineIcons name="volume-2" size={24} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              title="Snooze"
              horizontalRule
              itemRight="switch"
              icon={<FontAwesome name="moon-o" size={25} style={{ paddingRight: 3 }} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              title="Snooze duration"
              horizontalRule
              itemRight="buttons"
              icon={<SimpleLineIcons name="volume-2" size={24} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              itemRight="icon"
              slider={true}
              icon={<SimpleLineIcons name="volume-off" size={24} color={Colors.greyLight2} />}
              rightIcon={<SimpleLineIcons name="volume-2" size={24} color={Colors.greyLight2} />}
            />
          </VivCard>

          <VivCard
            style={styles.card}
            headerChildren={
              <VivText
                fontName={
                  windowWidth < smallScreenWidthBreakpoint
                    ? 'Headline'
                    : windowWidth > largeScreenWidthBreakpoint
                    ? 'Title5'
                    : 'Headline'
                }
                color={Colors.greyLight1}
              >
                General settings
              </VivText>
            }
          >
            <SettingCardItem
              title="Linked music accounts"
              horizontalRule
              onCardItemPress={onLinkedAccountsPress}
              icon={<SimpleLineIcons name="music-tone-alt" size={24} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              title="Data"
              horizontalRule
              onCardItemPress={onDataPress}
              icon={<Ionicons name="ios-cloud-outline" size={24} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              title="Account details"
              onCardItemPress={onAccountDetailsPress}
              icon={<AntDesign name="user" size={24} color={Colors.greyLight2} />}
            />
          </VivCard>

          <VivCard
            style={styles.card}
            headerChildren={
              <VivText
                fontName={
                  windowWidth < smallScreenWidthBreakpoint
                    ? 'Headline'
                    : windowWidth > largeScreenWidthBreakpoint
                    ? 'Title5'
                    : 'Headline'
                }
                color={Colors.greyLight1}
              >
                Other settings
              </VivText>
            }
          >
            <SettingCardItem
              title="Help"
              horizontalRule
              onCardItemPress={onHelpPress}
              icon={<Ionicons name="ios-help-circle-outline" size={24} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              title="Rate app"
              onCardItemPress={onRateApp}
              horizontalRule
              icon={<Ionicons name="ios-star-outline" size={24} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              title="Report a bug"
              onCardItemPress={onReportBugPress}
              icon={<FontAwesome name="frown-o" size={24} color={Colors.greyLight2} />}
            />
          </VivCard>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    height: 44,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  settingsCards: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  card: {
    marginBottom: 30
  }
});
