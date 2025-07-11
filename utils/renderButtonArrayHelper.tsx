import { Actions } from 'components/blocks/ActionButton/ActionsButton';
import { CodeButton } from 'components/blocks/CodeButton/CodeButton';
import { ModalB } from 'components/blocks/ModalButton/ModalButton';
import React from 'react';

const RenderButton = ({ button, index }) => {
  if (button.__typename.includes('Actions')) {
    return <Actions key={index} items={[button]} />;
  } else if (button.__typename.includes('ModalButton')) {
    return (
      <div className="lg:-mt-0.5">
        <ModalB key={index} items={[button]} />
      </div>
    );
  } else if (button.__typename.includes('CodeButton')) {
    return (
      <div>
        <CodeButton key={index} id={button.id} label={button.label}>
          {button.children}
        </CodeButton>
      </div>
    );
  } else {
    return null;
  }
};

export default RenderButton;
