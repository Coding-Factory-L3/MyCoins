import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import CustomTextInput from '../components/CustomTextInput';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../theme';
import SearchListItem, {Coin} from '../components/SearchPage/SearchListItem';

function Search(): React.JSX.Element {
  const {makeApiCall} = useAuth();
  const [data, setData] = useState([] as Coin[]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const finalSearchValue = searchValue.toLowerCase();

  function getCoinsList() {
    (async () => {
      try {
        const response = await makeApiCall({
          method: 'GET',
          url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en',
        });

        if (Array.isArray(response)) {
          const coins: Coin[] = response.map((coin: any) => ({
            name: coin.name,
            icon: coin.image,
            symbol: coin.symbol,
            pricePercentage: coin.price_change_percentage_24h,
            price: coin.current_price,
          }));
          setData(coins);
          console.log('coins:', response);
          setLoading(false);
        } else {
          console.error('Response is not an array:', response);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }

  const filteredTodoList = useMemo(() => {
    return data.filter(
      item =>
        item.name.includes(finalSearchValue) ||
        item.name.toLowerCase().includes(finalSearchValue) ||
        item.name.toUpperCase().includes(finalSearchValue) ||
        item.symbol.includes(finalSearchValue) ||
        item.symbol.toLowerCase().includes(finalSearchValue) ||
        item.symbol.toUpperCase().includes(finalSearchValue),
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
          placeholder="Search coins..."
          value={searchValue}
          onChangeText={e => setSearchValue(e.toLowerCase())}
          leftIcon={
            <Feather
              name="search"
              size={24}
              color={theme.colors.light.primary}
            />
          }
        />
        <FlatList
          data={filteredTodoList}
          renderItem={SearchListItem}
          keyExtractor={(item, index) => index.toString()}
        />
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
