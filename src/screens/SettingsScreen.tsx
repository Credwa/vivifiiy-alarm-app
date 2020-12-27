import Background from '@/components/Background';
import React from 'react';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import { StyleSheet, View, ScrollView } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import VivCard from '@/components/VivCard';
import SettingCardItem from '@/components/SettingCardItem';
import * as StoreReview from 'expo-store-review';

export default function SettingsTabScreen() {
  const onRateApp = () => {
    StoreReview.requestReview();
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
              <VivText fontName="Headline" color={Colors.greyLight1}>
                Alarm settings
              </VivText>
            }
          >
            <SettingCardItem
              title="Volume style"
              horizontalRule
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
              <VivText fontName="Headline" color={Colors.greyLight1}>
                General settings
              </VivText>
            }
          >
            <SettingCardItem
              title="Linked music accounts"
              horizontalRule
              icon={<SimpleLineIcons name="music-tone-alt" size={24} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              title="Data"
              horizontalRule
              icon={<Ionicons name="ios-cloud-outline" size={24} color={Colors.greyLight2} />}
            />

            <SettingCardItem
              title="Account details"
              icon={<AntDesign name="user" size={24} color={Colors.greyLight2} />}
            />
          </VivCard>

          <VivCard
            style={styles.card}
            headerChildren={
              <VivText fontName="Headline" color={Colors.greyLight1}>
                Other settings
              </VivText>
            }
          >
            <SettingCardItem
              title="Help"
              horizontalRule
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
