/* eslint-disable react-native/no-inline-styles */
import Fuse from 'fuse.js';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CustomTextInput from '../components/CustomTextInput';
import CoinListItem, {Coin} from '../components/SearchPage/CoinListItem';
import ExchangeListItem, {
  Exchange,
} from '../components/SearchPage/ExchangeListItem';
import ModalCoinContent, {
  ModalCoinInterface,
} from '../components/SearchPage/ModalCoinContent';
import ModalExchangeContent, {
  ModalExchangeInterface,
} from '../components/SearchPage/ModalExchangeContent';
import ModalNftContent, {
  ModalNftInterface,
} from '../components/SearchPage/ModalNftContent';
import NftListItem, {Nft} from '../components/SearchPage/NftListItem';
import {useAuth} from '../contexts/AuthContext';
import useLocation from '../hooks/useLocation';
import useModal from '../hooks/useModal';
import {useTheme} from '../hooks/useTheme';

const fuseOptions = {
  keys: ['name', 'symbol'], // specify the fields you want to search in
  threshold: 0.3,
};

const types = [
  {value: 'nfts', label: 'NFTs'},
  {value: 'coins', label: 'Crypto'},
  {value: 'exchanges', label: 'Platforms'},
];

function Search(): React.JSX.Element {
  const {makeApiCall} = useAuth();
  const [loading, setLoading] = useState(true);
  const [changingType, setChangingType] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [coinModalData, setCoinModalData] = useState({} as ModalCoinInterface);
  const [nftModalData, setNftModalData] = useState({} as ModalNftInterface);
  const [exchangeModalData, setExchangeModalData] = useState(
    {} as ModalExchangeInterface,
  );
  const [data, setData] = useState({} as any);

  const [isModalCoinVisible, setIsModalCoinVisible] = useState(false);
  const [isModalNftVisible, setIsModalNftVisible] = useState(false);
  const [isModalExchangeVisible, setIsModalExchangeVisible] = useState(false);

  const [type, setType] = useState('nfts');
  const {ModalComponent} = useModal();
  const {currentLocation} = useLocation();
  const {currentTheme} = useTheme();

  const getCoinsList = async () => {
    try {
      const response = await makeApiCall({
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${
          currentLocation?.code || 'usd'
        }&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en`,
      });

      if (Array.isArray(response)) {
        const coins: Coin[] = response.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          icon: coin.image,
          symbol: coin.symbol,
          pricePercentage: coin.price_change_percentage_24h,
          price: coin.current_price,
          currency: currentLocation.symbol,
        }));

        return coins;
      } else {
        console.error('Response is not an array:', response);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          priceAugmented:
            response.market_data.price_change_24h_in_currency[
              currentLocation?.code
            ],
          pricePercentage: response.market_data.price_change_percentage_24h,
          price: response.market_data.current_price[currentLocation?.code],
          currency: currentLocation.symbol,
        };

        setCoinModalData(coinData);
        setIsModalCoinVisible(true);
      } catch (error) {
        console.error(error);
      }
    },
    [makeApiCall, currentLocation?.code, currentLocation?.symbol],
  );

  const getNftsList = async () => {
    try {
      const response = await makeApiCall({
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/nfts/list?order=market_cap_native_desc&per_page=5&page=1',
      });

      if (Array.isArray(response)) {
        const nftIds: string[] = response.map((nft: any) => nft.id);
        const nfts = await Promise.all(nftIds.map(getNftData));
        return nfts;
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

        return nft;
      } catch (error) {
        console.error(error);
      }
    },
    [makeApiCall],
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

        setNftModalData(nftDatas);
        setIsModalNftVisible(true);
      } catch (error) {
        console.error(error);
      }
    },
    [makeApiCall],
  );

  const getExchangesList = async () => {
    try {
      const response = await makeApiCall({
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/exchanges?per_page=100&page=1',
      });

      if (Array.isArray(response)) {
        const exchanges: Exchange[] = response.map((exchange: any) => ({
          id: exchange.id,
          name: exchange.name,
          description: exchange.description,
          icon: exchange.image,
          year: exchange.year_established,
          country: exchange.country,
          url: exchange.url,
          tradeVolume: exchange.trade_volume_24h_btc,
        }));
        return exchanges;
      } else {
        console.error('Response is not an array:', response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const getClickedExchangeData = useCallback(
  //   async (id: string) => {
  //     try {
  //       const response: any = await makeApiCall({
  //         method: 'GET',
  //         url: `https://api.coingecko.com/api/v3/nfts/${id}?`,
  //       });

  //       const exchangeDatas: ModalExchangeInterface = {
  //         id: response.id,
  //         name: response.name,
  //         description: response.description,
  //         icon: response.image,
  //         year: response.year_established,
  //         country: response.country,
  //         url: response.url,
  //         tradeVolume: response.trade_volume_24h_btc,
  //       };

  //       // setExchangeModalData(exchangeDatas);
  //       // setIsModalExchangeVisible(true);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   [makeApiCall],
  // );

  const filteredData = useMemo(() => {
    const fuse = new Fuse(data[type], fuseOptions);
    if (searchValue) {
      return fuse.search(searchValue).map(result => result.item);
    }

    return data[type];
  }, [searchValue, type, data]);

  useEffect(() => {
    (async () => {
      if (!currentLocation) return;
      await Promise.all([
        getNftsList(),
        getCoinsList(),
        getExchangesList(),
      ]).then((res: any) => {
        setData({
          nfts: res[0],
          coins: res[1],
          exchanges: res[2],
        });

        setLoading(false);
      });
    })();
  }, [currentLocation]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentTheme.background,
        },
      ]}>
      <View style={styles.searchInput}>
        <CustomTextInput
          autoComplete="off"
          placeholder={`Search ${types.find(t => t.value === type)?.label}`}
          value={searchValue}
          onChangeText={setSearchValue}
          leftIcon={
            <Feather name="search" size={24} color={currentTheme.text} />
          }
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {types.map((t, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setChangingType(true);
                setType(t.value);
                setTimeout(() => {
                  setChangingType(false);
                }, 1000);
              }}
              style={[
                styles.flag,
                {
                  backgroundColor:
                    type === t.value
                      ? currentTheme.flag.background
                      : currentTheme.flag.selectedBackground,
                  borderColor: currentTheme.flag.selectedText,
                  borderWidth: type !== t.value ? 2 : 0,
                },
              ]}>
              <Text
                style={[
                  styles.flagText,
                  {
                    color:
                      type === t.value
                        ? currentTheme.flag.text
                        : currentTheme.flag.selectedText,
                  },
                ]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {loading || changingType ? (
          <ActivityIndicator size="large" color={currentTheme.text} />
        ) : (
          <>
            <FlatList
              data={filteredData}
              contentContainerStyle={{paddingBottom: 200}}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                if (type === 'coins') {
                  return (
                    <CoinListItem
                      item={item}
                      onPress={() => {
                        getClickedCoinData(item.id);
                      }}
                    />
                  );
                } else if (type === 'nfts') {
                  return (
                    <NftListItem
                      item={item}
                      onPress={() => {
                        getClickedNftData(item.id);
                      }}
                    />
                  );
                } else if (type === 'exchanges') {
                  return (
                    <ExchangeListItem
                      item={item}
                      onPress={() => {
                        // getClickedExchangeData(item.id);
                      }}
                    />
                  );
                } else {
                  // Retourner un élément par défaut ou null si type n'est pas reconnu
                  return <></>;
                }
              }}
            />
            <ModalComponent
              isVisible={isModalCoinVisible}
              closeModal={() => setIsModalCoinVisible(false)}>
              <ModalCoinContent item={coinModalData} />
            </ModalComponent>
            <ModalComponent
              isVisible={isModalNftVisible}
              closeModal={() => setIsModalNftVisible(false)}>
              <ModalNftContent item={nftModalData} />
            </ModalComponent>
            {/* <ModalComponent
              isVisible={isModalExchangeVisible}
              closeModal={() => setIsModalExchangeVisible(false)}>
              <ModalExchangeContent item={exchangeModalData} />
            </ModalComponent> */}
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

export default Search;
