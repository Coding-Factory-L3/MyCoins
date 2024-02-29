import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import ListPopularCoin from '../components/MainPage/ListPopularCoin';
import {Button, Text} from 'react-native-elements';
import ListExchange from '../components/MainPage/ListExchange';
import useModal from '../hooks/useModal';
import ModalCoinContent from '../components/MainPage/ModalCoinContent';
import ListTrending from '../components/MainPage/ListTrending';
import CustomButton from '../components/CustomButton';
import {useTheme} from '../hooks/useTheme';

const Home: React.FC = () => {
  const {makeApiCall} = useAuth();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const {toggleModal, ModalWrapper, setModalData, modalData} = useModal();
  const {currentTheme} = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiCalls = [
          makeApiCall({
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=7&page=1&sparkline=false&locale=fr',
          }),
          makeApiCall({
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/exchanges?per_page=7',
          }),
          makeApiCall({
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/search/trending?',
          }),
        ];

        await Promise.all(apiCalls).then(res => {
          setData({crypto: res[0], nft: res[1], trending: res[2].nfts});
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCoin = useCallback(async ({id}: {id: string}) => {
    try {
      await Promise.all([
        makeApiCall({
          method: 'GET',
          url: `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=true`,
        }),
      ]).then(res => {
        setModalData(res[0]);
        toggleModal();
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getNft = useCallback(async ({id}: {id: string}) => {
    try {
      await Promise.all([
        makeApiCall({
          method: 'GET',
          url: `https://api.coingecko.com/api/v3/nfts/${id}?`,
        }),
      ]).then(res => {
        setModalData(res[0]);
        toggleModal();
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onFavoritePress = (id: string) => {
    console.log('ID de la carte:', id);
  };

  return (
    <View
      style={{...styles.container, backgroundColor: currentTheme.background}}>
      <Text h1 style={{...styles.titre, color: currentTheme.text}}>
        Marketplace
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <ScrollView>
            <View style={styles.row}>
              <Text h3 style={{...styles.titre, color: currentTheme.text}}>
                Popular NFT
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => console.log('See All')}
                  style={{color: currentTheme.text, margin: 10}}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.list}
              horizontal={true}
              data={data.trending}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}) => {
                return (
                  <ListTrending
                    item={item}
                    onPress={() => {
                      getNft({id: item.id});
                    }}
                    onFavoritePress={onFavoritePress}
                  />
                );
              }}
            />

            <View style={styles.row}>
              <Text h3 style={{...styles.titre, color: currentTheme.text}}>
                Popular coins
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => console.log('See All')}
                  style={{color: currentTheme.text, margin: 10}}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.list}
              horizontal={true}
              data={data.crypto}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}) => {
                return (
                  <ListPopularCoin
                    item={item}
                    onPress={() => {
                      getCoin({id: item.id});
                    }}
                    onFavoritePress={onFavoritePress}
                  />
                );
              }}
            />

            <View style={styles.row}>
              <Text h3 style={{...styles.titre, color: currentTheme.text}}>
                Exchanges
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => console.log('See All')}
                  style={{color: currentTheme.text, margin: 10}}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.list}
              horizontal={true}
              data={data.nft}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}) => {
                return (
                  <ListExchange item={item} onFavoritePress={onFavoritePress} />
                );
              }}
            />
          </ScrollView>
          <ModalWrapper>
            <ModalCoinContent item={modalData} />
          </ModalWrapper>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingLeft: 10,
  },
  titre: {
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Home;
