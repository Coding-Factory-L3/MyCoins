import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import ListAllExchange from '../components/MainPage/ListAllExchange';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../hooks/useTheme';

const AllExchange: React.FC = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const {makeApiCall} = useAuth();
  const {currentTheme} = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          makeApiCall({
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/exchanges?',
          }),
        ]).then(res => {
          setData(res[0]);
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const getExchange = useCallback(async ({id}: {id: string}) => {
  //   try {
  //     await Promise.all([
  //       makeApiCall({
  //         method: 'GET',
  //         url: `https://api.coingecko.com/api/v3/exchanges/${id}?`,
  //       }),
  //     ]).then(res => {
  //       setModalData(res[0]);

  //       setIsModalVisible(true);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentTheme.background,
        },
      ]}>
      {loading ? (
        <ActivityIndicator size="large" color={currentTheme.primary} />
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ListAllExchange item={item} />}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default AllExchange;
