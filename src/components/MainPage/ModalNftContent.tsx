/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-elements';
import {formatPrice} from '../../utils/utils';

interface ModalContentProps {
  item: ModalNftContentProps;
}

export interface ModalNftContentProps {
  description: string;
  id: string;
  name: string;
  symbol: string;
  image: {
    large?: string;
    small?: string;
  };
  price: number;
  // currency: string;
}

function ModalNftContent({item}: ModalContentProps): React.JSX.Element {
  const formatDescription = (description: string) => {
    // remove html tags from description
    return description.replace(/<\/?[^>]+(>|$)/g, '');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.columnData}>
          <View
            style={[
              styles.nameRow,
              {
                flexDirection: item.name.length >= 10 ? 'column' : 'row',
                alignItems: item.name.length >= 10 ? 'flex-start' : 'center',
              },
            ]}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <Text style={styles.price}>{formatPrice(item.price, 'US')}</Text>
        </View>
        <Image source={{uri: item.image.small}} style={styles.image} />
      </View>
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.description}>
        {formatDescription(item?.description)}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 15,
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
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  symbol: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: 'Poppins-Regular',
  },
  descriptionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 30,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
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
