import { Actions } from 'components/blocks/ActionButton/ActionsButton';
import { CodeButton } from 'components/blocks/CodeButton/CodeButton';
import { ModalB } from 'components/blocks/ModalButton/ModalButton';
import React from 'react';

const RenderButton = ({ button, index }) => {
  if (button.__typename.includes('Actions')) {
    return <Actions key={index} items={[button]} />;
  } else if (button.__typename.includes('ModalButton')) {
    return <ModalB key={index} items={[button]} />;
  } else if (button.__typename.includes('CodeButton')) {
    return (
      <CodeButton key={index} id={button.id} label={button.label}>
        {button.children}
      </CodeButton>
    );
  } else {
    return null;
  }
};

export default RenderButton;
