import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-elements';
import CustomButton from '../components/CustomButton';
import ListTrending from '../components/ListTrending';
import ListNft from '../components/MainPage/ListNft';
import MainItemBox from '../components/MainPage/MainItemBox';
import ModalCoinContent, {
  ModalContent,
} from '../components/MainPage/ModalCoinContent';
import {useAuth} from '../contexts/AuthContext';
import useModal from '../hooks/useModal';
import {useTheme} from '../hooks/useTheme';
import ListPopularNft from '../components/MainPage/ListPopularNft';

const Home: React.FC = () => {
  const {makeApiCall} = useAuth();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const {toggleModal, ModalWrapper, setModalData, modalData} = useModal();
  const {logout} = useAuth();
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

          console.log(res[2]);
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const getCoin = useCallback(
  //   async (id: string) => {
  //     try {
  //       const response = await makeApiCall({
  //         method: 'GET',
  //         url: `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`,
  //       });

  //       const coinData: ModalContent = {
  //         id: response.id,
  //         name: response.name,
  //         description: response.description.en,
  //         icon: response.image.large,
  //         symbol: response.symbol,
  //         priceAugmented: response.market_data.price_change_24h_in_currency.eur,
  //         pricePercentage: response.market_data.price_change_percentage_24h,
  //         price: response.market_data.current_price.eur,
  //       };
  //       // console.log(response.market_data.current_price.eur);
  //       setModalData(coinData);
  //       toggleModal();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   [makeApiCall, toggleModal, setModalData],
  // );

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

  return (
    <View style={styles.container}>
      <Text h1 style={styles.titre}>
        Marketplace
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <ScrollView>
            <Text h3 style={styles.titre}>
              Popular Nft
            </Text>
            <FlatList
              style={styles.list}
              horizontal={true}
              data={data.trending}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}) => {
                return <ListTrending item={item} />;
              }}
            />
            <Text h3 style={styles.titre}>
              Popular Coins
            </Text>
            <FlatList
              style={styles.list}
              horizontal={true}
              data={data.crypto}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}) => {
                return (
                  <ListPopularNft
                    item={item}
                    onPress={() => {
                      getCoin({id: item.id});
                    }}
                  />
                );
              }}
            />
            <View style={styles.row}>
              <Text h3 style={styles.titre}>
                Exchanges
              </Text>
              <CustomButton
                title="Voir tout"
                onPress={() => {
                  console.log('voir tout');
                }}
              />
            </View>

            <FlatList
              style={styles.list}
              horizontal={true}
              data={data.nft}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}) => {
                return <ListNft item={item} />;
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
    backgroundColor: '#20243F',
  },
  list: {
    paddingLeft: 10,
  },
  titre: {
    color: '#ffffff',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
  },
});

export default Home;
