import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { ICON_BUTTON } from '@/component/styles/buttons';
import { LABEL, ON_DARK } from '@/component/styles/typography';

export const CodeToolbar = ({
  lang,
  onCopy,
  tooltipVisible,
}: {
  lang?: string;
  onCopy: () => void;
  tooltipVisible: boolean;
}) => (
  <div
    className={`code-toolbar ${ON_DARK} bg-gray-800 pl-4 pr-1 lg:rounded-t-xl flex justify-between items-center`}
  >
    <span className={LABEL}>{lang || 'Unknown'}</span>
    <button
      type="button"
      onClick={onCopy}
      aria-label={tooltipVisible ? 'Copied' : 'Copy code'}
      className={ICON_BUTTON}
    >
      {tooltipVisible ? <CheckIcon /> : <ClipboardIcon />}
    </button>
  </div>
);
