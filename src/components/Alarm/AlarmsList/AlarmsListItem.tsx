import React, { useRef } from 'react';
import Colors from '@/constants/Colors';
import { AlarmInterface } from '@/interfaces';
import { View, StyleSheet, Switch, Animated, I18nManager } from 'react-native';
import VivText from '@/components/VivText';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import useStore from '@/store';
import { useNavigation } from '@react-navigation/native';

interface AlarmListItemProps {
  alarm: AlarmInterface;
  isLastAlarm: boolean;
  setOpenAlarm: (ref: any) => void;
}

export default function AlarmListItem({ alarm, isLastAlarm, setOpenAlarm }: AlarmListItemProps) {
  const navigation = useNavigation();
  const setAlarm = useStore((state) => state.setAlarm);
  const removeAlarm = useStore((state) => state.removeAlarm);
  let swipeableRow: any = useRef(0);

  const updateRef = (ref: any) => {
    swipeableRow = ref;
  };
  const close = () => {
    swipeableRow.close();
  };

  const onPanelOpen = () => {
    setOpenAlarm(swipeableRow);
  };

  const renderLeftAction = (text: string, color: string, x: number, progress: Animated.Value) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-x, 0]
    });
    const pressHandler = () => {
      // edit
      close();
      navigation.navigate('EditAlarmScreen', {
        alarm
      });
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <VivText fontName={'Body'} color={Colors.greyLight1}>
            {text}
          </VivText>
        </RectButton>
      </Animated.View>
    );
  };

  const renderLeftActions = (progress: any) => (
    <View
      style={{
        width: 75,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
      }}
    >
      {renderLeftAction('Edit', Colors.blueEdit, 75, progress)}
    </View>
  );

  const renderRightAction = (text: string, color: string, x: number, progress: Animated.AnimatedInterpolation) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    });
    const pressHandler = () => {
      // delete
      close();
      removeAlarm(alarm.key);
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <VivText fontName={'Body'} color={Colors.greyLight1}>
            {text}
          </VivText>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation) => (
    <View
      style={{
        width: 75,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
      }}
    >
      {renderRightAction('Delete', Colors.redCancel, 75, progress)}
    </View>
  );

  const onToggleAlarmSwitch = () => {
    const updatedAlarm = { ...alarm };
    updatedAlarm.active = !updatedAlarm.active;
    setAlarm(updatedAlarm.key, updatedAlarm);
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      overshootFriction={8}
      leftThreshold={40}
      rightThreshold={40}
      onSwipeableRightOpen={onPanelOpen}
      onSwipeableLeftOpen={onPanelOpen}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      <View>
        <View style={styles.hairline} />
        <View style={styles.alarmItemContainer}>
          <VivText color={Colors.greyLight2} fontName={'Title2'}>
            {Number(alarm.hour)}:{alarm.minute}{' '}
            <VivText color={Colors.greyLight2} fontName={'Title3'}>
              {alarm.meridiem}
            </VivText>
          </VivText>
          <Switch
            style={styles.switch}
            trackColor={{ false: Colors.orangeMedium, true: Colors.orangeMedium }}
            thumbColor={Colors.greyLight1}
            ios_backgroundColor={Colors.greyLight2}
            onValueChange={onToggleAlarmSwitch}
            value={alarm.active}
          />
        </View>
        {isLastAlarm ? <View style={styles.hairline} /> : null}
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  alarmItemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  hairline: {
    borderBottomColor: Colors.greyLight3,
    borderWidth: 0.5
  },
  switch: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }]
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  leftAction: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#497AFC',
    justifyContent: 'center'
  }
});
