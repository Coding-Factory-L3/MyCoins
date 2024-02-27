/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../theme';

interface CustomTextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  secureTextEntry?: boolean | false;
  isPassword?: boolean;
  iconColor?: string;
}

function CustomTextInput({
  placeholder,
  value,
  onChangeText,
  leftIcon,
  rightIcon,
  secureTextEntry = false,
  isPassword = false,
  iconColor,
}: CustomTextInputProps): React.ReactElement {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(
    secureTextEntry || false,
  );

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.focused,
        {paddingRight: isPassword ? 35 : 0},
      ]}>
      <Input
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        secureTextEntry={isPasswordVisible}
        inputContainerStyle={{
          borderBottomWidth: 0,
          width: 'auto',
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        errorStyle={{display: 'none'}}
      />

      {isPassword && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          {isPasswordVisible ? (
            <Feather
              name="eye"
              size={24}
              color={iconColor ? iconColor : 'black'}
            />
          ) : (
            <Feather
              name="eye-off"
              size={24}
              color={iconColor ? iconColor : 'black'}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'transparent',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  focused: {
    borderColor: theme.colors.primary,
    shadowColor: theme.colors.tertiary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default CustomTextInput;
