import React from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {Text} from 'react-native-elements';

interface MainItemBoxProps {
  item: MainItem;
}

interface MainItem {
  name: string;
  symbol: string;
  price_btc: string;
  image: string;
  content: {
    title: string;
    description: string;
  };
}

const MainItemBox: React.FC<MainItemBoxProps> = ({item}: MainItemBoxProps) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text style={styles.price}>{item.price_btc}</Text>
          <Text style={styles.title}>{item.content.title}</Text>
          <Text style={styles.description}>{item.content.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  symbol: {
    fontSize: 16,
    color: '#555555',
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
    color: '#333333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666666',
  },
});

export default MainItemBox;
