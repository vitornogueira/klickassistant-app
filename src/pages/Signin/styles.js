import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #7863cc;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const HelpText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const CodeContainer = styled.View`
  display: flex;
  margin: 15px 0;
  flex-direction: row;
`;

export const CodeInput = styled.TextInput`
  flex: 1;
  width: 30px;
  height: 70px;
  margin: 5px;
  background: #fff;
  border-radius: 4px;
  font-size: 24px;
  text-align: center;
  color: #4c4c4c;
`;

export const SubmitButton = styled.TouchableOpacity`
  align-self: stretch;
  background: #5bcc78;
  padding: 15px 20px;
  border-radius: 4px;
`;

export const SubmitButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;

export const BackButton = styled.TouchableOpacity`
  align-self: stretch;
  background: transparent;
  padding: 15px 20px;
  border-radius: 4px;
  border-width: 1px;
  border-color: #fff;
  margin-top: 15px;
`;

export const BackButtonText = styled.Text`
  color: #FFF;
  font-size: 18px;
  text-align: center;
`;
