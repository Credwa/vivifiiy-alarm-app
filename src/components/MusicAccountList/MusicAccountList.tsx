import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import VivText from '@/components/VivText';
import MusicAccountItem from './MusicAccountItem';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import useStore from '@/store/settings';
import { resize } from '@/utils';

interface MusicAccountListProps {}

const musicAccountObject = [
  {
    accountName: 'Spotify',
    accountIconUri: require('~/assets/images/spotify.png'),
    available: true,
    connected: false
  },
  {
    accountName: 'Apple',
    accountIconUri: require('~/assets/images/apple.png'),
    available: true,
    connected: false
  },
  {
    accountName: 'Amazon music',
    accountIconUri: require('~/assets/images/amazon-music.png'),
    available: false,
    connected: false
  }
];

export default function MusicAccountList({}: MusicAccountListProps) {
  const connectedMusicAccounts = useStore.getState().getSetting('connectedMusicAccounts') || [];
  musicAccountObject.forEach((item) => {
    if (connectedMusicAccounts.includes(item.accountName) && item.available) {
      item.connected = true;
    } else item.connected = false;
  });

  const connectedAccounts = musicAccountObject.filter((item) => (item.connected && item.available ? item : undefined));

  const availableAccounts = musicAccountObject.filter((item) =>
    !item.connected && item.available ? item : undefined
  );

  const unavailableAccounts = musicAccountObject.filter((item) => (!item.available ? item : undefined));
  return (
    <ScrollView
      bounces={false}
      style={styles.musicAccountList}
      contentContainerStyle={styles.musicAccountListContainer}
    >
      <View style={styles.center}>
        <VivText
          fontName={resize('Body', 'Body', 'Title4')}
          style={{ marginBottom: heightPercentageToDP('2%'), marginLeft: 0 }}
          color={Colors.greyLight1}
        >
          Connected
        </VivText>
        <View>
          {connectedAccounts.length > 0 ? (
            connectedAccounts.map((account, index) => (
              <View key={index}>
                {index === connectedAccounts.length - 1 && index !== 0 ? null : <View style={styles.hairline} />}
                <MusicAccountItem
                  accountName={account.accountName}
                  size={resize(44, 38, 64)}
                  accountIconUrl={account.accountIconUri}
                />
                <View style={styles.hairline} />
              </View>
            ))
          ) : (
            <VivText fontName={resize('Callout', 'Subhead', 'Title6')} color={Colors.greyLight3}>
              Press an item below to connect a music account
            </VivText>
          )}
        </View>
      </View>

      <View style={styles.center}>
        {availableAccounts.length > 0 ? (
          <>
            <VivText
              fontName={resize('Title6', 'Body', 'Title4')}
              color={Colors.greyLight1}
              style={{ marginBottom: heightPercentageToDP('2%'), marginLeft: 0 }}
            >
              Available
            </VivText>
            <>
              {availableAccounts.map((account, index) => (
                <View key={index}>
                  {index === availableAccounts.length - 1 && index !== 0 ? null : <View style={styles.hairline} />}
                  <MusicAccountItem
                    accountName={account.accountName}
                    size={resize(44, 38, 64)}
                    accountIconUrl={account.accountIconUri}
                  />
                  <View style={styles.hairline} />
                </View>
              ))}
            </>
          </>
        ) : null}
      </View>

      <View style={styles.center}>
        {unavailableAccounts.length > 0 ? (
          <>
            <VivText
              fontName={resize('Title6', 'Body', 'Title4')}
              style={{ marginBottom: heightPercentageToDP('2%'), marginLeft: 0 }}
              color={Colors.greyLight1}
            >
              Coming soon
            </VivText>
            <View>
              {unavailableAccounts.map((account, index) => (
                <View key={index}>
                  {index === unavailableAccounts.length - 1 && index !== 0 ? null : <View style={styles.hairline} />}
                  <MusicAccountItem
                    accountName={account.accountName}
                    comingSoon={true}
                    size={resize(44, 38, 64)}
                    accountIconUrl={account.accountIconUri}
                  />
                  <View style={styles.hairline} />
                </View>
              ))}
            </View>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  musicAccountList: {
    flex: 1
  },
  musicAccountListContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  center: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hairline: {
    borderBottomColor: Colors.greyLight3,
    borderWidth: 0.5
  }
});
