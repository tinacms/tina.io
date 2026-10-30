import { DemoForm } from 'components/modals/BookDemo';
import { ContactForm } from 'components/modals/ContactForm';
import { useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { EmailForm } from '@/component/modals/EmailForm';
import { levelOf } from '@/component/styles/buttons';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ButtonGroup, ModalButton } from '../../ui';

// Function that returns modal components
const getModalContent = (modal: string) => {
  if (modal === 'BookDemo.tsx') {
    return <DemoForm />;
  }
  if (modal === 'EmailForm.tsx') {
    return <EmailForm />;
  }
  if (modal === 'ContactForm.tsx') {
    return <ContactForm />;
  }
  if (modal === 'BecomePartner.tsx') {
    return <ContactForm variant="partner" />;
  }
  return null;
};

// The contact-based forms want the same roomy dialog the navbar/footer use;
// other modals keep the compact default.
const getModalClassName = (modal: string | null) => {
  if (modal === 'ContactForm.tsx' || modal === 'BecomePartner.tsx') {
    return '!max-w-2xl w-[90vw] !max-h-[90vh] !p-0 !duration-0';
  }
  return 'sm:max-w-lg';
};

export const ModalB = ({
  items,
  align = 'left',
  fill = false,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modal) => {
    setActiveModal(modal);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  return (
    <>
      <ButtonGroup fill={fill} align={align === 'center' ? 'center' : 'left'}>
        {items?.map((item, index) => {
          const { color, label, modal } = item;

          return (
            <ModalButton
              key={sanitizeLabel(label) || modal || `modal-button-${index}`}
              level={levelOf(color)}
              id={sanitizeLabel(label)}
              className={className}
              onClick={() => openModal(modal)}
              data-tina-field={tinaField(item, 'label')}
            >
              {label}
            </ModalButton>
          );
        })}
      </ButtonGroup>

      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && closeModal()}>
        <DialogContent className={getModalClassName(activeModal)}>
          {activeModal && getModalContent(activeModal)}
        </DialogContent>
      </Dialog>
    </>
  );
};
