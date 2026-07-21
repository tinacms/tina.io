import { Actions } from 'components/blocks/ActionButton/ActionsButton';
import { CodeButton } from 'components/blocks/CodeButton/CodeButton';
import { ModalB } from 'components/blocks/ModalButton/ModalButton';

const RenderButton = ({ button, className = '' }) => {
  const inner = button.__typename.includes('Actions') ? (
    <Actions items={[button]} className={className} />
  ) : button.__typename.includes('ModalButton') ? (
    <ModalB items={[button]} className={className} />
  ) : button.__typename.includes('CodeButton') ? (
    <CodeButton
      id={button.id}
      label={button.label}
      className={className}
      helpText={button?.helpText}
      starterTemplates={button?.starterTemplates}
    >
      {button.children}
    </CodeButton>
  ) : null;

  if (!inner) return null;

  // Uniform cell for every button type: centered and with the child's own
  // vertical margins cancelled (e.g. ModalB's -mb-2), so mixed rows of action
  // + modal buttons align by construction instead of by matching per-variant
  // nudges — which always drift out of sync across breakpoints.
  return <div className="flex items-center [&>*]:!my-0">{inner}</div>;
};

export default RenderButton;
