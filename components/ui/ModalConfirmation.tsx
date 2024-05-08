import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import classes from './ModalConfirmation.module.css';

interface ModalConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    body: React.ReactNode;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ isOpen, onClose, body }) => {
    return (
        <Modal 
        open={isOpen}
        onClose={onClose} 
        center
        classNames={{
          overlay: classes.customOverlay,
          modal: classes.customModal,
        }}>
            <div>{body}</div>
        </Modal>
    );
};

export default ModalConfirmation; 
