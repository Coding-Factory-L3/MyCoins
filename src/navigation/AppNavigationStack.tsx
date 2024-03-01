import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Favorites from '../screens/Favorites';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

const AppStack: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={(props: any) => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AppStack;
