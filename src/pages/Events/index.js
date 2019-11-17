import React from 'react';
import { Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';

export default function Events() {
  return (
    <Container>
      <Text>Eventos!</Text>
    </Container>
  );
}

Events.navigationOptions = {
  tabBarLabel: 'Eventos',
  tabBarIcon: ({ tintColor }) => <MaterialIcons name="event" size={24} color={tintColor} />
};
