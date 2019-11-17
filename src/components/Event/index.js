import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import format from 'date-fns/format';

import { EventCard, EventTitle, EventFooter, EventFooterLink } from './styles';

export default function event({ event }) {
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
      <Text><Text style={{fontWeight: 'bold'}}>Local:</Text> {event.local}</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Início:</Text> {format(new Date(event.start_at), "d 'de' M 'de' yyyy 'às' k:mm")}</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Término:</Text> {format(new Date(event.finish_at), "d 'de' M 'de' yyyy 'às' k:mm")}</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Diária:</Text> R$ {event.budget.toFixed(2)}</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Gastos com refeição:</Text> R$ {mealExpense.toFixed(2)}</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Ainda tem pra gastar:</Text> R$ {(event.budget - mealExpense).toFixed(2)}</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Gastos com transporte:</Text> R$ {transportExpense.toFixed(2)}</Text>
      <EventFooter>
        <EventFooterLink><Text style={{color: '#7863cc',fontSize: 16}}>Mais detalhes</Text></EventFooterLink>
      </EventFooter>
    </EventCard>
  );
}
