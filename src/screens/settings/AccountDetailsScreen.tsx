import Background from '@/components/Background';
import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsTabParamList } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { resize } from '@/utils';

export default function AccountDetailsScreen({
  navigation
}: StackScreenProps<SettingsTabParamList, 'AccountDetailsScreen'>) {
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Pressable onPress={navigation.goBack} style={styles.backButton}>
              {({ pressed }) => (
                <AntDesign
                  name="arrowleft"
                  size={resize(28, 24, 44)}
                  color={pressed ? Colors.greyLight3 : Colors.greyLight1}
                />
              )}
            </Pressable>
            <VivText
              fontName={resize('Title6', 'Body', 'Title3')}
              color={Colors.greyLight1}
              style={{ marginLeft: -15 }}
            >
              Account
            </VivText>
            <Pressable onPress={navigation.goBack} style={{ opacity: 0 }}>
              {({ pressed }) => (
                <AntDesign name="arrowleft" size={28} color={pressed ? Colors.greyLight3 : Colors.greyLight1} />
              )}
            </Pressable>
          </View>
        </View>
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
  header: {
    flexDirection: 'row',
    height: 44,
    marginBottom: 50,
    width: wp('80%'),
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
