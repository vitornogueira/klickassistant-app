import React, { useState, useEffect } from 'react';
import { TouchableHighlight, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import { Container, Header, Content, Title, Button, ButtonText } from './styles';

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
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content" />

      <Header>
        <TouchableHighlight onPress={() => navigation.openDrawer()} title="Menu">
          <MaterialIcons name="menu" size={28} color="#292929" />
        </TouchableHighlight>
      </Header>

      <Content>
        {event.id && (
          <>
            <Title>Tá rolando agora</Title>
            <Event event={event} navigation={navigation} />
          </>
        )}
        <Button onPress={() => navigation.navigate('InvoiceCreate', { event })} title="Adicionar nota">
          <ButtonText>Adicionar nota</ButtonText>
        </Button>
      </Content>
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Início',
  tabBarIcon: ({ tintColor }) => <MaterialIcons name="home" size={24} color={tintColor} />
};
