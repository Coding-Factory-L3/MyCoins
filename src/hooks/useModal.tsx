/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';

type ModalProps = {
  children: ReactNode;
  isVisible: boolean; // Use isVisible prop instead of managing state internally
  closeModal: () => void; // Callback to close the modal
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const ModalComponent: React.FC<ModalProps> = ({
  children,
  isVisible,
  closeModal,
}) =>
  isVisible && (
    <View>
      <Modal
        isVisible={isVisible}
        style={[
          styles.view,
          {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        ]}
        swipeDirection="down"
        onBackdropPress={closeModal}
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
  );

const useModal = () => {
  // No need to manage state internally, use it directly from the parent
  return {ModalComponent};
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
  },
});

export default useModal;
