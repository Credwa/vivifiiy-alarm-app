import { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import {
  Device,
  fetchDevicesAsync,
  fetchTokenAsync,
  setCredentialsAsync,
  getAvailableDevice
} from '@/services/spotify.service';
import useStore from '@/store/settings';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token'
};

const USE_PROXY = Platform.select({
  web: false,
  default: Constants.appOwnership === 'standalone' ? false : true
});

const REDIRECT_URI = makeRedirectUri({
  useProxy: USE_PROXY,
  native: 'vivifiiyalarmapp://redirect'
});
const CLIENT_ID = '71d0b4843f1f4ed68f48010cf0934658';

WebBrowser.maybeCompleteAuthSession();

export default function useSpotifyAuth() {
  const setSetting = useStore((state) => state.setSetting);
  const [error, setError] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [authRequest, authResponse, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      usePKCE: false,
      scopes: [
        'streaming',
        'user-read-email',
        'playlist-modify-public',
        'playlist-read-private',
        'user-read-playback-state',
        'app-remote-control',
        'user-top-read',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'user-library-read'
      ],
      redirectUri: REDIRECT_URI,
      extraParams: {
        // On Android it will just skip right past sign in otherwise
        show_dialog: 'true'
      }
    },
    discovery
  );

  useEffect(() => {
    async function updateFromAuthResponseAsync() {
      if (authResponse === null) {
        return;
      } else if (authResponse.type === 'error') {
        setError(authResponse.error);
        return;
      } else if (authResponse.type === 'success') {
        const result = await fetchTokenAsync(authResponse.params.code, REDIRECT_URI);
        const parsedResults = JSON.parse(result.body);
        if (result.error || !parsedResults.token) {
          setError(result.error ?? 'Unknown error');
        } else {
          await setCredentialsAsync({
            ...parsedResults,
            lastRefreshed: new Date()
          }).then(async () => {
            const savedDevice = await getAvailableDevice();
            setSetting('savedDevice', savedDevice);
          });
          setIsAuthenticated(true);
        }
      }
    }

    if (!isAuthenticated) {
      updateFromAuthResponseAsync();
    }
  }, [authResponse]);

  return {
    error,
    isAuthenticated,
    authenticateSpotifyAsync: () => promptAsync({ useProxy: USE_PROXY })
  };
}
