import { getCredentialsAsync } from '@/services/spotify.service';
import { useState, useEffect } from 'react';
import useStore from '@/store/settings';
import { Credentials } from '@/types';

export default function useLoadCredentials() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const getSetting = useStore((state) => state.getSetting);
  const setSetting = useStore((state) => state.setSetting);
  useEffect(() => {
    getCredentialsAsync()
      .then((credentials: Credentials) => {
        let setting = getSetting('connectedMusicAccounts');
        if (credentials) {
          setCurrentUser({ isAuthenticated: true });
          Array.isArray(setting)
            ? setSetting('connectedMusicAccounts', [...setting, 'Spotify'])
            : setSetting('connectedMusicAccounts', [...[], 'Spotify']);
        } else {
          setCurrentUser({ isAuthenticated: false });
          setSetting('connectedMusicAccounts', []);
        }
      })
      .finally(() => {
        setLoadingComplete(true);
      });
  }, []);

  return isLoadingComplete;
}
