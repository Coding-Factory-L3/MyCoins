import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import ListAllExchange from '../components/MainPage/ListAllExchange';
import {useAuth} from '../contexts/AuthContext';

const AllExchange: React.FC = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const {makeApiCall} = useAuth();
  // const {toggleModal, ModalWrapper, setModalData, modalData} = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          makeApiCall({
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/exchanges?',
          }),
        ]).then(res => {
          setData({
            nfts: res[0],
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

  const getExchange = useCallback(async ({id}: {id: string}) => {
    try {
      await Promise.all([
        makeApiCall({
          method: 'GET',
          url: `https://api.coingecko.com/api/v3/exchanges/${id}?`,
        }),
      ]).then(res => {
        // setModalData(res[0]);
        // toggleModal();
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <View style={{flex: 1, padding: 20}}>
      <FlatList
        data={data.nfts}
        renderItem={({item}) => (
          <ListAllExchange
            onPress={() => {
              getExchange({id: item.id});
            }}
            item={item}
            onFavoritePress={(id: string) => {
              console.log('favorite', id);
            }}
          />
        )}
        keyExtractor={item => item.id}
      />
      {/* <ModalWrapper>
        <ModalNftContent item={modalData} />
      </ModalWrapper> */}
    </View>
  );
};

export default AllExchange;
