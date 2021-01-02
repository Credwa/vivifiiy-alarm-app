import Background from '@/components/Background';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '@/store/settings';
import { smallScreenWidthBreakpoint, largeScreenWidthBreakpoint } from '@/constants/Values';
import { SettingsTabParamList } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import VivCard from '@/components/VivCard';
import SettingCardItem from '@/components/SettingCardItem';

const windowWidth = Dimensions.get('window').width;
export default function VolumeStyleScreen({
  navigation
}: StackScreenProps<SettingsTabParamList, 'VolumeStyleScreen'>) {
  const [selected, setSelected] = useState(useStore.getState().getSetting('volumeStyle'));
  const setVolumeStyle = useStore((state) => state.setSetting);

  const updatedSelected = (volumeStyle: string) => {
    setSelected(volumeStyle);
    setVolumeStyle('volumeStyle', volumeStyle);
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Pressable onPress={navigation.goBack} style={styles.backButton}>
              {({ pressed }) => (
                <AntDesign
                  name="arrowleft"
                  size={
                    windowWidth < smallScreenWidthBreakpoint ? 24 : windowWidth > largeScreenWidthBreakpoint ? 44 : 28
                  }
                  color={pressed ? Colors.greyLight3 : Colors.greyLight1}
                />
              )}
            </Pressable>
            <VivText
              fontName={
                windowWidth < smallScreenWidthBreakpoint
                  ? 'Body'
                  : windowWidth > largeScreenWidthBreakpoint
                  ? 'Title3'
                  : 'Title6'
              }
              color={Colors.greyLight1}
              style={{ marginLeft: -15 }}
            >
              Volume style
            </VivText>
            <Pressable onPress={navigation.goBack} style={{ opacity: 0 }}>
              {({ pressed }) => (
                <AntDesign name="arrowleft" size={28} color={pressed ? Colors.greyLight3 : Colors.greyLight1} />
              )}
            </Pressable>
          </View>
        </View>
        <VivCard
          style={styles.card}
          headerChildren={
            <VivText
              fontName={
                windowWidth < smallScreenWidthBreakpoint
                  ? 'Headline'
                  : windowWidth > largeScreenWidthBreakpoint
                  ? 'Title5'
                  : 'Headline'
              }
              color={Colors.greyLight1}
            >
              Alarm settings
            </VivText>
          }
        >
          <SettingCardItem
            title="Progressive"
            horizontalRule
            itemRight="icon"
            onCardItemPress={() => {
              updatedSelected('Progressive');
            }}
            rightIcon={
              selected === 'Progressive' ? <Ionicons name="ios-checkmark" size={28} color={Colors.greyLight2} /> : null
            }
          />

          <SettingCardItem
            title="Adaptive"
            horizontalRule
            itemRight="icon"
            onCardItemPress={() => {
              updatedSelected('Adaptive');
            }}
            rightIcon={
              selected === 'Adaptive' ? <Ionicons name="ios-checkmark" size={28} color={Colors.greyLight2} /> : null
            }
          />

          <SettingCardItem
            title="Standard"
            onCardItemPress={() => {
              updatedSelected('Standard');
            }}
            itemRight="icon"
            rightIcon={
              selected === 'Standard' ? <Ionicons name="ios-checkmark" size={28} color={Colors.greyLight2} /> : null
            }
          />
        </VivCard>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25
  },
  backButton: {
    height: 44,
    width: 44,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  card: {},
  header: {
    flexDirection: 'row',
    height: 44,
    marginBottom: 50,
    width: wp('91%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'space-around'
  },
  separator: {
    marginVertical: 30,
    height: 0.3,
    width: '80%'
  }
});
