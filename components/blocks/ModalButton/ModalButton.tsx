import { EmailForm } from 'components/forms';
import { DemoForm } from 'components/modals/BookDemo';
// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React, { useCallback, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { tinaField } from 'tinacms/dist/react';
import { fetchMeetingLinks } from 'utils/getMeetingLinks';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { ModalButton } from '../../ui';

const modals = {
  'BookDemo.tsx': <DemoForm />,
  'EmailForm.tsx': <EmailForm />,
};

export const ModalB = ({ items, align = 'left' }) => {
  const [open, setOpen] = useState(false);
  const [ModalContent, setModalContent] = useState(null);
  const [preloadedData, setPreloadedData] = useState(null);

  const preloadMeetingData = useCallback(async () => {
    if (!preloadedData) {
      try {
        const data = await fetchMeetingLinks();
        setPreloadedData(data);
      } catch (error) {
        console.error('Failed to preload meeting data:', error);
      }
    }
  }, [preloadedData]);

  const openModal = (modal) => {
    if (modal === 'BookDemo.tsx' && preloadedData) {
      setModalContent(<DemoForm preloadedData={preloadedData} />);
    } else {
      setModalContent(modals[modal]);
    }
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
        {items?.map((item) => {
          const { color, label, icon, modal } = item;

          return (
            <ModalButton
              key={label}
              color={color}
              id={sanitizeLabel(label)}
              className=""
              onClick={() => openModal(modal)}
              onMouseEnter={() =>
                modal === 'BookDemo.tsx' && preloadMeetingData()
              }
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
