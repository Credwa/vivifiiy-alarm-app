import Background from '@/components/Background';
import React, { useEffect, useState } from 'react';
import VivText, { FontName } from '@/components/VivText';
import Colors from '@/constants/Colors';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import VivCard from '@/components/VivCard';
import SettingCardItem from '@/components/SettingCardItem';
import * as StoreReview from 'expo-store-review';
import { SettingsTabParamList } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import useStore from '@/store/settings';
import { debounce, resize } from '@/utils';
import * as Linking from 'expo-linking';

export default function SettingsTabScreen({
  navigation
}: StackScreenProps<SettingsTabParamList, 'SettingsTabScreen'>) {
  const [volumeStyle, setVolumeStyle] = useState(useStore.getState().getSetting('volumeStyle'));
  const [snooze, setSnooze] = useState(useStore.getState().getSetting('snooze'));
  const setSetting = useStore((state) => state.setSetting);
  const getSetting = useStore((state) => state.getSetting);
  const onRateApp = () => {
    StoreReview.requestReview();
  };

  // Listen to setting changes
  useEffect(() => {
    useStore.subscribe(
      (setting: any) => {
        setVolumeStyle(setting);
      },
      (state) => state.getSetting('volumeStyle')
    );
  }, []);

  const switchValueChanged = () => {
    setSetting('snooze', !snooze);
    setSnooze(!snooze);
  };

  const sliderValueChanged = debounce((value: number) => {
    setSetting('maxVolume', value);
  }, 1000);

  const buttonsValueChanged = debounce((value: number) => {
    setSetting('snoozeDuration', value);
  }, 500);

  const onVolumeStylePress = () => {
    navigation.navigate('VolumeStyleScreen');
  };

  const onLinkedAccountsPress = () => {
    navigation.navigate('LinkedMusicAccountsScreen');
  };

  const onDataPress = () => {
    Linking.openURL('https://www.privacy-policy-template.com/live.php?token=jQx8HpKBPfQOtcLdtOhO6wjl6t98ocTs');
  };

  const onAccountDetailsPress = () => {
    sendAlert();
  };

  const onHelpPress = () => {
    Linking.openURL('mailto:craigroe7@gmail.com?subject=Help me!');
  };

  const onReportBugPress = () => {
    sendAlert();
    Linking.openURL('mailto:craigroe7@gmail.com?subject=Found a bug');
  };

  const sendAlert = () => {
    Alert.alert(
      `Not yet available`,
      '',
      [
        {
          text: 'Ok',
          onPress: () => {},
          style: 'cancel'
        }
      ],
      { cancelable: true }
    );
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
              <VivText fontName={resize<FontName>('Headline', 'Headline', 'Title5')} color={Colors.greyLight1}>
                Alarm settings
              </VivText>
            }
          >
            <SettingCardItem
              title="Volume style"
              horizontalRule
              onCardItemPress={onVolumeStylePress}
              extraInfo={volumeStyle}
              icon={<SimpleLineIcons name="volume-2" size={24} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              title="Snooze"
              horizontalRule
              itemRight="switch"
              switchValue={getSetting('snooze')}
              onSwitchValueChange={switchValueChanged}
              icon={<FontAwesome name="moon-o" size={25} style={{ paddingRight: 3 }} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              title="Snooze duration"
              horizontalRule
              itemRight="buttons"
              buttonsValue={getSetting('snoozeDuration')}
              onButtonsValueChange={buttonsValueChanged}
              icon={<SimpleLineIcons name="volume-2" size={24} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              itemRight="icon"
              slider={true}
              sliderValue={getSetting('maxVolume')}
              onSliderValueChange={sliderValueChanged}
              icon={<SimpleLineIcons name="volume-off" size={24} color={Colors.greyLight2} />}
              rightIcon={<SimpleLineIcons name="volume-2" size={24} color={Colors.greyLight2} />}
            />
          </VivCard>

          <VivCard
            style={styles.card}
            headerChildren={
              <VivText fontName={resize<FontName>('Headline', 'Headline', 'Title5')} color={Colors.greyLight1}>
                General settings
              </VivText>
            }
          >
            <SettingCardItem
              title="Connect music"
              horizontalRule
              onCardItemPress={onLinkedAccountsPress}
              icon={<SimpleLineIcons name="music-tone-alt" size={24} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              title="Privacy policy"
              horizontalRule
              onCardItemPress={onDataPress}
              icon={<Ionicons name="ios-cloud-outline" size={24} color={Colors.greyLight2} />}
            />
            {/*
            <SettingCardItem
              title="Account details"
              onCardItemPress={onAccountDetailsPress}
              icon={<AntDesign name="user" size={24} color={Colors.greyLight2} />}
            /> */}
          </VivCard>

          <VivCard
            style={styles.card}
            headerChildren={
              <VivText fontName={resize<FontName>('Headline', 'Headline', 'Title5')} color={Colors.greyLight1}>
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
