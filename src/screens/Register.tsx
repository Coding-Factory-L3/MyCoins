
import React, {useCallback, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import CustomTextInput from '../components/CustomTextInput';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../theme';
import CustomButton from '../components/CustomButton';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../hooks/useTheme';

function Register({navigation}: any): React.JSX.Element {
  const {register} = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {currentTheme} = useTheme();

  const onRegisterPress = useCallback(async () => {
    try {
      await register({email, username, password, confirmPassword});
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Registration failed:', error.message);
        setErrorMessage(error.message);
      }
    }
}, [email, username, password, confirmPassword, register]);

  const isDisabled = useMemo(
    () =>
      email === '' ||
      username === '' ||
      password === '' ||
      confirmPassword === '',
    [email, username, password, confirmPassword],
  );

  return (
    <View
      style={{...styles.container, backgroundColor: currentTheme.background}}>
      <View>
        <Image
          source={require('../assets/logo/AppLogo.png')}
          style={{...styles.logo, shadowColor: currentTheme.tertiary}}
        />

        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={e => setEmail(e)}
          leftIcon={
            <Feather name="mail" size={24} color={currentTheme.primary} />
          }
        />

        <CustomTextInput
          placeholder="Username"
          value={username}
          onChangeText={e => setUsername(e)}
          leftIcon={
            <Feather name="user" size={24} color={currentTheme.primary} />
          }
        />
        <CustomTextInput
          placeholder="Password"
          value={password}
          onChangeText={e => setPassword(e)}
          leftIcon={
            <Feather name="lock" size={24} color={currentTheme.primary} />
          }
          secureTextEntry={true}
          isPassword={true}
          iconColor={currentTheme.primary}
        />
        <CustomTextInput
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={e => setConfirmPassword(e)}
          leftIcon={
            <Feather name="lock" size={24} color={currentTheme.primary} />
          }
          secureTextEntry={true}
          isPassword={true}
          iconColor={currentTheme.primary}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{color: currentTheme.primary, textAlign: 'right'}}>
            Already have an account...
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <CustomButton
          customStyle={styles.button}
          title="Register"
          onPress={onRegisterPress}
          disabled={isDisabled}
        />
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  errorMessage: {
    marginTop: 10,
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
  },
});

export default Register;
