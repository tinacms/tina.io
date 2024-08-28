import React from 'react'
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
  FaLockOpen

} from 'react-icons/fa'
import { AiOutlineUser } from 'react-icons/ai'
import { BiBadge } from 'react-icons/bi'
import { BiSupport } from 'react-icons/bi'
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
  FaHandPointer
}

const IconSelector = ({ input }) => {
  const iconKeys = Object.keys(icons)

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
  )
}

export default IconSelector
