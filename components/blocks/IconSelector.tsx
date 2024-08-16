import React from 'react';
import { FaClock, FaUnlock, FaCodeBranch, FaCloudDownloadAlt, FaPuzzlePiece, FaMarkdown, FaGithub, FaFileAlt } from 'react-icons/fa';

const icons = {
    FaClock,
    FaUnlock,
    FaCodeBranch,
    FaCloudDownloadAlt,
    FaPuzzlePiece,
    FaMarkdown,
    FaGithub,
    FaFileAlt
};

const IconSelector = ({ input }) => {
  const iconKeys = Object.keys(icons);

  return (
    <select
      value={input.value}
      onChange={(event) => input.onChange(event.target.value)}
    >
      {iconKeys.map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
};

export default IconSelector;