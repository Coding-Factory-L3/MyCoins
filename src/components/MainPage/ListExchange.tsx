import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAuth} from '../../contexts/AuthContext';
import {useTheme} from '../../hooks/useTheme';

interface MainItemBoxProps {
  item: MainItem;
  onPress?: () => void;
}

interface MainItem {
  id: string;
  name: string;
  symbol: string;
  image: string;
}

const ListExchange: React.FC<MainItemBoxProps> = ({
  item,
  onPress,
}: MainItemBoxProps) => {
  const {currentTheme} = useTheme();
  const {updateFavorite, authData} = useAuth();

  const [isFavoriteState, setIsFavoriteState] = useState(false);

  useEffect(() => {
    if (
      authData &&
      authData.favorites &&
      authData.favorites.exchanges &&
      authData.favorites.exchanges.includes(item.id)
    ) {
      setIsFavoriteState(true);
    } else {
      setIsFavoriteState(false);
    }
  }, [authData, item.id]);

  const onFavoritePress = async (id: string) => {
    await updateFavorite({key: 'exchanges', id, value: !isFavoriteState});
    setIsFavoriteState(!isFavoriteState);
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
        style={styles.icon}
        onPress={() => {
          onFavoritePress(item.id);
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
      <Image source={{uri: item.image}} style={styles.image} />
      <View>
        <Text style={[styles.name, {color: currentTheme.textButton}]}>
          {item.name}
        </Text>
        <Text style={[styles.label, {color: currentTheme.textButton}]}>
          {item.symbol}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginRight: 20,

    minWidth: 250,

    borderRadius: 10,
    padding: 10,
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
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    maxWidth: 115,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
});

export default ListExchange;
