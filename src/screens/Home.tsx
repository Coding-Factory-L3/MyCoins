import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import MainItemBox from '../components/MainPage/MainItemBox';
import {Text} from 'react-native-elements';

const Home: React.FC = () => {
  const {makeApiCall} = useAuth();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await makeApiCall({
          method: 'GET',
          url: 'https://api.coingecko.com/api/v3/search/trending',
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
      <Text h1>My coin</Text>
      <TextInput style={styles.search} placeholder="Search" />
      <FlatList
        style={styles.list}
        horizontal={true}
        data={data}
        keyExtractor={(item: any) => item.id}
        renderItem={({item}) => {
          return <MainItemBox item={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {height: 40, margin: 12, borderWidth: 1, padding: 10},
  list: {
    paddingLeft: 10,
  },
});

export default Home;
