import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Image, View } from 'react-native';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { resize } from '@/utils';

interface MusicAccountItemProps {
  accountName: string;
  accountIconUrl: any;
  size?: number;
  comingSoon?: boolean;
  onMusicAccountPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export default function MusicAccountItem({
  accountName,
  size,
  accountIconUrl,
  comingSoon,
  onMusicAccountPress
}: MusicAccountItemProps) {
  return (
    <Pressable onPress={onMusicAccountPress}>
      {({ pressed }) => (
        <View style={styles.musicAccountItem}>
          <Image
            source={accountIconUrl}
            style={{
              ...styles.image,
              height: size || 44,
              width: size || 44,
              opacity: comingSoon || pressed ? 0.5 : 1
            }}
          />
          <VivText
            fontName={resize('Title6', 'Body', 'Title3')}
            color={pressed || comingSoon ? Colors.greyLight3 : Colors.greyLight1}
          >
            {accountName}
          </VivText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  musicAccountItem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPercentageToDP('1%'),
    width: widthPercentageToDP('90%')
  },
  image: {
    marginRight: widthPercentageToDP('5%')
  }
});
