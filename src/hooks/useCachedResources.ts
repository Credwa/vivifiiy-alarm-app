import { FontAwesome, Ionicons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { useState, useEffect } from 'react';
import { Image } from 'react-native';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  function cacheImages(images: any) {
    return images.map((image: any) => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const imageAssets = cacheImages([require('~/assets/images/backgroundImage.png')]);
        await Promise.all([
          Font.loadAsync({
            ...FontAwesome.font,
            ...Ionicons.font,
            ...SimpleLineIcons.font,
            ...AntDesign.font
          }),
          ...imageAssets
        ]);
      } catch (error) {
        throw error;
      } finally {
        setLoadingComplete(true);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
