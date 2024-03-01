import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import CustomTextInput from '../components/CustomTextInput';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../theme';
import CoinListItem, {Coin} from '../components/SearchPage/CoinListItem';
import useModal from '../hooks/useModal';
import ModalCoinContent, {
  ModalCoinInterface,
} from '../components/SearchPage/ModalCoinContent';
import ModalNftContent, {
  ModalNftInterface,
} from '../components/SearchPage/ModalNftContent';
import NftListItem, {Nft} from '../components/SearchPage/NftListItem';

function Search(): React.JSX.Element {
  const {makeApiCall} = useAuth();
  const [coinsData, setCoinsData] = useState([] as Coin[]);
  const [nftData, setNftData] = useState([] as Nft[]);
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [loadingNFTs, setLoadingNFTs] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const finalSearchValue = searchValue.toLowerCase();
  const {toggleModal, ModalWrapper, setModalData, modalData} = useModal();

  const getCoinsList = async () => {
    try {
      const response = await makeApiCall({
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en',
      });

      if (Array.isArray(response)) {
        const coins: Coin[] = response.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          icon: coin.image,
          symbol: coin.symbol,
          pricePercentage: coin.price_change_percentage_24h,
          price: coin.current_price,
        }));
        setCoinsData(coins);
        setLoadingCoins(false);
      } else {
        console.error('Response is not an array:', response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNftsList = async () => {
    try {
      const response = await makeApiCall({
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/nfts/list?order=market_cap_native_desc&per_page=20&page=1',
      });

      if (Array.isArray(response)) {
        const nftIds: string[] = response.map((nft: any) => nft.id);
        for (const id of nftIds) {
          await getNftData(id);
        }
        setLoadingNFTs(false);
      } else {
        console.error('Response is not an array:', response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNftData = useCallback(
    async (id: string) => {
      try {
        const response: any = await makeApiCall({
          method: 'GET',
          url: `https://api.coingecko.com/api/v3/nfts/${id}?`,
        });

        const nft: Nft = {
          id: response.id,
          name: response.name,
          description: response.description,
          icon: response.image.small,
          symbol: response.symbol,
        };
        setNftData(prevData => [...prevData, nft]);
      } catch (error) {
        console.error(error);
      }
    },
    [makeApiCall],
  );

  const getClickedCoinData = useCallback(
    async (id: string) => {
      try {
        const response: any = await makeApiCall({
          method: 'GET',
          url: `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`,
        });

        const coinData: ModalCoinInterface = {
          id: response.id,
          name: response.name,
          description: response.description.en,
          icon: response.image.large,
          symbol: response.symbol,
          priceAugmented: response.market_data.price_change_24h_in_currency.eur,
          pricePercentage: response.market_data.price_change_percentage_24h,
          price: response.market_data.current_price.eur,
        };
        setModalData(coinData);
        toggleModal();
      } catch (error) {
        console.error(error);
      }
    },
    [makeApiCall, toggleModal, setModalData],
  );

  const getClickedNftData = useCallback(
    async (id: string) => {
      try {
        const response: any = await makeApiCall({
          method: 'GET',
          url: `https://api.coingecko.com/api/v3/nfts/${id}?`,
        });

        const nftDatas: ModalNftInterface = {
          id: response.id,
          name: response.name,
          description: response.description,
          icon: response.image.small,
          symbol: response.symbol,
        };
        setModalData(nftDatas);
        toggleModal();
      } catch (error) {
        console.error(error);
      }
    },
    [makeApiCall, toggleModal, setModalData],
  );

  const filteredNftList = useMemo(() => {
    return nftData.filter(
      item =>
        item.name.toLowerCase().includes(finalSearchValue) ||
        item.symbol.toLowerCase().includes(finalSearchValue),
    );
  }, [nftData, finalSearchValue]);

  const filteredTodoList = useMemo(() => {
    return coinsData.filter(
      item =>
        item.name.toLowerCase().includes(finalSearchValue) ||
        item.symbol.toLowerCase().includes(finalSearchValue),
    );
  }, [coinsData, finalSearchValue]);

  useEffect(() => {
    getCoinsList();
    getNftsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchInput}>
        <CustomTextInput
          autoComplete="off"
          placeholder="Search coins, nfts..."
          value={searchValue}
          onChangeText={setSearchValue}
          leftIcon={
            <Feather
              name="search"
              size={24}
              color={theme.colors.light.primary}
            />
          }
        />
        {loadingCoins || loadingNFTs ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <ScrollView nestedScrollEnabled={true}>
              <View>
                <Text style={styles.listTitle}>NFTs :</Text>
                <FlatList
                  data={filteredNftList}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <NftListItem
                      item={item}
                      onPress={() => {
                        getClickedNftData(item.id);
                      }}
                    />
                  )}
                />
              </View>
              <View>
                <Text style={styles.listTitle}>Cryptos :</Text>
                <FlatList
                  data={filteredTodoList}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <CoinListItem
                      item={item}
                      onPress={() => {
                        getClickedCoinData(item.id);
                      }}
                    />
                  )}
                />
              </View>
            </ScrollView>
            <ModalWrapper>
              {modalData.price === undefined ? (
                <ModalNftContent item={modalData} />
              ) : (
                <ModalCoinContent item={modalData} />
              )}
            </ModalWrapper>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  searchInput: {
    width: '90%',
  },
  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default Search;
