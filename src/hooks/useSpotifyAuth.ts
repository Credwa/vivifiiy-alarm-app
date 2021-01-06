import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { fetchTokenAsync, setCredentialsAsync } from '@/services/spotify.service';

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
console.log(REDIRECT_URI);
const CLIENT_ID = '71d0b4843f1f4ed68f48010cf0934658';

WebBrowser.maybeCompleteAuthSession();

export default function useSpotifyAuth() {
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
        console.log(authResponse.params.code);
        const result = await fetchTokenAsync(authResponse.params.code, REDIRECT_URI);
        if (result.error || !result.token) {
          setError(result.error ?? 'Unknown error');
        } else {
          await setCredentialsAsync({
            ...result,
            lastRefreshed: new Date()
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
