import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

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
                overlay: 'bg-gray-400 bg-opacity-80',
                modal: 'bg-white w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/3 max-w-5xl rounded-2xl p-4 text-left',
            }}
        >
            <div>{body}</div>
        </Modal>
    );
};

export default ModalConfirmation; 
