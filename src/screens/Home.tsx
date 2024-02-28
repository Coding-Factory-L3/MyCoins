import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import MainItemBox from '../components/MainPage/MainItemBox';
import {Text} from 'react-native-elements';
import ListNft from '../components/MainPage/ListNft';
import useModal from '../hooks/useModal';
import ModalCoinContent from '../components/MainPage/ModalCoinContent';
import ListTrending from '../components/ListTrending';

const Home: React.FC = () => {
  const {makeApiCall} = useAuth();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const {toggleModal, ModalWrapper, setModalData, modalData} = useModal();

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
            url: 'https://api.coingecko.com/api/v3/nfts/list?per_page=7&page=1',
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
              Trending
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
                  <MainItemBox
                    item={item}
                    onPress={() => {
                      getCoin({id: item.id});
                    }}
                  />
                );
              }}
            />
            <Text h3 style={styles.titre}>
              Popular Nft
            </Text>
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
});

export default Home;
