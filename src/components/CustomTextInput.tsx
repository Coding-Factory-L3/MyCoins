/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '../hooks/useTheme';

interface CustomTextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  secureTextEntry?: boolean | false;
  isPassword?: boolean;
  iconColor?: string;
  autoComplete?: any;
  autoCorrect?: boolean | false;
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
  autoComplete,
  autoCorrect = false,
}: CustomTextInputProps): React.ReactElement {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(
    secureTextEntry || false,
  );

  const {currentTheme} = useTheme();

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.focused,
        {
          paddingRight: isPassword ? 35 : 0,
          borderColor: currentTheme.tertiary,
          shadowColor: currentTheme.tertiary,
        },
      ]}>
      <Input
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        secureTextEntry={isPasswordVisible}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        inputContainerStyle={{
          borderBottomWidth: 0,
          width: 'auto',
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        errorStyle={{display: 'none'}}
        autoCapitalize="none"
        style={{color: currentTheme.text}}
        placeholderTextColor={currentTheme.text}
      />

      {isPassword && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          {isPasswordVisible ? (
            <Feather
              name="eye"
              size={24}
              color={iconColor ? iconColor : currentTheme.text}
            />
          ) : (
            <Feather
              name="eye-off"
              size={24}
              color={iconColor ? iconColor : currentTheme.text}
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
    borderWidth: 1,
    height: 48,
  },
  focused: {
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
