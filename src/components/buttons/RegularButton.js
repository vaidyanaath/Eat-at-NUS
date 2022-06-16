import styled from 'styled-components/native';
import { colors } from '../../assets/colors';


export const RegularButton = styled.TouchableOpacity`
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    align-self: center;
    background-color: ${colors.bg};
`;
