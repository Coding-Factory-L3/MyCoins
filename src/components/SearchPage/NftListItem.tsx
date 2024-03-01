import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import theme from '../../../theme';

interface SearchListItemProps {
  item: Nft;
  onPress: () => void;
}

export interface Nft {
  id: string;
  name: string;
  description: string;
  icon: string;
  symbol: string;
}

function NftListItem({item, onPress}: SearchListItemProps): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {item.icon === 'missing_small.png' ? (
        <Image source={{uri: undefined}} style={styles.icon} />
      ) : (
        <Image source={{uri: item.icon}} style={styles.icon} />
      )}
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.symbol}>{item.symbol}</Text>
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

export default NftListItem;
