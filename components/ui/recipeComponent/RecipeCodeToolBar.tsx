import { MdOutlineContentCopy } from 'react-icons/md';
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
    className={`code-toolbar ${ON_DARK} bg-gray-800 px-4 py-2 lg:rounded-t-xl flex justify-between items-center`}
  >
    <span className={LABEL}>{lang || 'Unknown'}</span>
    <div className="flex items-center ml-4 space-x-4 relative overflow-visible">
      <button
        type="button"
        onClick={onCopy}
        className={`flex items-center px-2 py-1 bg-gray-800  rounded-md transition-colors duration-200 space-x-1 relative ${
          tooltipVisible ? 'bg-gray-700 rounded-md ml-1' : 'hover:bg-gray-700'
        }`}
      >
        {!tooltipVisible && <MdOutlineContentCopy className="w-4 h-4" />}
        <span className={LABEL}>{!tooltipVisible ? 'Copy' : 'Copied!'}</span>
      </button>
    </div>
  </div>
);
