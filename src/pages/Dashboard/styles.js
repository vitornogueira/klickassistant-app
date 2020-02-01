import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const Container = styled.View`
  padding-top: ${Constants.statusBarHeight}px;
`;

export const Title = styled.Text`
  margin-bottom: 5px;
  font-size: 32px;
  color: #292929;
`;

export const Header = styled.View`
  align-items: flex-end;
  width: 100%;
  padding: 15px 8px;
  background: #fff;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`

export const Content = styled.ScrollView`
  padding: 15px;
`;

export const Button = styled.TouchableOpacity`
  align-self: stretch;
  background: #5bcc78;
  margin-top: 15px;
  padding: 15px 20px;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;
