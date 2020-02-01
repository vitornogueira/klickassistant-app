import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import format from 'date-fns/format';

import { EventCard, EventLabel, EventTitle, EventFooter, EventFooterLink } from './styles';

export default function event({ event, navigation }) {
  const [mealExpense, setMealExpense] = useState(0);
  const [transportExpense, setTransportExpense] = useState(0);

  useEffect(() => {
    const mealInvoices = event.meal_invoices || [];
    const mealExpense = mealInvoices.reduce((total, meal_invoice) => total + meal_invoice.value, 0);

    setMealExpense(mealExpense);
  }, [event]);

  useEffect(() => {
    const transportInvoices = event.transport_invoices || [];
    const transportExpense = transportInvoices.reduce((total, transport_invoice) => total + transport_invoice.value, 0);

    setTransportExpense(transportExpense);
  }, [event]);

  return (
    <EventCard>
      <EventTitle>{event.title}</EventTitle>
      <Text><EventLabel>Local:</EventLabel> {event.local}</Text>
      <Text><EventLabel>Início:</EventLabel> {format(new Date(event.start_at), "d 'de' M 'de' yyyy 'às' k:mm")}</Text>
      <Text><EventLabel>Término:</EventLabel> {format(new Date(event.finish_at), "d 'de' M 'de' yyyy 'às' k:mm")}</Text>
      <Text><EventLabel>Diária:</EventLabel> R$ {event.budget.toFixed(2)}</Text>
      <Text><EventLabel>Gastos com refeição:</EventLabel> R$ {mealExpense.toFixed(2)}</Text>
      <Text><EventLabel>Ainda tem pra gastar:</EventLabel> R$ {(event.budget - mealExpense).toFixed(2)}</Text>
      <Text><EventLabel>Gastos com transporte:</EventLabel> R$ {transportExpense.toFixed(2)}</Text>
      <EventFooter>
        <EventFooterLink onPress={() => navigation.navigate('Event', { event })}>
          <Text style={{color: '#7863cc',fontSize: 16}}>Mais detalhes</Text>
        </EventFooterLink>
      </EventFooter>
    </EventCard>
  );
}
