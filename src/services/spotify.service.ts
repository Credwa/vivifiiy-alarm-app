import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from '@/constants/Values';
import { Credentials } from '@/types';

const TOKEN_ENDPOINT = 'https://7r7hha3pzk.execute-api.us-east-1.amazonaws.com/spotify-credential/spotify-credential';

/**
 * setCredentials
 *
 * Updates settings in storage
 *
 * @param key
 * @param value
 */
export const setCredentialsAsync = async (credentials: Credentials) => {
  try {
    const jsonValue = JSON.stringify(credentials);
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
      code,
      redirectUri
    })
  });

  return await response.json();
}
