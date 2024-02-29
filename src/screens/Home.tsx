import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useAuth} from '../contexts/AuthContext';
import {Text} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '../hooks/useTheme';

const Home: React.FC = () => {
  const {logout} = useAuth();

  const {currentTheme, toggleTheme} = useTheme();

  return (
    <View
      style={{...styles.container, backgroundColor: currentTheme.background}}>
      <Text h1 style={{color: currentTheme.text}}>
        Home
      </Text>
      {/* icon to change the theme */}
      <Feather
        name="sun"
        size={24}
        color={currentTheme.switch}
        onPress={toggleTheme}
      />
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
