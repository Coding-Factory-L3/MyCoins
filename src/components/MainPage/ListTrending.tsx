import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAuth} from '../../contexts/AuthContext';
import {useTheme} from '../../hooks/useTheme';

interface MainItemBoxProps {
  item: MainItem;
  onPress?: () => void;
  isFavorite?: boolean;
}

interface MainItem {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  price_btc: number;
  data: {
    floor_price: number;
  };
}

const ListTrending: React.FC<MainItemBoxProps> = ({
  item,
  onPress,
}: MainItemBoxProps) => {
  const {currentTheme} = useTheme();
  const {authData, updateFavorite} = useAuth();

  const [isFavoriteState, setIsFavoriteState] = useState(false);

  useEffect(() => {
    if (
      authData &&
      authData.favorites &&
      authData.favorites.nfts &&
      authData.favorites.nfts.includes(item.id)
    ) {
      setIsFavoriteState(true);
    } else {
      setIsFavoriteState(false);
    }
  }, [authData, item.id]);

  const onFavoritePress = async (id: string) => {
    await updateFavorite({key: 'nfts', id, value: !isFavoriteState}).then(
      () => {
        setIsFavoriteState(!isFavoriteState);
      },
    );
  };

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
      <TouchableOpacity
        style={[
          styles.icon,
          {
            shadowColor: currentTheme.tertiary,
          },
        ]}
        onPress={async () => {
          await onFavoritePress(item.id);
        }}>
        <AntDesign
          name="heart"
          size={20}
          color={
            isFavoriteState
              ? currentTheme.favorite.active
              : currentTheme.favorite.inactive
          }
        />
      </TouchableOpacity>
      <Image source={{uri: item.thumb}} style={styles.image} />

      <View style={{padding: 10}}>
        <Text
          style={[styles.name, {color: currentTheme.textButton}]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.label, {color: currentTheme.textButton}]}>
          {item.symbol}
        </Text>
        <Text style={[styles.label, {color: currentTheme.textButton}]}>
          Price: {item.data.floor_price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 20,
    minWidth: 250,
    height: 200,
    borderRadius: 10,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '55%',
    resizeMode: 'cover',
    // marginRight: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    maxWidth: 225,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
});

export default ListTrending;
