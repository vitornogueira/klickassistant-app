import styled from 'styled-components/native';

export const EventCard = styled.View`
  margin: 10px 0;
  padding: 15px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, .9);
`;

export const EventTitle = styled.Text`
  margin-bottom: 10px;
  font-size: 18px;
`;

export const EventFooter = styled.View`
  flex-direction: row;
`;

export const EventFooterLink = styled.TouchableHighlight`
  margin: 10px 0 0;
`;
