import { Actions } from 'components/blocks/ActionButton/ActionsButton';
import { CodeButton } from 'components/blocks/CodeButton/CodeButton';
import { ModalB } from 'components/blocks/ModalButton/ModalButton';

const renderInner = (button, className: string, fill: boolean) => {
  const type: string = button?.__typename ?? '';
  if (type.includes('Actions')) {
    return <Actions items={[button]} className={className} fill={fill} />;
  }
  if (type.includes('ModalButton')) {
    return <ModalB items={[button]} className={className} fill={fill} />;
  }
  if (type.includes('CodeButton')) {
    return (
      <CodeButton
        id={button.id}
        label={button.label}
        className={fill ? `w-full ${className}` : className}
        helpText={button?.helpText}
        starterTemplates={button?.starterTemplates}
      />
    );
  }
  return null;
};

// One cell per button, so mixed rows of action, modal and command buttons
// line up. Action and modal buttons go full width on phones and back to label
// width from sm (or stay full width with `fill`); the command field keeps its
// own width.
const cellClass = (isCommand: boolean, fill: boolean) => {
  if (fill) {
    return 'flex w-full items-center [&>*]:!my-0 [&>*]:w-full';
  }
  if (isCommand) {
    return 'flex items-center [&>*]:!my-0';
  }
  return 'flex w-full items-center sm:w-auto [&>*]:!my-0 [&>*]:w-full sm:[&>*]:w-auto';
};

const RenderButton = ({ button, className = '', fill = false }) => {
  const inner = renderInner(button, className, fill);
  if (!inner) {
    return null;
  }
  const isCommand = (button?.__typename ?? '').includes('CodeButton');
  return <div className={cellClass(isCommand, fill)}>{inner}</div>;
};

export default RenderButton;
