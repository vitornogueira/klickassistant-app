import React, { useEffect } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { Container } from './styles';

import api from '../../services/api';

export default function AuthLoader({ navigation }) {
  useEffect(() => {
    async function loadToken() {
      const token = await SecureStore.getItemAsync('kat_token');

      if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
      }

      navigation.navigate(token ? 'Dashboard' : 'Signup');
    }

    loadToken();
  }, []);

  return (
    <Container>
      <ActivityIndicator />
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content" />
    </Container>
  );
}
