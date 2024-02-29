import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import theme from '../../../theme';

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
}

function SearchListItem({
  item,
  onPress,
}: SearchListItemProps): React.JSX.Element {
  const isPositive = item.pricePercentage > 0;
  const formattedPercentage = item.pricePercentage.toFixed(2);
  const percentageText = isPositive
    ? `+${formattedPercentage}`
    : formattedPercentage;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: item.icon}} style={styles.icon} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.symbol}>{item.symbol}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text
          style={[
            styles.percentage,
            // eslint-disable-next-line react-native/no-inline-styles
            {color: isPositive ? '#2ecc71' : '#e74c3c'},
          ]}>
          {percentageText} %
        </Text>
        <Text style={styles.price}>{item.price} €</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: theme.colors.light.primary,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.light.primary,
    width: '100%',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 25,
  },
  name: {
    fontWeight: '600',
    fontSize: 20,
  },
  symbol: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: '400',
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
    fontWeight: '400',
    fontSize: 20,
  },
  price: {
    textAlign: 'right',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default SearchListItem;
