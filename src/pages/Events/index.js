import React from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

export default function Events() {
  return (
    <Container>
      <Text>Eventos!</Text>
    </Container>
  );
}

Events.navigationOptions = {
  title: 'Eventos',
  headerShown: false,
};
