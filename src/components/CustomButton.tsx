import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import theme from '../../theme';
import {useTheme} from '../hooks/useTheme';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  customStyle?: object;
}

function CustomButton({
  onPress,
  title,
  disabled,
  customStyle,
}: CustomButtonProps): React.JSX.Element {
  const {currentTheme} = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...styles.shadow,
        ...customStyle,
        backgroundColor: disabled
          ? currentTheme.secondary
          : currentTheme.primary,
        shadowColor: currentTheme.tertiary,
      }}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={{
          ...styles.text,
          color: disabled ? currentTheme.primary : currentTheme.textButton,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 48,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    fontWeight: '600',
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});

export default CustomButton;
