import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';

interface CardProps {
  style?: any;
  headerChildren?: React.ReactNode;
  children?: React.ReactNode;
  cardHeaderColor?: string;
  cardBodyColor?: string;
}

const cardRadius = 10;

export default function VivCard({ style, headerChildren, children, cardBodyColor, cardHeaderColor }: CardProps) {
  return (
    <View
      style={{
        ...styles.cardContainer,
        ...style,
        backgroundColor: cardBodyColor ? cardBodyColor : Colors.blueMediumCardBody
      }}
    >
      {headerChildren ? (
        <View
          style={{
            ...styles.cardHeader,
            backgroundColor: cardHeaderColor ? cardHeaderColor : Colors.blueMediumCardHeader
          }}
        >
          {headerChildren}
        </View>
      ) : null}
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: cardRadius,
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },
  cardHeader: {
    backgroundColor: Colors.blueMediumCardHeader,
    borderTopLeftRadius: cardRadius,
    borderTopRightRadius: cardRadius,
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 5
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingVertical: 15
  }
});
