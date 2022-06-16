import styled from 'styled-components/native';
import Constants from "expo-constants";
import { colors } from '../../assets/colors';

const StatusBarHeight = Constants.statusBarHeight;

export const StyledContainer = styled.View`
    flex: 1;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 15px;
    padding-top: ${ StatusBarHeight }px;
    background-color: ${ colors.bg };
`;
