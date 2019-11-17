import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { Container, Title, EmailInput, SubmitButton, SubmitButtonText } from './styles';

import api from '../../services/api';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');

  function handleSignup() {
    api.post('/signup', {
      email: email,
    }).then(({ data }) => {
      navigation.navigate('Signin', { userId: data.id });
    });
  }

  return (
    <Container behavior="padding">
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content" />

      <Title>Klick Assistant</Title>

      <EmailInput
        onChangeText={setEmail}
        placeholder="seu@email.com"
        keyboardType="email-address"
        autoCapitalize="none" />

      <SubmitButton onPress={handleSignup}>
        <SubmitButtonText>Próximo</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
}
