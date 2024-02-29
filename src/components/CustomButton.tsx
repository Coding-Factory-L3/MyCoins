import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import theme from '../../theme';

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
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...styles.shadow,
        ...customStyle,
        backgroundColor: disabled
          ? theme.colors.light.secondary
          : theme.colors.light.primary,
      }}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={{
          ...styles.text,
          color: disabled
            ? theme.colors.light.primary
            : theme.colors.light.text,
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
    color: theme.colors.light.primary,
    textAlign: 'center',
    padding: 10,
    fontWeight: '600',
  },
  shadow: {
    shadowColor: theme.colors.light.tertiary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});

export default CustomButton;
