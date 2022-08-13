import styled from 'styled-components/native';

export const ShadowButton = styled.TouchableOpacity`
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    align-self: center;
    shadow-color: #fff;
    shadow-offset: { width: 5, height: 5 };
    shadow-opacity: 0.22;
    shadow-radius: 2.22px;
    elevation: 3;
`;
