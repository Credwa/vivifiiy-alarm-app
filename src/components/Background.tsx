import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const s3ImageUri = require('~/assets/images/backgroundImage.png');

export default function Background(props: { children: React.ReactNode; paddingHorizontal?: number }) {
  return (
    <ImageBackground
      source={s3ImageUri}
      style={{ ...styles.imageBackground, paddingHorizontal: props.paddingHorizontal || 20 }}
    >
      {props.children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    paddingHorizontal: 20
  }
});
