import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import Feather from 'react-native-vector-icons/Feather';
import {useAuth} from '../contexts/AuthContext';
import CustomButton from '../components/CustomButton';
import {Text} from 'react-native-elements';
import {useTheme} from '../hooks/useTheme';

function Login({navigation}: any): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const {signIn} = useAuth();

  const {currentTheme} = useTheme();

  const handleRegister = useCallback(async () => {
    try {
      await signIn({email, password});
    } catch (err) {
      setError(String(err));
    }
  }, [email, password, signIn]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  const isDisabled = useMemo(
    () => email === '' || password === '',
    [email, password],
  );

  return (
    <View
      style={{...styles.container, backgroundColor: currentTheme.background}}>
      <View>
        <Image
          source={require('../assets/logo/AppLogo.png')}
          style={{...styles.logo, shadowColor: currentTheme.tertiary}}
        />

        <Text style={{...styles.title, color: currentTheme.primary}}>
          Login
        </Text>

        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={e => setEmail(e)}
          leftIcon={
            <Feather name="mail" size={24} color={currentTheme.primary} />
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
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{color: currentTheme.primary, textAlign: 'right'}}>
            Don't have an account...
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <CustomButton
          title="Login"
          onPress={() => handleRegister()}
          disabled={isDisabled}
        />
        <Text style={{...styles.error, color: currentTheme.error}}>
          {error}
        </Text>
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
    backgroundColor: 'transparent',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
});

export default Login;
