import styled from "styled-components";

export const ButtonModal = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  border: 1px solid transparent;

  &:hover {
    background-color: transparent;
    border: 1px solid var(--focusText);
    color: var(--defaultText);

  }

  &:active {
    background-color: #004080;
  }
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  border: 1px solid transparent;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: transparent;
    border: 1px solid var(--focusText);
    color: var(--defaultText);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    color: var(--defaultText);
    background-color: #00000050;
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 0px rgb(0, 0, 0, 0);
  }
`;

export const ButtonDeletedModal = styled(ButtonModal)`
  background-color: #ff6666;
`
export const ButtonDeleted = styled(Button)`
  background-color: #ff6666;

  &:hover {
    border: 1px solid #ff6666;
  } 
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; 
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  z-index: 1000; 
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

