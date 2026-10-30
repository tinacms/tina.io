import { Actions } from 'components/blocks/ActionButton/ActionsButton';
import { CodeButton } from 'components/blocks/CodeButton/CodeButton';
import { ModalB } from 'components/blocks/ModalButton/ModalButton';

type ButtonKind = 'actions' | 'modal' | 'command' | null;

const kindOf = (button): ButtonKind => {
  const type: string = button?.__typename ?? '';
  if (type.includes('Actions')) {
    return 'actions';
  }
  if (type.includes('ModalButton')) {
    return 'modal';
  }
  if (type.includes('CodeButton')) {
    return 'command';
  }
  return null;
};

// One cell per button, so mixed rows of action, modal and command buttons
// line up. Action and modal buttons go full width on phones and back to label
// width from sm (or stay full width with `fill`); the command field keeps its
// own width.
const CELL = {
  fill: 'flex w-full items-center [&>*]:w-full',
  command: 'flex items-center',
  button: 'flex w-full items-center sm:w-auto [&>*]:w-full sm:[&>*]:w-auto',
};

const RenderButton = ({ button, className = '', fill = false }) => {
  const kind = kindOf(button);
  if (!kind) {
    return null;
  }
  const cell = fill
    ? CELL.fill
    : kind === 'command'
      ? CELL.command
      : CELL.button;
  return (
    <div className={cell}>
      {kind === 'actions' && (
        <Actions items={[button]} className={className} fill={fill} />
      )}
      {kind === 'modal' && (
        <ModalB items={[button]} className={className} fill={fill} />
      )}
      {kind === 'command' && (
        <CodeButton
          id={button.id}
          label={button.label}
          className={fill ? `w-full ${className}` : className}
          helpText={button?.helpText}
          starterTemplates={button?.starterTemplates}
        />
      )}
    </div>
  );
};

export default RenderButton;
