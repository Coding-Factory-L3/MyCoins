import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Text} from 'react-native-elements';

interface ModalCoinContentProps {
  item: ModalContent;
}

export interface ModalContent {
  id: string;
  name: string;
  symbol: string;
  priceAugmented: number;
  pricePercentage: number;
  price: number;
  description: string;
  icon: string;
}

function ModalCoinContent({item}: ModalCoinContentProps): React.JSX.Element {
  const isPercentagePositive = item.pricePercentage > 0;
  const isPriceAugmentedPositive = item.priceAugmented > 0;
  const formattedPercentage = item.pricePercentage?.toFixed(2);
  const percentageText = isPercentagePositive
    ? `+${formattedPercentage}`
    : formattedPercentage;
  const formattedPriceAugmented = item.priceAugmented?.toFixed(4);
  const priceAugmentedText = isPriceAugmentedPositive
    ? `+${formattedPriceAugmented}`
    : formattedPriceAugmented;

  function truncateString(str: string, num: number) {
    if (str && num) {
      if (str.length <= num) {
        return str;
      }
      return str?.slice(0, num) + '...';
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.columnData}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.symbol}> | {item.symbol}</Text>
          </View>
          <Text style={styles.price}>{item.price} €</Text>
          <View style={styles.fluctuationPriceRow}>
            <Text
              style={[
                styles.pricePercentage,
                // eslint-disable-next-line react-native/no-inline-styles
                {color: isPercentagePositive ? '#2ecc71' : '#e74c3c'},
              ]}>
              {percentageText} %
            </Text>
            <Text style={styles.priceAugmented}>
              {priceAugmentedText} € (1J)
            </Text>
          </View>
        </View>
        <Image source={{uri: item.icon}} style={styles.image} />
      </View>
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.description}>
        {/* {truncateString(item?.description, 1000)} */}
        {item.description} fjqs jqksd fjqklsdj fqklsdj fqksdjf kqlsdjf qklsdjf mqksdjf qlskdjf qklsdj flqkdf jqskdjf qksdj fqksdjf qksdjf qskdfj qskdfj qksdjf qskdj fqskdjf qksdjf
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

export default ModalCoinContent;
