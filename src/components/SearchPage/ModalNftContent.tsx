import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-elements';

interface ModalNftContentProps {
  item: ModalNftInterface;
}

export interface ModalNftInterface {
  id: string;
  name: string;
  symbol: string;
  description: string;
  icon: string;
}

function ModalNftContent({item}: ModalNftContentProps): React.JSX.Element {
  // function truncateString(str: string, num: number) {
  //   if (str.length <= num) {
  //     return str;
  //   }
  //   return str.slice(0, num) + '...';
  // }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.columnData}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.symbol}> | {item.symbol}</Text>
          </View>
        </View>
        <Image source={{uri: item.icon}} style={styles.image} />
      </View>
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.description}>
        {/* {truncateString(item.description, 1000)} */}
        {item.description}
      </Text>
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
    borderRadius: 40,
  },
  topRow: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnData: {
    flex: 1,
    flexDirection: 'column',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  price: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
  },
  fluctuationPriceRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  pricePercentage: {
    fontSize: 20,
  },
  priceAugmented: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default ModalNftContent;
