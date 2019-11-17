import React, { useState, useEffect } from 'react';
import { Button, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import { Container, Title } from './styles';

import api from '../../services/api';
import Event from '../../components/Event';

export default function Dashboard({ navigation }) {
  const [event, setEvent] = useState({});

  useEffect(() => {
    async function loadNextEvents() {
      try {
        const { data } = await api.get('/me/events/current');

        setEvent(data);
      } catch ({ response }) {
        if (response.status === 401) {
          handleLogout();
        }
      }
    }

    loadNextEvents();
  }, []);

  async function handleLogout() {
    await SecureStore.deleteItemAsync('kat_token');

    navigation.navigate('Auth');
  }

  return (
    <Container>
      <Button onPress={() => navigation.openDrawer()} title="Menu">
        <Text>Menu</Text>
      </Button>
      <Title>Meus próximos eventos</Title>
      {event.id && <Event event={event} />}
      {/* <EventFooterLink onPress={handleLogout}><Text style={{color: '#7863cc',fontSize: 27}}>Sair</Text></EventFooterLink> */}
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Início',
  tabBarIcon: ({ tintColor }) => <MaterialIcons name="home" size={24} color={tintColor} />
};
