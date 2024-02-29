import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import {
  AuthContextData,
  AuthData,
  ApiCallParams,
  AuthRegisterData,
  AuthLoginData,
  AuthInfoSave,
} from '../types/AuthTypes';
import uuid from 'react-native-uuid';
import axios from 'axios';

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  initializeFirestore,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import useToast from '../hooks/useToast';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBo1BDdUIC_4Oiqqa0klf8KPP1JlvNhPwE',
  authDomain: 'mycoins-ebac8.firebaseapp.com',
  projectId: 'mycoins-ebac8',
  storageBucket: 'mycoins-ebac8.appspot.com',
  messagingSenderId: '597544437119',
  appId: '1:597544437119:web:bdd50f432d6e4f0ccf464a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [unsubscribe, setUnsubscribe] = useState<any>();

  //The loading part will be explained in the persist step session
  const [loading, setLoading] = useState(true);

  const {showToast} = useToast();

  const register = async ({
    email,
    username,
    password,
    confirmPassword,
  }: AuthRegisterData) => {
    if (email === '' || username === '' || password === '') {
      throw new Error('Email, username and password are required');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const _userRef = doc(collection(db, 'users'), email);

      const _authData: AuthInfoSave = {
        email,
        username,
      };

      await setDoc(_userRef, _authData).then(() => {
        showToast({
          type: 'success',
          text1: `Welcome ${username}`,
        });
      });
    } catch (error) {
      console.log(error);
      return Promise.reject('Error on register');
    }
  };

  const signIn = async ({email, password}: AuthLoginData) => {
    if (email === '' || password === '') {
      return Promise.reject('Email and password are required');
    }

    try {
      await signInWithEmailAndPassword(auth, email, password).then(async () => {
        const data = await getAuthData({email: email});
        showToast({
          type: 'success',
          text1: `Welcome back ${data?.username}`,
        });
      });
    } catch (error) {
      console.log(error);
      showToast({
        type: 'error',
        text1: 'Error on sign in',
      });

      return Promise.reject('Error on sign in');
    }
  };

  const logout = useCallback(async () => {
    unsubscribe();
    await signOut(auth);
    setAuthData(undefined);

    showToast({
      type: 'success',
      text1: 'See you soon!',
    });
  }, [unsubscribe, showToast]);

  async function loadStorageData({email}: {email: string}) {
    try {
      const _unsub = onSnapshot(doc(db, 'users', email), docSnap => {
        console.log(docSnap?.data());
        const _authData: AuthData = {
          username: docSnap?.data()?.username || '',
          token: String(uuid.v4()),
        };

        setAuthData(_authData);
        setUnsubscribe(() => _unsub);
        setLoading(false);

        console.log('User data loaded');

        return Promise.resolve(_authData);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getAuthData({email}: {email: string}) {
    try {
      const docSnap = await getDoc(doc(db, 'users', email));

      if (docSnap.exists()) {
        const _authData: AuthData = {
          username: docSnap.data()?.username || '',
          token: String(uuid.v4()),
        };

        setAuthData(_authData);
        setLoading(false);

        return Promise.resolve(_authData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function makeApiCall({
    method,
    url,
    headers,
  }: ApiCallParams): Promise<void> {
    if (!authData) {
      throw new Error('User not authenticated');
    }

    if (!authData.token) {
      throw new Error('User not authenticated');
    }

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
    const authUnsubscribe = onAuthStateChanged(
      auth,
      async user => {
        if (user) {
          await loadStorageData({email: user.email || ''});
        } else {
          setAuthData(undefined);
          setLoading(false);
        }
      },
      async error => {
        console.log(error);
        await logout();
        setLoading(false);
      },
    );

    return () => authUnsubscribe();
  }, []);

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider
      value={{authData, loading, register, signIn, logout, makeApiCall}}>
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
