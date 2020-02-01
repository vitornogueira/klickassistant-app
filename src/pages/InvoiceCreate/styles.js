import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const Container = styled.View`
  padding: ${Constants.statusBarHeight}px;
`;

export const Title = styled.Text`
  margin-bottom: 5px;
  font-size: 32px;
  color: #292929;
`;
