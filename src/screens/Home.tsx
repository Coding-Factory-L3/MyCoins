import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import ListPopularCoin from '../components/MainPage/ListPopularCoin';
import {Text} from 'react-native-elements';
import ListExchange from '../components/MainPage/ListExchange';
import useModal from '../hooks/useModal';
import ModalCoinContent from '../components/MainPage/ModalCoinContent';
import ListTrending from '../components/MainPage/ListTrending';
import {useTheme} from '../hooks/useTheme';
import {ModalContent} from '../components/MainPage/ModalCoinContent';
import Feather from 'react-native-vector-icons/Feather';

const Home: React.FC = () => {
  const {makeApiCall} = useAuth();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const {toggleModal, ModalWrapper, setModalData, modalData} = useModal();
  const {currentTheme, toggleTheme} = useTheme();

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

  const getCoin = useCallback(
    async ({id}: {id: string}) => {
      try {
        await Promise.all([
          makeApiCall({
            method: 'GET',
            url: `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`,
          }),
        ]).then((res: any) => {
          const response = res[0];
          const coinData: ModalContent = {
            id: response?.id,
            name: response?.name,
            description: response?.description.en,
            icon: response?.image.large,
            symbol: response?.symbol,
            priceAugmented:
              response?.market_data.price_change_24h_in_currency.eur,
            pricePercentage: response?.market_data.price_change_percentage_24h,
            price: response?.market_data.current_price.eur,
          };

          setModalData(coinData);
          toggleModal();
        });
      } catch (error) {
        console.error(error);
      }
    },
    [makeApiCall, toggleModal, setModalData],
  );

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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Feather name="home" size={25} color={currentTheme.switch} />
          <Text
            style={{...styles.titre, color: currentTheme.text, fontSize: 26}}>
            Marketplace
          </Text>
        </View>
        <TouchableOpacity>
          <Feather
            name="sun"
            size={25}
            color={currentTheme.switch}
            onPress={toggleTheme}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}>
            <View style={styles.row}>
              <Text style={{...styles.titre, color: currentTheme.text}}>
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
              <Text style={{...styles.titre, color: currentTheme.text}}>
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
              <Text style={{...styles.titre, color: currentTheme.text}}>
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
    paddingHorizontal: 10,
  },

  titre: {
    margin: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Home;
