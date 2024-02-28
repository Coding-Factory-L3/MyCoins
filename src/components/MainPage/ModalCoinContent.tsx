import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-elements';

type ModalCoinContentProps = {
  item: itemContent;
};

type itemContent = {
  description: {
    en: string;
  };
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
  };
};

function ModalCoinContent({item}: ModalCoinContentProps): React.JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: item.image.large}} style={styles.image} />
      <View style={styles.content}>
        <Text>Id: {item.id}</Text>
        <Text>Name: {item.name}</Text>
        <Text>Symbol: {item.symbol}</Text>
        <Text>Description: {item.description.en}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  content: {
    flexGrow: 1,
  },
});

export default ModalCoinContent;
