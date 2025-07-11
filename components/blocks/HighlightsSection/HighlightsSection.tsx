import { AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiBadge, BiSupport } from 'react-icons/bi';
import { CgCrown } from 'react-icons/cg';
import {
  FaClock,
  FaCloudDownloadAlt,
  FaCodeBranch,
  FaDatabase,
  FaDesktop,
  FaFileAlt,
  FaGithub,
  FaHandPointer,
  FaLockOpen,
  FaMarkdown,
  FaPuzzlePiece,
  FaShare,
  FaUnlock,
} from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { SlLock } from 'react-icons/sl';
import { TbPlugConnected } from 'react-icons/tb';

const icons = {
  FaClock,
  FaUnlock,
  FaCodeBranch,
  FaCloudDownloadAlt,
  FaPuzzlePiece,
  FaMarkdown,
  FaGithub,
  FaFileAlt,
  AiOutlineUser,
  BiBadge,
  BiSupport,
  AiOutlineUsergroupAdd,
  CgCrown,
  HiOutlineSparkles,
  TbPlugConnected,
  SlLock,
  FaDatabase,
  FaShare,
  FaDesktop,
  FaLockOpen,
  FaHandPointer,
};

const HighlightsSection = ({ data }) => {
  const { highlightColumn } = data || {};

  return (
    <div className="h-fit lg:py-16 md:py-8 bg-linear-to-r from-teal-100/60 to-cyan-100/60 bg-cover bg-center w-screen">
      <div className="md:flex justify-center lg:gap-36 md:gap-16 w-fit md:w-full mx-auto md:mx-0">
        {Array.isArray(highlightColumn) &&
          highlightColumn.map((item, index) => {
            return (
              <div
                className="text-start grid grid-cols-1 my-16 md:my-0"
                key={`iconColumn-${index}`}
              >
                <h4 className="font-ibm-plex text-2xl md:text-3xl mb-4 text-black">
                  {item.heading}
                </h4>
                {Array.isArray(item.highlights) &&
                  item.highlights.map((iconItem, iconIndex) => {
                    const Icon = icons[iconItem.icon];
                    return (
                      <div
                        className="flex mb-4"
                        key={`iconColumns-${index}-${iconIndex}`}
                      >
                        {Icon && (
                          <Icon className="text-3xl mr-2 text-black inline" />
                        )}
                        <span className="font-inter text-lg md:text-xl text-black">
                          {iconItem.name}
                        </span>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export { HighlightsSection };
