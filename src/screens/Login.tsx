import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../theme';
import {useAuth} from '../contexts/AuthContext';
import CustomButton from '../components/CustomButton';
import {Text} from 'react-native-elements';
import useToast from '../hooks/useToast';

function Login(): React.JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const {signIn} = useAuth();
  const {showToast} = useToast();

  const handleRegister = useCallback(async () => {
    try {
      await signIn({username, password}).then(() => {
        showToast({
          type: 'success',
          text1: 'Welcome!',
          text2: `Welcome back ${username}`,
        });
      });
    } catch (err) {
      setError(String(err));
    }
  }, [username, password, signIn, showToast]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  const isDisabled = useMemo(
    () => username === '' || password === '',
    [username, password],
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
    marginVertical: 20,
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
