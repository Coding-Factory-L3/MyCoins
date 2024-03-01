import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {useAuth} from '../../contexts/AuthContext';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  id: string;
  name: string;
  image: string;
  type: string;
};

function FavoriteItem({id, name, image, type}: Props): React.JSX.Element {
  const {currentTheme} = useTheme();
  const {updateFavorite} = useAuth();

  const handleDelete = useCallback(() => {
    updateFavorite({
      key: type,
      id,
      value: false,
    });
  }, [id, type, updateFavorite]);

  return (
    <View
      key={id}
      style={[
        styles.container,
        {
          backgroundColor: currentTheme.primary,
          shadowColor: currentTheme.tertiary,
        },
      ]}>
      <View style={styles.wrapper}>
        <Image source={{uri: image}} style={styles.image} />
        <Text
          style={[styles.text, {color: currentTheme.textButton}]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleDelete();
        }}>
        <Feather name="trash" size={24} color={currentTheme.switch} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
    maxWidth: 250,
  },
});

export default FavoriteItem;
