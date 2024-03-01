import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import TabBar from './TabBar';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import AllNft from '../screens/NftScreen';
import AllExchange from '../screens/ExchangeScreen';

const Tab = createBottomTabNavigator();

const AppStack: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={(props: any) => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="AllNft" component={AllNft} />
      <Tab.Screen name="AllExchange" component={AllExchange} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AppStack;
