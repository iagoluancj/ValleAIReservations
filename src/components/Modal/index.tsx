import React from "react";
import { ModalOverlay, ModalContainer, ModalActions } from "./styles";

interface ModalProps {
  onClose: () => void;
  message: string;
}

const ConfirmModal: React.FC<ModalProps> = ({ onClose, message }) => {

  return (
    <ModalOverlay>
      <ModalContainer>
        <p>{message}</p>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ConfirmModal;
