import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Search from '../screens/Search';
import AllNft from '../screens/NftScreen';
import {Button} from 'react-native-elements';
import AllExchange from '../screens/ExchangeScreen';

const Stack = createNativeStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen
        name="AllNft"
        component={AllNft}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title="Back"
              type="clear"
            />
          ),
          headerBackVisible: false,
        })}
      />
      <Stack.Screen name="AllExchange" component={AllExchange} />
    </Stack.Navigator>
  );
};

export default AppStack;
