import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Animated, Easing} from 'react-native';
import {Text} from 'react-native-elements';
import theme from '../../theme';
import {name as appName} from '../../app.json';

const SplashScreen: React.FC = () => {
  const floatAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatUp = Animated.timing(floatAnimation, {
      toValue: 10, // Change this value to control the height of the float
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const floatDown = Animated.timing(floatAnimation, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    Animated.loop(Animated.sequence([floatUp, floatDown])).start();
  }, [floatAnimation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to {appName}</Text>
      <Animated.Image
        source={require('../assets/logo/AppLogo.png')}
        style={[
          styles.logo,
          {
            transform: [{translateY: floatAnimation}],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: theme.colors.light.primary,
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 300,
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
});

export default SplashScreen;
