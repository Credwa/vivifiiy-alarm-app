import { getSettings, updateSettings } from '@/services/settings.service';
import { useState, useEffect } from 'react';
import useStore from '@/store/settings';
import { SettingsInterface } from '@/interfaces';

export default function useLoadSettings() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const setSettingsState = useStore((state) => state.setSettings);
  useEffect(() => {
    getSettings()
      .then((settings: SettingsInterface) => {
        const defaultSettings = {
          volumeStyle: 'Progressive',
          snooze: true,
          snoozeDuration: 10,
          maxVolume: 1,
          connectedMusicAccounts: []
        };
        const loadedSettings: SettingsInterface = { ...defaultSettings, ...settings };

        const loadedSettingsMap: Map<string, SettingsInterface> = new Map();
        for (const setting in loadedSettings) {
          loadedSettingsMap.set(setting, loadedSettings[setting]);
        }
        if (!settings) {
          updateSettings(loadedSettingsMap);
        }
        setSettingsState(loadedSettingsMap);
      })
      .finally(() => {
        setLoadingComplete(true);
      });
  }, []);

  return isLoadingComplete;
}
