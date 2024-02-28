import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useAuth} from '../contexts/AuthContext';
import {Text} from 'react-native-elements';

const Home: React.FC = () => {
  const {logout, authData} = useAuth();

  return (
    <View style={styles.container}>
      <Text>
        Welcome {authData?.username}! You are now logged in to the app.
      </Text>
      <CustomButton title="Sign Out" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
