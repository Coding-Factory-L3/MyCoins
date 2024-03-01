import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
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
}

const ListAllExchange: React.FC<MainItemBoxProps> = ({
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
      authData.favorites.exchanges &&
      authData.favorites.exchanges.includes(item.id)
    ) {
      setIsFavoriteState(true);
    } else {
      setIsFavoriteState(false);
    }
  }, [authData, item.id]);

  const onFavoritePress = async (id: string) => {
    await updateFavorite({key: 'exchanges', id, value: !isFavoriteState}).then(
      () => {
        setIsFavoriteState(!isFavoriteState);
      },
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.primary,
          shadowColor: currentTheme.tertiary,
        },
      ]}>
      <Text
        style={[styles.name, {color: currentTheme.textButton}]}
        ellipsizeMode="tail"
        numberOfLines={1}>
        {item.name}
      </Text>
      <TouchableOpacity onPress={() => onFavoritePress(item.id)}>
        <AntDesign
          name="heart"
          size={24}
          color={
            isFavoriteState
              ? currentTheme.favorite.active
              : currentTheme.favorite.inactive
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    minWidth: 250,
    borderRadius: 10,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    maxWidth: 225,
  },
  symbol: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
    marginTop: 2,
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
});

export default ListAllExchange;
