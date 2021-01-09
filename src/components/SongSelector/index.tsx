import React, { useEffect, memo } from 'react';
import ScrollSelector from '@/components/ScrollSelector';
import Colors from '@/constants/Colors';
import VivText, { FontName } from '@/components/VivText';
import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { debounce, resize } from '@/utils';
import { useQuery } from 'react-query';
import {
  fetchDevicesAsync,
  fetchTopTracksAsync,
  getAvailableDevice,
  playTrackAsync,
  TopTrack
} from '@/services/spotify.service';
import ItemText from '@/components/ScrollSelector/src/ItemText';
import SelectedItem from '@/components/ScrollSelector/src/SelectedItem';
import useStore from '@/store/settings';

export default memo(function SongSelector() {
  const spotifySongs = useQuery('topTracks', fetchTopTracksAsync);
  const setSetting = useStore((state) => state.setSetting);
  const getSetting = useStore((state) => state.getSetting);
  const spotifyDevices = useQuery('devices', fetchDevicesAsync);
  let spotifyTopSongsData: TopTrack[] = [];
  if (!spotifySongs.isFetching) spotifyTopSongsData = spotifySongs.data;
  useEffect(() => {
    fetchTopTracksAsync().then((songs) => {
      console.log(songs);
      spotifyTopSongsData = songs;
    });
  }, []);

  const onSongChange = debounce(async (track: TopTrack) => {
    let device = await getAvailableDevice();
    if (device) {
      playTrackAsync({ uri: track.song.uri, deviceId: device.id as string });
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
      <ScrollSelector
        dataSource={spotifyTopSongsData}
        renderItem={renderItem}
        overrideFontName={resize<FontName[]>(['Headline', 'Footnote'], ['Subhead', 'Caption'], ['Title1', 'Title2'])}
        selectedIndex={1}
        onValueChange={onSongChange}
        wrapperWidth={Dimensions.get('window').width}
        wrapperHeight={wp('30%')}
        itemHeight={resize<number>(50, 45, 110)}
        highlightColor={Colors.white}
        highlightBorderWidth={0.001}
      />
    </>
  );
});
