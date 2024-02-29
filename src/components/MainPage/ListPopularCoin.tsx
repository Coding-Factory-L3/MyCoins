import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {useTheme} from '../../hooks/useTheme';
import Feather from 'react-native-vector-icons/Feather';

interface MainItemBoxProps {
  item: MainItem;
  onPress?: () => void;
  onFavoritePress: (id: string) => void;
}

interface MainItem {
  image: string | undefined;
  id: string;
  name: string;
  symbol: string;
}

const ListPopularCoin: React.FC<MainItemBoxProps> = ({
  item,
  onPress,
  onFavoritePress,
}: MainItemBoxProps) => {
  const {currentTheme} = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.primary,
          shadowColor: currentTheme.tertiary,
        },
      ]}
      onPress={onPress}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Feather
          name="heart"
          size={24}
          color="#ffffff"
          onPress={() => {
            onFavoritePress(item.id);
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    height: 200,
    marginRight: 20,
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff',
  },
  symbol: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666666',
  },
  id: {
    fontSize: 12,
    color: '#ffffff',
  },
});

export default ListPopularCoin;
