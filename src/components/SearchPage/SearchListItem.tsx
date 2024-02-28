import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Image, Text} from 'react-native-elements';

interface SearchListItemProps {
  item: Coin;
}

export interface Coin {
  name: string;
  icon: string;
  symbol: string;
  pricePercentage: number;
  price: number;
}

function SearchListItem({item}: SearchListItemProps): React.JSX.Element {
  const isPositive = item.pricePercentage > 0;
  const formattedPercentage = item.pricePercentage.toFixed(2);
  const percentageText = isPositive
    ? `+${formattedPercentage}`
    : formattedPercentage;

  return (
    <View style={styles.container}>
      <Image source={{uri: item.icon}} style={styles.icon} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.symbol}>{item.symbol}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.percentage}>{percentageText} %</Text>
        <Text style={styles.price}>{item.price.toFixed(2)} €</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
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
