/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {useTheme} from '../../hooks/useTheme';
import useLocation from '../../hooks/useLocation';
import {formatPrice} from '../../utils/utils';

interface SearchListItemProps {
  item: Coin;
  onPress: () => void;
}

export interface Coin {
  id: string;
  name: string;
  icon: string;
  symbol: string;
  pricePercentage: number;
  price: number;
  currency: string;
}

function CoinListItem({item, onPress}: SearchListItemProps): React.JSX.Element {
  const isPositive = item.pricePercentage > 0;
  const formattedPercentage = item.pricePercentage.toFixed(2);
  const percentageText = isPositive
    ? `+${formattedPercentage}`
    : formattedPercentage;

  const {currentTheme} = useTheme();
  const {currentLocation} = useLocation();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderBottomColor: currentTheme.secondary,
        },
      ]}
      onPress={onPress}>
      <Image source={{uri: item.icon}} style={styles.icon} />
      <View>
        <Text style={[styles.name, {color: currentTheme.text}]}>
          {item.name}
        </Text>
        <Text style={[styles.symbol, {color: currentTheme.text}]}>
          {item.symbol}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text
          style={[
            styles.percentage,
            {color: isPositive ? '#2ecc71' : '#e74c3c'},
          ]}>
          {percentageText} %
        </Text>
        <Text style={[styles.price, {color: currentTheme.text}]}>
          {formatPrice(item.price, currentLocation)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
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
    fontSize: 18,
  },
  symbol: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textTransform: 'uppercase',
  },
  priceContainer: {
    position: 'absolute',
    flex: 1,
    right: 0,
    flexDirection: 'column',
  },
  percentage: {
    textAlign: 'right',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  price: {
    textAlign: 'right',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default React.memo(CoinListItem);
