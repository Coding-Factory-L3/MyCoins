/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import ListExchange from '../components/MainPage/ListExchange';
import ListPopularCoin from '../components/MainPage/ListPopularCoin';
import ListTrending from '../components/MainPage/ListTrending';
import ModalCoinContent, {
  ModalContent,
} from '../components/MainPage/ModalCoinContent';

import {useAuth} from '../contexts/AuthContext';
import useLocation from '../hooks/useLocation';
import useModal from '../hooks/useModal';
import {useTheme} from '../hooks/useTheme';
import ModalNftContent, {
  ModalNftContentProps,
} from '../components/MainPage/ModalNftContent';

const Home: React.FC = ({navigation}: any) => {
  const {makeApiCall, logout} = useAuth();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const {ModalComponent} = useModal();
  const {currentTheme} = useTheme();
  const {currentLocation} = useLocation();

  const [isNftModal, setIsNftModal] = useState(false);
  const [isCoinModal, setIsCoinModal] = useState(false);
  const [isExchangeModal, setIsExchangeModal] = useState(false);

  const [nftModalData, setNftModalData] = useState<ModalNftContentProps | any>(
    {},
  );
  const [coinModalData, setCoinModalData] = useState<ModalContent | any>({});

  const [exchangeModalData, setExchangeModalData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiCalls = [
          makeApiCall({
            method: 'GET',
            url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${
              currentLocation?.code || 'usd'
            }&order=market_cap_desc&per_page=7&page=1&sparkline=false&locale=fr`,
          }),
          makeApiCall({
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/exchanges?per_page=7',
          }),
          makeApiCall({
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/search/trending?',
          }),
          // makeApiCall({
          //   method: 'GET',
          //   url: 'https://api.coingecko.com/api/v3/nfts/list?per_page=100&page=1',
          // }),
        ];

        await Promise.all(apiCalls).then((res: any) => {
          setData({
            coin: res[0],
            exchange: res[1],
            trendingNfts: res[2].nfts,
          });
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
            currency: currentLocation?.symbol || '$',
            priceAugmented:
              response?.market_data.price_change_24h_in_currency[
                currentLocation?.code || 'usd'
              ],
            pricePercentage: response?.market_data.price_change_percentage_24h,
            price:
              response?.market_data.current_price[
                currentLocation?.code || 'usd'
              ],
          };

          setCoinModalData(coinData);
          setIsCoinModal(true);
        });
      } catch (error) {
        console.error(error);
      }
    },
    [makeApiCall, currentLocation],
  );

  const getNft = useCallback(async ({id}: {id: string}) => {
    try {
      await Promise.all([
        makeApiCall({
          method: 'GET',
          url: `https://api.coingecko.com/api/v3/nfts/${id}?`,
        }),
      ]).then((res: any) => {
        const response = res[0];

        const nftData: ModalNftContentProps = {
          id: response?.id,
          name: response?.name,
          description: response?.description,
          image: {
            large: response?.image?.large,
            small: response?.image.small,
          },
          symbol: response?.symbol,
          price: response?.floor_price[currentLocation?.code || 'usd'],
          currency: currentLocation?.symbol || '$',
        };

        setNftModalData(nftData);
        setIsNftModal(true);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getExchange = useCallback(async ({id}: {id: string}) => {
    try {
      await Promise.all([
        makeApiCall({
          method: 'GET',
          url: `https://api.coingecko.com/api/v3/exchanges/${id}?`,
        }),
      ]).then((res: any) => {
        setExchangeModalData(res[0]);
        setIsExchangeModal(true);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <View
      style={{...styles.container, backgroundColor: currentTheme.background}}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerRow}>
          <Feather name="home" size={24} color={currentTheme.switch} />
          <Text style={{...styles.titre, color: currentTheme.text}}>
            Marketplace
          </Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <Feather name="log-out" size={24} color={currentTheme.switch} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={currentTheme.primary} />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}>
            <View style={styles.row}>
              <Text style={{...styles.titre, color: currentTheme.text}}>
                Trending NFTs
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AllNft', {data: data.nfts})
                }>
                <Text style={{color: currentTheme.text, margin: 10}}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={data.trendingNfts}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}) => {
                return (
                  <ListTrending
                    item={item}
                    onPress={() => {
                      getNft({id: item.id});
                    }}
                  />
                );
              }}
            />

            <View style={styles.row}>
              <Text style={{...styles.titre, color: currentTheme.text}}>
                Top 7 coins
              </Text>
              <TouchableOpacity>
                <Text style={{color: currentTheme.text, margin: 10}}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={data.coin}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}) => {
                return (
                  <ListPopularCoin
                    item={item}
                    onPress={() => {
                      getCoin({id: item.id});
                    }}
                  />
                );
              }}
            />

            <View style={styles.row}>
              <Text style={{...styles.titre, color: currentTheme.text}}>
                Trading platforms
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AllExchange', {data: data.nfts})
                }>
                <Text style={{color: currentTheme.text, margin: 10}}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={data.exchange}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}) => {
                return (
                  <ListExchange
                    onPress={() => {
                      getExchange({id: item.id});
                    }}
                    item={item}
                  />
                );
              }}
            />
          </ScrollView>

          <ModalComponent
            isVisible={isCoinModal}
            closeModal={() => setIsCoinModal(false)}>
            <ModalCoinContent item={coinModalData} />
          </ModalComponent>
          <ModalComponent
            isVisible={isNftModal}
            closeModal={() => setIsNftModal(false)}>
            <ModalNftContent item={nftModalData} />
          </ModalComponent>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 10,
    columnGap: 10,
  },
  titre: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
});

export default Home;
