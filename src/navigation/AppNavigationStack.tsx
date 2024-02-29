import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'flip'}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default AppStack;
