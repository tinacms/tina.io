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

  if (!inner) {
    return null;
  }

  // Uniform cell for every button type: centered and with the child's own
  // vertical margins cancelled (e.g. ModalB's -mb-2), so mixed rows of action
  // + modal buttons align by construction instead of by matching per-variant
  // nudges — which always drift out of sync across breakpoints.
  // Action and modal buttons go full width on phones (stacked by the parent
  // row's wrap) and back to label width from sm; the command button keeps
  // its own width.
  const stretch = !button.__typename.includes('CodeButton');
  return (
    <div
      className={
        stretch
          ? 'flex w-full items-center sm:w-auto [&>*]:!my-0 [&>*]:w-full sm:[&>*]:w-auto'
          : 'flex items-center [&>*]:!my-0'
      }
    >
      {inner}
    </div>
  );
};

export default RenderButton;
