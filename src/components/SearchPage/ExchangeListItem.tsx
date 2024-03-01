import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {useTheme} from '../../hooks/useTheme';

interface ExchangeListItemProps {
  item: Exchange;
  onPress: () => void;
}

export interface Exchange {
  id: string;
  name: string;
  description: string;
  icon: string;
  year: number;
  country: string;
  url: string;
  tradeVolume: number;
}

function ExchangeListItem({
  item,
  onPress,
}: ExchangeListItemProps): React.JSX.Element {
  const {currentTheme} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderBottomColor: currentTheme.secondary,
        },
      ]}
      onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {item.icon === 'missing_small.png' ? (
          <Image source={{uri: undefined}} style={styles.icon} />
        ) : (
          <Image source={{uri: item.icon}} style={styles.icon} />
        )}
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={[styles.tradeVolume, {color: currentTheme.text}]}>
        {item.tradeVolume.toFixed(2) + ' ' + 'BTC'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: theme.colors.light.primary,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    borderBottomWidth: 1,
    // borderBottomColor: theme.colors.light.primary,
    width: '100%',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 25,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  tradeVolume: {
    marginTop: 5,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    textTransform: 'uppercase',
  },
});

export default ExchangeListItem;
