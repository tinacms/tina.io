import { DemoForm } from 'components/modals/BookDemo';
// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Modal } from 'react-responsive-modal';
import { EmailForm } from '@/component/modals/EmailForm';
import 'react-responsive-modal/styles.css';
import { tinaField } from 'tinacms/dist/react';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { ModalButton } from '../../ui';

// Function that returns modal components
const getModalContent = (modal: string) => {
  if (modal === 'BookDemo.tsx') {
    return <DemoForm />;
  }
  if (modal === 'EmailForm.tsx') {
    return <EmailForm />;
  }
  return null;
};

export const ModalB = ({ items, align = 'left', className = '' }) => {
  const [open, setOpen] = useState(false);
  const [ModalContent, setModalContent] = useState(null);

  const openModal = (modal) => {
    setModalContent(getModalContent(modal));
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
          isList
            ? 'flex flex-col sm:flex-row md:flex-row lg:flex-row'
            : 'flex flex-row',
          align === 'center' && 'actionGroupCenter',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {items?.map((item, index) => {
          const { color, label, icon, modal, shape } = item;

          return (
            <ModalButton
              key={sanitizeLabel(label) || modal || `modal-button-${index}`}
              color={color}
              shape={shape}
              id={sanitizeLabel(label)}
              className={className}
              onClick={() => openModal(modal)}
              data-tina-field={tinaField(item, 'label')}
            >
              {label}
              {icon && (
                <BiArrowBack className="h-[1.125em] w-auto opacity-70 ml-2 -mr-1 -mt-1 rotate-180" />
              )}
            </ModalButton>
          );
        })}
      </div>

      <Modal open={open} onClose={closeModal} center>
        {ModalContent}
      </Modal>
      <style jsx>{`
        .actionGroup {
          margin: 0 0 -0.5rem 0;
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
