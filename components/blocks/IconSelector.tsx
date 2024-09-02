import React, { useState } from 'react'
import {
  FaClock,
  FaUnlock,
  FaCodeBranch,
  FaCloudDownloadAlt,
  FaPuzzlePiece,
  FaMarkdown,
  FaGithub,
  FaFileAlt,
  FaHandPointer,
  FaDatabase,
  FaShare,
  FaDesktop,
  FaLockOpen,
} from 'react-icons/fa'
import { AiOutlineUser } from 'react-icons/ai'
import { BiBadge, BiSupport } from 'react-icons/bi'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { CgCrown } from 'react-icons/cg'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { TbPlugConnected } from 'react-icons/tb'
import { SlLock } from 'react-icons/sl'

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
}

const IconSelector = ({ input }) => {
  const iconKeys = Object.keys(icons)
  const [selectedIcon, setSelectedIcon] = useState(input.value || '')
  const [isMinimized, setIsMinimized] = useState(true)

  const handleIconChange = (iconKey) => {
    setSelectedIcon(iconKey)
    input.onChange(iconKey)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div>
      <button onClick={toggleMinimize} className='text-red-600 text-sm mb-2'>
        {isMinimized ? 'Show Icons' : 'Minimize Icons'}
      </button>
      {!isMinimized && (
        <div className="grid grid-cols-2 gap-2">
          {iconKeys.map((key) => {
            const IconComponent = icons[key]
            const trimmedKey = key.slice(2)
            return (
              <div
                key={key}
                onClick={() => handleIconChange(key)}
                className={`flex items-center cursor-pointer p-2 ${
                  selectedIcon === key ? 'bg-blue-200' : 'bg-white'
                }`}
              >
                <IconComponent
                  color={selectedIcon === key ? 'blue' : 'black'}
                  size={16}
                />
                <span className="text-xs">{trimmedKey}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default IconSelector
