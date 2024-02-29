import React, {useMemo, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {useTheme} from '../../hooks/useTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAuth} from '../../contexts/AuthContext';

interface MainItemBoxProps {
  item: MainItem;
  onPress?: () => void;
}

interface MainItem {
  image: string | undefined;
  id: string;
  name: string;
  symbol: string;
}

const ListPopularCoin: React.FC<MainItemBoxProps> = ({
  item,
  onPress,
}: MainItemBoxProps) => {
  const {currentTheme} = useTheme();
  const {updateFavorite, authData} = useAuth();

  const isItemInFavorites = useMemo(() => {
    return authData?.favorites?.coins?.includes(item.id);
  }, [authData?.favorites?.coins, item.id]);

  const [isFavoriteState, setIsFavoriteState] = useState(isItemInFavorites);

  const onFavoritePress = async (id: string) => {
    await updateFavorite({key: 'coins', id, value: !isFavoriteState});
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
      <View style={styles.details}>
        <Text
          style={[styles.name, {color: currentTheme.textButton}]}
          ellipsizeMode="tail"
          numberOfLines={1}>
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
  container: {
    flex: 1,
  },
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
    width: 70,
    height: 70,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 10,
  },
  details: {
    flex: 1,
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

export default ListPopularCoin;
