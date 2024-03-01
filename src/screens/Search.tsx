import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import CustomTextInput from '../components/CustomTextInput';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../theme';
import SearchListItem, {Coin} from '../components/SearchPage/SearchListItem';
import useModal from '../hooks/useModal';
import ModalCoinContent, {
  ModalContent,
} from '../components/SearchPage/ModalCoinContent';
import useLocation from '../hooks/useLocation';

function Search(): React.JSX.Element {
  const {makeApiCall} = useAuth();
  const [data, setData] = useState([] as Coin[]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const finalSearchValue = searchValue.toLowerCase();
  const {toggleModal, ModalWrapper, setModalData, modalData} = useModal();
  const {currentLocation} = useLocation();

  const getCoinsList = async () => {
    try {
      const response = await makeApiCall({
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentLocation?.code}&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en`,
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
        setData(coins);
        setLoading(false);
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

        const coinData: ModalContent = {
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
        // console.log(response.market_data.current_price.eur);
        setModalData(coinData);
        toggleModal();
      } catch (error) {
        console.error(error);
      }
    },
    [makeApiCall, toggleModal, setModalData, currentLocation?.code],
  );

  const filteredTodoList = useMemo(() => {
    return data.filter(
      item =>
        item.name.toLowerCase().includes(finalSearchValue) ||
        item.symbol.toLowerCase().includes(finalSearchValue),
    );
  }, [data, finalSearchValue]);

  useEffect(() => {
    getCoinsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchInput}>
        <CustomTextInput
          autoComplete="off"
          placeholder="Search coins..."
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
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <FlatList
              data={filteredTodoList}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <SearchListItem
                  item={item}
                  onPress={() => {
                    getClickedCoinData(item.id);
                  }}
                />
              )}
            />
            <ModalWrapper>
              <ModalCoinContent item={modalData} />
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
});

export default Search;
