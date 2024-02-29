import React, {ReactNode, useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';

type ModalProps = {
  children: ReactNode;
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const useModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>({});

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalData({});
  };

  const ModalWrapper: React.FC<ModalProps> = ({children}) =>
    ({isModalVisible} && (
      <View>
        <Modal
          isVisible={isModalVisible}
          style={[
            styles.view,
            {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          ]}
          swipeDirection="down"
          onBackdropPress={toggleModal}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
          hideModalContentWhileAnimating
          backdropOpacity={0.3}
          onSwipeComplete={closeModal}>
          <View
            style={{
              backgroundColor: '#fff',
              minHeight: deviceHeight - 125,
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                alignSelf: 'flex-end',
              }}>
              <Feather name="x" size={30} />
            </TouchableOpacity>
            {children}
          </View>
        </Modal>
      </View>
    ));

  return {toggleModal, ModalWrapper, setModalData, modalData};
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
  },
});

export default useModal;
