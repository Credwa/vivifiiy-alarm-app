import React, { useEffect, memo, useState } from 'react';
import ScrollSelector from '@/components/ScrollSelector';
import Colors from '@/constants/Colors';
import VivText, { FontName } from '@/components/VivText';
import { Dimensions, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { debounce, resize } from '@/utils';
import { useQuery } from 'react-query';
import { fetchTopTracksAsync, getAvailableDevice, TopTrack } from '@/services/spotify.service';
import ItemText from '@/components/ScrollSelector/src/ItemText';
import SelectedItem from '@/components/ScrollSelector/src/SelectedItem';
import useStore from '@/store/settings';
import VivButton from '../VivButton';
import useSpotifyAuth from '@/hooks/useSpotifyAuth';
import { MusicAccount } from '@/interfaces';

const musicAccountList: Array<MusicAccount> = [
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

export default memo(function SongSelector() {
  const [defaultIndex, setDefaultIndex] = useState(1);
  const [spotifyLoading, setSpotifyLoading] = useState(true);
  const [musicAccountsState, setMusicAccounts] = useState(musicAccountList);
  const { isAuthenticated, error, authenticateSpotifyAsync } = useSpotifyAuth();
  const spotifySongs = useQuery('topTracks', fetchTopTracksAsync);
  const setSetting = useStore((state) => state.setSetting);
  const getSetting = useStore((state) => state.getSetting);
  let spotifyTopSongsData: TopTrack[] = [];
  if (!spotifySongs.isFetching) spotifyTopSongsData = spotifySongs.data ?? [];

  useEffect(() => {
    fetchTopTracksAsync()
      .then((songs) => {
        spotifyTopSongsData = songs ?? [];
        setSpotifyLoading(false);
      })
      .catch((e) => {
        setSpotifyLoading(false);
      });
  }, []);

  useEffect(() => {
    const trackIndexSaved = getSetting('trackIndexSaved');
    if (trackIndexSaved) setDefaultIndex(trackIndexSaved);
  });

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
          setSpotifyLoading(true);
          authenticateSpotifyAsync()
            .then(() => {
              let setting = getSetting('connectedMusicAccounts');
              setSetting('connectedMusicAccounts', [...setting, 'Spotify']);
              updateMusicAccount(account.accountName, true);
              setSpotifyLoading(false);
            })
            .catch(() => {
              updateMusicAccount(account.accountName, false);
              setSpotifyLoading(false);
            });
        }
      }
    }
  };

  const onSongChange = debounce(async (track: TopTrack, index) => {
    let device = await getAvailableDevice();
    if (device) {
      setSetting('savedDevice', device);
      setSetting('track', track);
      setSetting('trackIndexSaved', index);
    }
  }, 1000);

  const renderItem = (trackData: TopTrack, index: number, currentSelectedIndex: number) => {
    const isSelected = index === currentSelectedIndex;
    const overrideFontName = resize<FontName[]>(['Title6', 'Body'], ['Subhead', 'Caption'], ['Title1', 'Title2']);
    let setFontName = () => {
      if (overrideFontName && Array.isArray(overrideFontName)) {
        return isSelected ? overrideFontName[0] : overrideFontName[1];
      } else if (overrideFontName && typeof overrideFontName == 'string') {
        return overrideFontName;
      } else {
        return isSelected ? 'Title1' : 'Title2';
      }
    };
    const item = (
      <ItemText fontName={setFontName()} color={isSelected ? Colors.greyLight1 : Colors.greyLight2}>
        {`${trackData.song.name} - ${trackData.artist.name}`}
      </ItemText>
    );

    return (
      <SelectedItem key={index} itemHeight={resize<number>(50, 45, 110) || 60}>
        {item}
      </SelectedItem>
    );
  };

  return (
    <>
      <VivText
        style={{ paddingVertical: 50 }}
        fontName={resize<FontName>('Title5', 'Body', 'Title3')}
        color={Colors.greyLight1}
      >
        Up next...
      </VivText>
      {spotifyLoading ? <ActivityIndicator size="large" color={Colors.orangeMedium} /> : null}
      {spotifyTopSongsData.length && !spotifyLoading ? (
        <ScrollSelector
          dataSource={spotifyTopSongsData}
          renderItem={renderItem}
          overrideFontName={resize<FontName[]>(['Headline', 'Footnote'], ['Subhead', 'Caption'], ['Title1', 'Title2'])}
          selectedIndex={defaultIndex}
          onValueChange={onSongChange}
          wrapperWidth={Dimensions.get('window').width}
          wrapperHeight={wp('30%')}
          itemHeight={resize<number>(50, 45, 110)}
          highlightColor={Colors.white}
          highlightBorderWidth={0.001}
        />
      ) : null}
      {!spotifyLoading && !spotifyTopSongsData.length ? (
        <VivButton
          onPress={() => {
            linkMusicAccount(musicAccountList[0]);
          }}
          paddingHorizontal={{ right: 30, left: 15 }}
          iconPosition="left"
          style={{ marginTop: 25, marginBottom: 10 }}
          type="separated"
          separator
          color="Spotify"
          text="Connect spotify"
        />
      ) : null}
    </>
  );
});
