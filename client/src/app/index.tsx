import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store';
import { setToken } from './store/authSlice';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    // get the token from secure storage
    async function checkToken() {
      const storedToken = await SecureStore.getItemAsync('accessToken');
      if (storedToken) { 
        // if the token exists, set it in the Redux store
        // and navigate to the home screen
        dispatch(setToken(storedToken));
        router.replace('/home');
      }else {
        // if the token does not exist, navigate to the login screen
        router.replace('/login');
      }
    }
    checkToken();
  }, [router]);

  return (
    <Text>Welcome to CommitCadence!</Text>
  );
}

