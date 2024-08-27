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

const IconBannerComponent = ({ data }) => {
    const { iconColumn } = data || {}

    return (
        <div className="h-fit lg:py-16 md:py-8 lg:my-8 bg-gradient-to-r from-teal-100/60 to-cyan-100/60 bg-cover bg-center w-screen">
            <div className="md:flex justify-center lg:gap-36 md:gap-16 w-fit md:w-full mx-auto md:mx-0">
                {Array.isArray(iconColumn) && iconColumn.map((item, index) => {
                    return <div className="text-start grid grid-cols-1 my-16 md:my-0" key={`iconColumn-${index}`}>
                        <h4 className="font-tuner text-2xl md:text-3xl mb-4 text-black">{item.heading}</h4>
                        {Array.isArray(item.iconList) && item.iconList.map((iconItem, iconIndex) => 
                        {
                            const Icon = icons[iconItem.icon];
                            return <div className="flex mb-4" key={`iconColumns-${index}-${iconIndex}`}>
                                {Icon && <Icon className="text-3xl mr-2 text-black inline" />}
                                    <span className="font-inter text-lg md:text-xl text-black">{iconItem.name}</span>
                            </div>
                        })}
                    </div>
                    
                })}
                            
                    
            </div>
        </div>
    )
}

export { IconBannerComponent }
