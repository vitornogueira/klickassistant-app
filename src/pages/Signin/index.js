import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import {
  Container,
  HelpText,
  CodeContainer,
  CodeInput,
  SubmitButton,
  SubmitButtonText,
  BackButton,
  BackButtonText,
} from './styles';

import api from '../../services/api';

export default function Signin({ navigation }) {
  const [token, setToken] = useState([]);
  const userId = navigation.getParam('userId');

  function handleToken(value, position) {
    const data = [...token];

    data[position] = value;

    setToken(data);
  }

  async function handleSignin() {
    try {
      const { data } = await api.post('/signin', {
        user_id: userId,
        token: token.join(''),
      });

      await SecureStore.setItemAsync('kat_token', data.token);

      api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

      navigation.navigate('SignedRoutes');
    } catch (error) {
      Alert.alert('Ops...', 'Verifique seu código de acesso e tente novamente');
    }
  }

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      <HelpText>Enviamos um código de acesso para seu email</HelpText>

      <CodeContainer>
        <CodeInput
          onSubmitEditing={() => this.secondInput.focus()}
          maxLength={1}
          placeholder="0"
          keyboardType="number-pad"
          returnKeyType="next"
          onChangeText={(value) => handleToken(value, 0)}
        />
        <CodeInput
          ref={(input) => this.secondInput = input}
          onSubmitEditing={() => this.thirdInput.focus()}
          maxLength={1}
          placeholder="0"
          keyboardType="number-pad"
          returnKeyType="next"
          onChangeText={(value) => handleToken(value, 1)}
        />
        <CodeInput
          ref={(input) => this.thirdInput = input}
          onSubmitEditing={() => this.fourthInput.focus()}
          maxLength={1}
          placeholder="0"
          keyboardType="number-pad"
          returnKeyType="next"
          onChangeText={(value) => handleToken(value, 2)}
        />
        <CodeInput
          ref={(input) => this.fourthInput = input}
          onSubmitEditing={() => this.fifthInput.focus()}
          maxLength={1}
          placeholder="0"
          keyboardType="number-pad"
          returnKeyType="next"
          onChangeText={(value) => handleToken(value, 3)}
        />
        <CodeInput
          ref={(input) => this.fifthInput = input}
          onSubmitEditing={() => this.sixthInput.focus()}
          maxLength={1}
          placeholder="0"
          keyboardType="number-pad"
          returnKeyType="next"
          onChangeText={(value) => handleToken(value, 4)}
        />
        <CodeInput
          ref={(input) => this.sixthInput = input}
          maxLength={1}
          placeholder="0"
          keyboardType="number-pad"
          returnKeyType="next"
          onChangeText={(value) => handleToken(value, 5)}
        />
      </CodeContainer>

      <SubmitButton onPress={handleSignin}>
        <SubmitButtonText>Acessar</SubmitButtonText>
      </SubmitButton>

      <BackButton onPress={() => navigation.navigate('Signup')}>
        <BackButtonText>Voltar</BackButtonText>
      </BackButton>
    </Container>
  );
}
