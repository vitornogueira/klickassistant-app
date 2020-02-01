import React from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

export default function Event() {
  return (
    <Container>
      <Text>Evento</Text>
    </Container>
  );
}

Event.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('event').title,
});
