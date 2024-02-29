import React, {useMemo, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import {useTheme} from '../../hooks/useTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAuth} from '../../contexts/AuthContext';

interface MainItemBoxProps {
  item: MainItem;
}

interface MainItem {
  id: string;
  name: string;
  symbol: string;
  image: string;
}

const ListExchange: React.FC<MainItemBoxProps> = ({item}: MainItemBoxProps) => {
  const {currentTheme} = useTheme();
  const {updateFavorite, authData} = useAuth();

  const isItemInFavorites = useMemo(() => {
    return authData?.favorites?.exchanges?.includes(item.id);
  }, [authData?.favorites?.exchanges, item.id]);

  const [isFavoriteState, setIsFavoriteState] = useState(isItemInFavorites);

  const onFavoritePress = async (id: string) => {
    await updateFavorite({key: 'exchanges', id, value: !isFavoriteState});
    setIsFavoriteState(!isFavoriteState);
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.primary,
          shadowColor: currentTheme.tertiary,
        },
      ]}>
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
    </View>
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
