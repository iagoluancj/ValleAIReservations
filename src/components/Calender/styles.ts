import styled from "styled-components";

interface Clicado {
    $clicked: boolean
}

interface Disabled {
    $isDisabled: boolean
}

export const Hours = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 1rem;
`

export const SpanHour = styled.div<Clicado>`
    padding: .3rem;
    background-color: ${({ $clicked }) => ($clicked ? "transparent" : "linear-gradient(135deg, #f8c4a1, #e79675)")};  // desativado 878787
    color: ${({ $clicked }) => ($clicked ? "#000" : "#fff")};  
    border: 1px solid ${({ $clicked }) => ($clicked ? "#e79675" : "transparent")};
    /* background: linear-gradient(135deg, #f8c4a1, #e79675); */
    border-radius: 5px;
    transition: .1s ease-in-out;   

    background: ${({ $clicked }) =>
        $clicked
            ? "transparent"
            : "linear-gradient(135deg, #f8c4a1, #e79675)"};

    &:hover {
        cursor: pointer;
        transition: .1s ease-in-out;
    }
`

export const SpanDisabled = styled.span<Disabled>`
    div {
        opacity: ${({ $isDisabled }) => ($isDisabled ? ".5" : "1")};  // desativado 878787
    }
`

export const CalenderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    gap: 2rem;
    margin-bottom: 1rem;

    font-family: Poppins !important;
`