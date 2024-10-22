import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 4rem;
`;

export const SeparatorLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
`

export const LoginContainer = styled.div`
  position: relative;
  background: linear-gradient(135deg, #f8c4a1, #e79675);
  padding: 3rem 5rem 1rem 5rem;
  border-radius: 16px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  animation: fadeIn 1s ease-in-out;

  @media (max-width: 450px) {
    padding: 1rem 3rem 1rem 3rem;
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  font-weight: bold;
`;

export const Subtitle = styled.span`
  font-size: 1rem;
  color: #fff;
`;

export const Formu = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1.5rem;

  input {
    border: 1px solid #e79675;  
    color: #e79675;
    padding: .7rem 1rem;
    border-radius: 7px;
    width: 100%;
    text-align: start;

    &:focus {
      border: 1px solid #e79675 !important;  
    }

    &:active {
      border: 1px solid #e79675 !important;  
    }

    &::placeholder {
      color: #f8c4a1;
    }
  }
`;

export const SubmitButton = styled.button`
  padding: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  border-radius: 8px;
  background: #fff;
  color: #e79675;
  border: 1px solid transparent;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #00000000, #00000000);
    border: 1px solid #fff;
    color: #fff;
    transition: 0.3s ease;
  }
`;

export const ForgotPassword = styled.a`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export const DivLogin = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  @media (max-width: 1200px) {
    display: none;
  }
`;