import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import {AuthContextData, AuthData, ApiCallParams} from '../types/AuthTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import axios from 'axios';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();

  //The loading part will be explained in the persist step session
  const [loading, setLoading] = useState(true);

  const register = async ({username, password}: AuthData) => {
    if (username === '' || password === '') {
      throw new Error('Username and password are required');
    }

    //...call service and setAuthData
    const _authData: AuthData = {
      username,
      password,
    };

    //Persist the data in the Async Storage
    //to be recovered in the next user session.
    AsyncStorage.setItem('@UserData', JSON.stringify(_authData));
  };

  const signIn = async ({username, password}: AuthData) => {
    if (username === '' || password === '') {
      throw new Error('Username and password are required');
    }

    const userData = await AsyncStorage.getItem('@UserData');
    const parsedUserData = JSON.parse(userData || '{}');

    if (
      parsedUserData.username !== username ||
      parsedUserData.password !== password
    ) {
      throw new Error('Username or password invalid');
    }

    //...call service and setAuthData
    const _authData: AuthData = {
      username,
      password,
      token: String(uuid.v4()),
    };

    //Persist the data in the Async Storage
    //to be recovered in the next user session.
    AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
  };

  const signOut = async () => {
    //Remove the data from Async Storage
    //to NOT be recovered in next session.
    await AsyncStorage.removeItem('@AuthData');

    //Remove the data from the state
    setAuthData(undefined);
  };

  async function loadStorageData(): Promise<void> {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  async function makeApiCall({
    method,
    url,
    headers,
  }: ApiCallParams): Promise<void> {
    const userData = await AsyncStorage.getItem('@UserData');

    // if (!userData) {
    //   return Promise.reject('User not authenticated');
    // }

    // const parsedUserData = JSON.parse(userData);

    // if (!parsedUserData.token) {
    //   return Promise.reject('User not authenticated');
    // }

    //...call service and setAuthData
    if (method === 'GET') {
      return axios
        .get(`${url}&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`, {
          headers,
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          console.log(error);
          return Promise.reject('Error on GET request');
        });
    }
  }

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorageData function.
    loadStorageData();
  }, []);

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider
      value={{authData, loading, register, signIn, signOut, makeApiCall}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};
