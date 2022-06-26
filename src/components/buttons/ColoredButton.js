import styled from 'styled-components/native';
import { colors } from '../../assets/colors';

export const ColoredButton = styled.TouchableOpacity`
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: ${colors.primary};
  shadowcolor: #000;
  shadowoffset: 0 1px;
  shadowopacity: 0.22;
  shadowradius: 2.22px;
  elevation: 3;
`;
