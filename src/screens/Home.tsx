import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useAuth} from '../contexts/AuthContext';

const Home: React.FC = () => {
  const {signOut} = useAuth();

  return (
    <View style={styles.container}>
      <CustomButton title="Sign Out" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
