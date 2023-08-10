import React from 'react'
import Link from 'next/link'
import TinaIconSvg from '../../public/svg/tina-icon.svg'

export const TinaIcon = ({
  link = '/',
  className = '',
  children = null,
  color = 'white',
}) => {
  return (
    <Link legacyBehavior href={link}>
      <a className={className}>
        <h1 className="flex items-center">
          <TinaIconSvg
            className={`${children ? 'w-8' : 'w-10'} h-auto ${
              color === 'orange' ? 'fill-orange-500' : 'fill-white'
            }`}
          />
          {children && (
            <span
              className={`text-2xl leading-tight mt-2.5 ml-2 font-tuner ${
                color === 'orange' ? 'text-orange-500' : 'text-white'
              }`}
            >
              {children}
            </span>
          )}
        </h1>
      </a>
    </Link>
  )
}
