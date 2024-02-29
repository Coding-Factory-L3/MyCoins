import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../theme';
import {useAuth} from '../contexts/AuthContext';
import CustomButton from '../components/CustomButton';
import {Text} from 'react-native-elements';

function Login({navigation}: any): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const {signIn} = useAuth();

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
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/logo/AppLogo.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>Login</Text>

        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={e => setEmail(e)}
          leftIcon={
            <Feather name="mail" size={24} color={theme.colors.light.primary} />
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
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{color: theme.colors.light.primary, textAlign: 'right'}}>
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
        <Text style={styles.error}>{error}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.light.background,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    backgroundColor: 'transparent',

    shadowColor: theme.colors.light.tertiary,
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
    color: theme.colors.light.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    color: theme.colors.light.error,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
});

export default Login;
