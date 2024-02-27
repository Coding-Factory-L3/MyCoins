import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../theme';

function Login(): React.JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
});

export default Login;
