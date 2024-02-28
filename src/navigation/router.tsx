import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppNavigationStack';
import AuthStack from './AuthNavigationStack';
import {useAuth} from '../contexts/AuthContext';
import SplashScreen from '../screens/SplashScreen';

export const Router: React.FC = () => {
  // More explanations about "authData" below
  const {authData, loading} = useAuth();

  if (loading) {
    // You can see the component implementation at the repository
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {authData?.token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
