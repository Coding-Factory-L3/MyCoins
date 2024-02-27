import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {Text} from 'react-native-elements';
import theme from '../../theme';
import MainItemBox from '../components/MainPage/MainItemBox';

const Home: React.FC = () => {
  const {makeApiCall} = useAuth();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await makeApiCall({
          method: 'GET',
          url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en',
        }).then(response => {
          setData(response);
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={data}
            renderItem={({item}) => <MainItemBox item={item} />}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
