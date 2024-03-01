/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import ListAllNft from '../components/MainPage/ListAllNft';
import {useAuth} from '../contexts/AuthContext';
import {ActivityIndicator, FlatList, View} from 'react-native';
import ModalNftContent, {
  ModalNftContentProps,
} from '../components/MainPage/ModalNftContent';
import useModal from '../hooks/useModal';
import useLocation from '../hooks/useLocation';
import CustomTextInput from '../components/CustomTextInput';
import {useTheme} from '../hooks/useTheme';
import Feather from 'react-native-vector-icons/Feather';
import Fuse from 'fuse.js';

const fuseOptions = {
  keys: ['name'], // specify the fields you want to search in
  threshold: 0.3,
};

const AllNft: React.FC = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState<any>({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [search, setSearch] = useState('');

  const {makeApiCall} = useAuth();
  const {ModalComponent} = useModal();
  const {currentLocation} = useLocation();
  const {currentTheme} = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          makeApiCall({
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/nfts/list?per_page=100&page=1',
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

  const getNft = useCallback(async ({id}: {id: string}) => {
    try {
      await Promise.all([
        makeApiCall({
          method: 'GET',
          url: `https://api.coingecko.com/api/v3/nfts/${id}?`,
        }),
      ]).then((res: any) => {
        const response = res[0];

        console.log('response', JSON.stringify(response, null, 2));

        const nftData: ModalNftContentProps = {
          id: response?.id,
          name: response?.name,
          description: response?.description,
          image: {
            large: response?.image?.large,
            small: response?.image.small,
          },
          symbol: response?.symbol,
          price: response?.floor_price?.usd,
        };

        setModalData(nftData);
        setIsModalVisible(true);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const filteredData = useMemo(() => {
    const fuse = new Fuse(data, fuseOptions);

    if (search) {
      return fuse.search(search).map(result => result.item);
    }
    return data;
  }, [data, search]);

  return (
    <View
      style={{flex: 1, padding: 20, backgroundColor: currentTheme.background}}>
      <CustomTextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search NFTs"
        leftIcon={
          <Feather
            name="search"
            size={24}
            color={currentTheme.textButton}
            style={{marginRight: 10}}
          />
        }
      />

      {loading ? (
        <ActivityIndicator size="large" color={currentTheme.primary} />
      ) : (
        <>
          <FlatList
            data={filteredData}
            renderItem={({item}) => (
              <ListAllNft
                onPress={() => {
                  getNft({id: item.id});
                }}
                item={item}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingBottom: 100, paddingTop: 20}}
            showsVerticalScrollIndicator={false}
          />
          <ModalComponent
            isVisible={isModalVisible}
            closeModal={() => setIsModalVisible(false)}>
            <ModalNftContent item={modalData} />
          </ModalComponent>
        </>
      )}
    </View>
  );
};

export default AllNft;
