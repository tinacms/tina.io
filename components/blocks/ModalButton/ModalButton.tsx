import { DemoForm } from 'components/modals/BookDemo';
import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { tinaField } from 'tinacms/dist/react';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { EmailForm } from '@/component/modals/EmailForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
          '-mb-2',
          'items-center',
          isList
            ? 'flex flex-col sm:flex-row md:flex-row lg:flex-row'
            : 'flex flex-row',
          align === 'center' && 'justify-center',
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

      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && closeModal()}>
        <DialogContent className="sm:max-w-lg">{ModalContent}</DialogContent>
      </Dialog>
    </>
  );
};
