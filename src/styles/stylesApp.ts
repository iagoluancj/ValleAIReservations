import styled from "styled-components";
import { FormDiv, TitleContainer } from "../components/Form/styles";
import { CalenderContainer } from "../components/Calender/styles";

export const AppContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1rem;
    background-color: #fff;
    border-radius: 15px;
`;


export const GlobalStyles = styled.div`

    @media (max-width: 578px) {
        ${CalenderContainer} {
            flex-direction: column;
            justify-content: center;
        }
        ${FormDiv} {
            flex-direction: column;
        }
    }

    @media (max-width: 478px) {
        ${TitleContainer} {
            flex-direction: column;
            gap: 0;
        }
        ${AppContainer} {
            padding: 1rem !important;
        }
    }
`