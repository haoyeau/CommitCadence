import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import { Text } from 'react-native';

export default function App() {
  
  const router = useRouter();

  useEffect(() => {

    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync('github_access_token');
      if (token) {
        // Token exists, proceed with authenticated actions
        router.replace('./home');
      } else {
        // Token does not exist, redirect to login
        router.replace('./login');
      }
    };

    checkAuth();
  }
  , []);

  return (
    <Text>Welcome to CommitCadence!</Text>
  );
}