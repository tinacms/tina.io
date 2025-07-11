import { MdOutlineContentCopy } from 'react-icons/md';

export const CodeToolbar = ({
  lang,
  onCopy,
  tooltipVisible,
}: {
  lang?: string;
  onCopy: () => void;
  tooltipVisible: boolean;
}) => (
  <div className="code-toolbar bg-gray-800 text-white px-4 py-2 lg:rounded-t-xl text-sm font-semibold flex justify-between items-center">
    <span className="font-ibm-plex">{lang || 'Unknown'}</span>
    <div className="flex items-center ml-4 space-x-4 relative overflow-visible">
      <button
        type="button"
        onClick={onCopy}
        className={`flex items-center px-2 py-1 bg-gray-800  rounded-md text-sm transition-colors duration-200 space-x-1 relative ${
          tooltipVisible
            ? 'text-white bg-gray-700 rounded-md ml-1'
            : 'hover:bg-gray-700 text-white'
        }`}
      >
        {!tooltipVisible && <MdOutlineContentCopy className="w-4 h-4" />}
        <span>{!tooltipVisible ? 'Copy' : 'Copied!'}</span>
      </button>
    </div>
  </div>
);
