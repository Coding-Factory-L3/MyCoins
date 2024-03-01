import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import theme from '../../../theme';
import {useTheme} from '../../hooks/useTheme';

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
  const {currentTheme} = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, {borderBottomColor: currentTheme.secondary}]}
      onPress={onPress}>
      {item.icon === 'missing_small.png' ? (
        <Image source={{uri: undefined}} style={styles.icon} />
      ) : (
        <Image source={{uri: item.icon}} style={styles.icon} />
      )}
      <View>
        <Text style={[styles.name, {color: currentTheme.text}]}>
          {item.name}
        </Text>
        <Text style={[styles.symbol, {color: currentTheme.text}]}>
          {item.symbol}
        </Text>
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
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  symbol: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textTransform: 'uppercase',
  },
});

export default NftListItem;
