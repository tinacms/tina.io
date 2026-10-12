// biome-ignore lint/correctness/noUnusedImports: React is required
import React, { useState } from 'react';
import type { IconType } from 'react-icons';
import { FaHourglassHalf, FaRegCheckCircle, FaRegClock } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

// The only status icons the roadmap uses / styles. Keep this in sync with the
// `icons` and `iconColorClasses` maps in ../blocks/RoadMap/RoadmapGrid.tsx.
const icons: { key: string; label: string; Icon: IconType }[] = [
  { key: 'FaRegCheckCircle', label: 'Done', Icon: FaRegCheckCircle },
  { key: 'FaHourglassHalf', label: 'In progress', Icon: FaHourglassHalf },
  { key: 'FaRegClock', label: 'Coming soon', Icon: FaRegClock },
];

const optionClasses =
  'text-sm shadow focus:shadow-outline focus:border-blue-500 w-full border border-gray-100 hover:border-gray-200 text-gray-500 hover:text-blue-400 focus:text-blue-500 rounded-md flex items-center cursor-pointer p-2';

const RoadmapIconSelector = ({ input }) => {
  const [selected, setSelected] = useState(input.value || '');

  const handleChange = (key: string) => {
    setSelected(key);
    input.onChange(key);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div
        onClick={() => handleChange('')}
        className={`${optionClasses} ${selected === '' ? 'bg-blue-200' : 'bg-white'}`}
      >
        <ImCross className="mr-2" /> <span className="text-xs">No Icon</span>
      </div>
      {icons.map(({ key, label, Icon }) => (
        <div
          key={key}
          onClick={() => handleChange(key)}
          className={`${optionClasses} ${selected === key ? 'bg-blue-200' : 'bg-white'}`}
        >
          <Icon
            color={selected === key ? 'blue' : 'black'}
            size={16}
            className="mr-2"
          />
          <span className="text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default RoadmapIconSelector;
