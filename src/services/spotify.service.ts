import AsyncStorage from '@react-native-async-storage/async-storage';
import SpotifyWebApi from 'spotify-web-api-js';
import { storageKeys } from '@/constants/Values';
import { Credentials } from '@/types';
import { format } from 'date-fns';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
const TOKEN_ENDPOINT = 'https://7r7hha3pzk.execute-api.us-east-1.amazonaws.com/spotify-credential/spotify-credential';

export type Track = {
  id: string;
  name: string;
  uri: string;
  images: string[];
  artists: string[];
  isPlayable: boolean;
  durationMs: number;
};

export type Playlist = {
  id: string;
  name: string;
  href: string;
  author: string;
  description: string | null;
  trackCount: any;
  images: string[];
  uri: string;
};

export type Device = {
  id: string | null;
  name: string;
  type:
    | 'Computer'
    | 'Tablet'
    | 'Smartphone'
    | 'Speaker'
    | 'TV'
    | 'AVR'
    | 'STB'
    | 'AudioDongle'
    | 'GameConsole'
    | 'CastVideo'
    | 'CastAudio'
    | 'Automobile'
    | 'Unknown';
  isActive: boolean;
  isRestricted: boolean;
};

export type Artist = {
  name: string;
  id: string;
};

export type Song = {
  name: string;
  uri: string;
  id: string;
};

export type TopTrack = {
  artist: Artist;
  song: Song;
};

/**
 * setCredentials
 *
 * Updates credentials in storage
 *
 * @param key
 * @param value
 */
export const setCredentialsAsync = async (credentials: Credentials | null) => {
  try {
    const jsonValue = JSON.stringify(credentials);
    if (credentials) {
      console.log('last refreshed', format(new Date(<string>credentials?.lastRefreshed), 'MM/dd/yyyy h:mm:ss'));
    }
    // console.log()
    await AsyncStorage.setItem(storageKeys.credentials, jsonValue);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export async function fetchTokenAsync(code: string, redirectUri: string) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      body: {
        code,
        redirectUri
      }
    })
  });

  return await response.json();
}

/**
 * getCredentialsAsync
 *
 * Gets auth credentials in storage
 */
export const getCredentialsAsync = async () => {
  let credentials: string | null;
  try {
    credentials = await AsyncStorage.getItem(storageKeys.credentials);
    console.log(credentials);
    return credentials != null ? JSON.parse(credentials) : null;
  } catch (e) {
    // getting error
    console.log(e);
  }
};

export async function refreshTokenAsync(refreshToken: string) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    redirect: 'follow',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      body: {
        refreshToken
      }
    })
  });

  return await response.json();
}

export async function playTrackAsync({ uri, deviceId, time }: { uri: string; deviceId: string; time?: number }) {
  const client = await getClientAsync();
  return await client.play({
    uris: [uri],
    device_id: deviceId,
    position_ms: time ?? 0
  });
}

export async function fetchDevicesAsync(): Promise<any> {
  const client = await getClientAsync();
  const result = await client.getMyDevices();
  return result.devices
    .map(
      (d: typeof result.devices[0]) =>
        ({
          id: d.id,
          name: d.name,
          isActive: d.is_active,
          isRestricted: d.is_restricted,
          type: d.type
        } as Device)
    )
    .sort((a: Device, b: Device) => (a.isActive && b.isActive ? 0 : -1));
}

export async function fetchPlaylistsAsync(): Promise<Playlist[]> {
  const client = await getClientAsync();
  // @ts-ignore: the type for this is wrong, the first param should be undefined | Object
  const result = await client.getUserPlaylists({ limit: 50 });
  return result.items.map(
    (p: typeof result.items[0]) =>
      ({
        id: p.id,
        name: p.name,
        author: p.owner.display_name,
        description: p.description!,
        trackCount: p.tracks.total,
        href: p.href,
        uri: p.uri,
        images: p.images.map((image: typeof p.images[0]) => image.url)
      } as Playlist)
  );
}

export async function fetchTopTracksAsync(): Promise<any> {
  const client = await getClientAsync();
  const result = await client.getMyTopTracks({ limit: 10, time_range: 'medium_term' });
  return result.items.map((t: any) => ({
    artist: { id: t.artists[0].id, name: t.artists[0].name },
    song: {
      id: t.id,
      name: t.name,
      href: t.href,
      uri: t.uri
    }
  }));
}

/**
 * getValidTokenAsync
 *
 *  Handle refreshing token whenever it's coming due
 */
//
async function getValidTokenAsync() {
  const credentials = await getCredentialsAsync();
  // let d = new Date(credentials?.lastRefreshed);
  try {
    let lastRefreshedDate = new Date(credentials?.lastRefreshed);
    // If there's only 600 seconds left to use token, go ahead and refresh it
    if (new Date().getTime() - lastRefreshedDate.getTime() > credentials?.expiresIn - 600) {
      const result = await refreshTokenAsync(credentials?.refreshToken);
      const parsedResults = JSON.parse(result.body);
      const newAuthCredentials = {
        ...credentials,
        ...parsedResults
      };
      await setCredentialsAsync(newAuthCredentials);
      return newAuthCredentials.token;
    }
  } catch (e) {
    console.log(e);
  }

  return credentials?.token;
}

export async function getAvailableDevice() {
  const devices: Device[] = await fetchDevicesAsync();
  let savedDevice = devices.find((device) => device.name === Constants.deviceName);
  if (savedDevice) {
    return savedDevice;
  } else {
    await Linking.openURL('spotify://').then(async () => {
      await fetchDevicesAsync().then((devices) => {
        savedDevice = devices.find((device: Device) => device.name === Constants.deviceName);
      });
    });
  }
  return savedDevice;
}

async function getClientAsync() {
  const token = await getValidTokenAsync();
  const client = new SpotifyWebApi();
  client.setAccessToken(token);
  return client;
}
