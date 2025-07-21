
import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from './store';

export default function MainScreen() {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main Screen</Text>
      <Text>Token: {token}</Text>
    </View>
  );
}
