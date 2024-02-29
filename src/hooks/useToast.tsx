// useCustomToast.ts

import {useCallback} from 'react';
import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info'; // Add other types as needed

interface ToastConfig {
  type: ToastType;
  text1: string;
  text2?: string;
}

const useToast = () => {
  const showToast = useCallback((config: ToastConfig) => {
    Toast.show({
      type: config.type,
      text1: config.text1,
      text2: config.text2 || undefined,
      visibilityTime: 3000, // Adjust as needed
      autoHide: true,
      topOffset: 30, // Adjust as needed
      bottomOffset: 40, // Adjust as needed
    });
  }, []);

  return {showToast};
};

export default useToast;
