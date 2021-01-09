import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import VivText, { FontName } from '@/components/VivText';
import MusicAccountItem from './MusicAccountItem';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import useStore from '@/store/settings';
import { resize } from '@/utils';
import useSpotifyAuth from '@/hooks/useSpotifyAuth';
import { MusicAccount } from '@/interfaces';
import { setCredentialsAsync, fetchDevicesAsync } from '@/services/spotify.service';
import { useQuery } from 'react-query';
import Constants from 'expo-constants';

interface MusicAccountListProps {}

const musicAccountObject: Array<MusicAccount> = [
  {
    accountName: 'Spotify',
    accountIconUri: require('~/assets/images/spotify.png'),
    available: true,
    connected: false
  },
  {
    accountName: 'Apple music',
    accountIconUri: require('~/assets/images/apple.png'),
    available: false,
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
  const { isAuthenticated, error, authenticateSpotifyAsync } = useSpotifyAuth();
  const spotifyDevices = useQuery('devices', fetchDevicesAsync);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const setSetting = useStore((state) => state.setSetting);
  const getSetting = useStore((state) => state.getSetting);
  const [musicAccountsState, setMusicAccounts] = useState(musicAccountObject);
  const connectedMusicAccounts = useStore.getState().getSetting('connectedMusicAccounts') || [];
  musicAccountsState.forEach((item) => {
    if (connectedMusicAccounts.includes(item.accountName) && item.available) {
      item.connected = true;
    } else item.connected = false;
  });

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentUser({ isAuthenticated: true });
    }
  }, [isAuthenticated]);

  const connectedAccounts = musicAccountsState.filter((item) => (item.connected && item.available ? item : undefined));

  const availableAccounts = musicAccountsState.filter((item) =>
    !item.connected && item.available ? item : undefined
  );

  const unavailableAccounts = musicAccountsState.filter((item) => (!item.available ? item : undefined));

  const updateMusicAccount = (accountName: string, connected: boolean) => {
    let newMusicAccountsState = musicAccountsState.map((account) => {
      if (account.accountName === accountName && account.available) {
        const tempAccount = account;
        tempAccount.connected = connected;
        return tempAccount;
      }
      return account;
    });

    setMusicAccounts(newMusicAccountsState);
  };

  const linkMusicAccount = (account: MusicAccount) => {
    if (account.available) {
      if (!account.connected) {
        if (account.accountName === 'Spotify') {
          authenticateSpotifyAsync()
            .then(() => {
              let setting = getSetting('connectedMusicAccounts');
              setSetting('connectedMusicAccounts', [...setting, 'Spotify']);
              updateMusicAccount(account.accountName, true);
            })
            .catch(() => {
              updateMusicAccount(account.accountName, false);
            });
        }
      }
    }
  };

  const unlinkMusicAccount = (account: MusicAccount) => {
    Alert.alert(
      `Disconnect ${account.accountName.toLocaleLowerCase()} account`,
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: () => {
            setCredentialsAsync(null);
            setSetting('connectedMusicAccounts', []);
            updateMusicAccount(account.accountName, false);
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    );
  };
  return (
    <ScrollView
      bounces={false}
      style={styles.musicAccountList}
      contentContainerStyle={styles.musicAccountListContainer}
    >
      <View style={styles.center}>
        <VivText
          fontName={resize<FontName>('Body', 'Body', 'Title4')}
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
                  onMusicAccountPress={() => {
                    unlinkMusicAccount(account);
                  }}
                  size={resize<number>(44, 38, 64)}
                  accountIconUrl={account.accountIconUri}
                />
                <View style={styles.hairline} />
              </View>
            ))
          ) : (
            <VivText fontName={resize<FontName>('Callout', 'Subhead', 'Title6')} color={Colors.greyLight3}>
              Press an item below to connect a music account
            </VivText>
          )}
        </View>
      </View>

      <View style={styles.center}>
        {availableAccounts.length > 0 ? (
          <>
            <VivText
              fontName={resize<FontName>('Title6', 'Body', 'Title4')}
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
                    onMusicAccountPress={() => {
                      linkMusicAccount(account);
                    }}
                    accountName={account.accountName}
                    size={resize<number>(44, 38, 64)}
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
              fontName={resize<FontName>('Title6', 'Body', 'Title4')}
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
                    size={resize<number>(44, 38, 64)}
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
