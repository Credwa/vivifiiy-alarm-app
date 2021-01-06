import AsyncStorage from '@react-native-async-storage/async-storage';
import SpotifyWebApi from 'spotify-web-api-js';
import { storageKeys } from '@/constants/Values';
import { Credentials } from '@/types';

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
    console.log(credentials);
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

// export async function fetchPlaylistsAsync(): Promise<any> {
//   // const client = await getClientAsync();
//   // // // @ts-ignore: the type for this is wrong, the first param should be undefined | Object
//   // // const result = await client.getUserPlaylists({ limit: 50 });
//   // try {
//   //   const result = await client.getMyTopTracks({ limit: 5, time_range: 'medium_term' });
//   //   return result;
//   // } catch (e) {
//   //   console.log(e);
//   // }
//   const client = await getClientAsync();
//   // @ts-ignore: the type for this is wrong, the first param should be undefined | Object
//   const result = await client.getUserPlaylists({ limit: 50 });

//   return result.items.map(
//     (p: typeof result.items[0]) =>
//       ({
//         id: p.id,
//         name: p.name,
//         author: p.owner.display_name,
//         description: p.description!,
//         trackCount: p.tracks.total,
//         href: p.href,
//         uri: p.uri,
//         images: p.images.map((image: typeof p.images[0]) => image.url)
//       } as Playlist)
//   );
// }

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

/**
 * getValidTokenAsync
 *
 *  Handle refreshing token whenever it's coming due
 */
//
async function getValidTokenAsync() {
  const credentials = await getCredentialsAsync();
  let d = new Date(credentials.lastRefreshed);
  try {
    let lastRefreshedDate = new Date(credentials.lastRefreshed);
    // If there's only 600 seconds left to use token, go ahead and refresh it
    if (new Date().getTime() - lastRefreshedDate.getTime() > credentials.expiresIn - 600) {
      const result = await refreshTokenAsync(credentials.refreshToken);
      const parsedResults = JSON.parse(result.body);
      console.log('ressss', result);
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

  return credentials.token;
}

async function getClientAsync() {
  const token = await getValidTokenAsync();
  const client = new SpotifyWebApi();
  client.setAccessToken(token);
  return client;
}
