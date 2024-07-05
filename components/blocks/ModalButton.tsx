import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { BiArrowBack } from 'react-icons/bi';
import { ModalButton } from '../../components/ui';
import { tinaField } from 'tinacms/dist/react';
import { EmailForm } from 'components/forms';
import { DemoForm } from 'components/modals/BookDemo';

const modals = {
  'BookDemo.tsx': <DemoForm />,
  'EmailForm.tsx': <EmailForm />,
};

export const ModalB = ({ items, align = 'left' }) => {
  const [open, setOpen] = useState(false);
  const [ModalContent, setModalContent] = useState(null);

  const openModal = (modal) => {
    setModalContent(modals[modal]);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

const isList = true;

  return (
    <>
      <div
        className={[
          'actionGroup',
          'items-center',
          isList ? 'flex flex-col sm:flex-row md:flex-row lg:flex-row' : 'flex flex-row',
          align === 'center' && 'actionGroupCenter',
        ].filter(Boolean).join(' ')}
      >
        {items &&
          items.map((item) => {
            const { color, label, icon, modal } = item;

            return (
              <ModalButton
                key={label}
                color={color}
                className={`modal-button ${color}`}
                onClick={() => openModal(modal)}
                data-tina-field={tinaField(item, 'label')}
              >
                {label}
                {icon && <BiArrowBack className="h-[1.125em] w-auto opacity-70 ml-2 -mr-1 -mt-1 rotate-180" />}
              </ModalButton>
            );
          })}
      </div>

      <Modal open={open} onClose={closeModal} center>
        {ModalContent}
      </Modal>
      <style jsx>{`
        .actionGroup {
          margin: 0 -0.75rem -0.5rem -0.75rem;
        }

        .actionGroupCenter {
          justify-content: center;
        }


        .icon-class {
          display: inline-block;
          margin-left: 0.375em;
          height: 1em;
          width: auto;
          transition: opacity ease-out 150ms;
        }

        .modal-button:hover .icon-class {
          opacity: 0.85;
        }
      `}</style>
    </>
  );
};
