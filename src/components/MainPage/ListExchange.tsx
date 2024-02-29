import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';

interface MainItemBoxProps {
  item: MainItem;
  onFavoritePress: (id: string) => void;
}

interface MainItem {
  id: string;
  name: string;
  symbol: string;
  image: string;
}

const ListExchange: React.FC<MainItemBoxProps> = ({
  item,
  onFavoritePress,
}: MainItemBoxProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <Image source={{uri: item.image}} style={styles.image} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 200,
    marginRight: 20,
    alignItems: 'center',
    backgroundColor: '#213056',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff',
  },
  symbol: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },

  id: {
    fontSize: 12,
    color: '#ffffff',
  },
});

export default ListExchange;
