/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../hooks/useTheme';
import {Text} from 'react-native-elements';
import SearchListItem from '../components/SearchPage/CoinListItem';
import FavoriteItem from '../components/FavoritesPage/FavoriteItem';

const types = ['nfts', 'coins', 'exchanges'];

const Favorites: React.FC = () => {
  const {authData, makeApiCall} = useAuth();
  const [type, setType] = useState('nfts');
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const {currentTheme} = useTheme();
  useEffect(() => {
    (async () => {
      if (
        !authData ||
        !authData.favorites ||
        !authData.favorites[type as 'coins' | 'nfts' | 'exchanges'] ||
        authData.favorites[type as 'coins' | 'nfts' | 'exchanges']?.length === 0
      ) {
        return;
      } else {
        setLoading(true);
        const ids = authData.favorites[
          type as 'coins' | 'nfts' | 'exchanges'
        ] as string[];
        const promises = ids.map(async (id: string) => {
          const response = await makeApiCall({
            method: 'GET',
            url: `https://api.coingecko.com/api/v3/${type}/${id}?`,
          });

          return response;
        });

        try {
          const _favorites = await Promise.all(promises);
          setFavorites(_favorites);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching favorites:', error);
          setLoading(false);
        }
      }
    })();
  }, [type, authData, makeApiCall]);

  return (
    <View
      style={[styles.container, {backgroundColor: currentTheme.background}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {types.map((t, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setType(t)}
            style={[
              styles.flag,
              {
                backgroundColor:
                  type === t
                    ? currentTheme.flag.background
                    : currentTheme.flag.selectedBackground,
                borderColor: currentTheme.flag.selectedText,
                borderWidth: type !== t ? 2 : 0,
              },
            ]}>
            <Text
              style={[
                styles.flagText,
                {
                  color:
                    type === t
                      ? currentTheme.flag.text
                      : currentTheme.flag.selectedText,
                },
              ]}>
              {t === 'coins' ? 'crypto' : t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={currentTheme.text}
            style={{marginTop: 20}}
          />
        ) : (
          <View>
            <FlatList
              contentContainerStyle={{paddingBottom: 150}}
              showsVerticalScrollIndicator={false}
              data={favorites}
              keyExtractor={item => item?.id}
              renderItem={({item}) => (
                <FavoriteItem
                  id={item.id}
                  image={item?.image?.small || item?.image}
                  name={item?.name}
                  type={type}
                  key={item.id}
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  flag: {
    padding: 5,
    margin: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  flagText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default Favorites;
