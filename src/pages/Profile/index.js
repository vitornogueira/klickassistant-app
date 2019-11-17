import React from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

export default function Events() {
  return (
    <Container>
      <Text>Profile!</Text>
    </Container>
  );
}

Events.navigationOptions = {
  drawerLabel: 'Perfil'
};
