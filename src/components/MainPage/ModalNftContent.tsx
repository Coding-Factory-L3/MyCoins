import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-elements';

type ModalNftContentProps = {
  item: itemContent;
};

type itemContent = {
  description: string;
  id: string;
  name: string;
  symbol: string;
  image: {
    small: string;
  };
};

function ModalNftContent({item}: ModalNftContentProps): React.JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <Image source={{uri: item.image.small}} style={styles.image} />
        <View style={styles.columnData}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.symbol}> | {item.symbol}</Text>
          <Text>ID: {item.id}</Text>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>
            {truncateString(item.description, 1000)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function truncateString(str: string, num: number) {
  if (str && num) {
    if (str.length <= num) {
      return str;
    }
    return str?.slice(0, num) + '...';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
    borderRadius: 40,
  },
  columnData: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  symbol: {
    fontSize: 22,
    textTransform: 'uppercase',
  },
  descriptionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default ModalNftContent;
