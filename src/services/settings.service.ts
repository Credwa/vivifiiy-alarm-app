import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from '@/constants/Values';
import { SettingsInterface } from '@/interfaces';

/**
 * updateSettings
 *
 * Updates settings in storage
 *
 * @param key
 * @param value
 */
export const updateSettings = async (settings: Map<string, SettingsInterface>) => {
  try {
    const settingsToSave = Object.fromEntries(settings);
    const jsonValue = JSON.stringify(settingsToSave);
    await AsyncStorage.setItem(storageKeys.settings, jsonValue);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

/**
 * getSettings
 *
 * Get all settings in storage
 */
export const getSettings = async () => {
  let settings: string | null;
  try {
    settings = await AsyncStorage.getItem(storageKeys.settings);
    return settings != null ? JSON.parse(settings) : null;
  } catch (e) {
    // getting error
    console.log(e);
  }
};
