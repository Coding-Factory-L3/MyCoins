import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../theme';
import CustomButton from '../components/CustomButton';
import {useAuth} from '../contexts/AuthContext';

function Register(): React.JSX.Element {
  const {register} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterPress = useCallback(async () => {
    console.log('Register pressed');
    try {
      await register({username, password, confirmPassword});
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
  }, [username, password, confirmPassword, register]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo/AppLogo.png')}
        style={styles.logo}
      />

      <CustomTextInput
        placeholder="Username"
        value={username}
        onChangeText={e => setUsername(e)}
        leftIcon={
          <Feather name="user" size={24} color={theme.colors.light.primary} />
        }
      />
      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={e => setPassword(e)}
        leftIcon={
          <Feather name="lock" size={24} color={theme.colors.light.primary} />
        }
        secureTextEntry={true}
        isPassword={true}
        iconColor={theme.colors.light.primary}
      />
      <CustomTextInput
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={e => setConfirmPassword(e)}
        leftIcon={
          <Feather name="lock" size={24} color={theme.colors.light.primary} />
        }
        secureTextEntry={true}
        isPassword={true}
        iconColor={theme.colors.light.primary}
      />
      <CustomButton
        customStyle={styles.button}
        title="Register"
        onPress={onRegisterPress}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.light.background,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,

    shadowColor: theme.colors.light.tertiary,
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
