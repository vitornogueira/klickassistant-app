import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #7863cc;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
`;

export const EmailInput = styled.TextInput`
  align-self: stretch;
  height: 50px;
  background: #fff;
  padding: 15px 20px;
  border-radius: 4px;
  margin: 15px 0;
  font-size: 17px;
`;

export const SubmitButton = styled.TouchableOpacity`
  align-self: stretch;
  background: #5bcc78;
  padding: 15px 20px;
  border-radius: 4px;
  margin-top: 5px;
`;

export const SubmitButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;
