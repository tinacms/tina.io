import Link from 'next/link'
import styled, { css } from 'styled-components'

interface ButtonProps {
  color?: 'white' | 'blue' | 'orange' | 'seafoam' | 'ghost'
  size?: 'large' | 'small'
}

const baseClasses =
  'transition duration-150 ease-out rounded-full flex items-center font-tuner whitespace-nowrap leading-snug focus:outline-none focus:shadow-outline hover:-translate-y-px active:translate-y-px hover:-translate-x-px active:translate-x-px leading-tight'

const raisedButtonClasses = 'hover:shadow active:shadow-none'

const colorClasses = {
  seafoam:
    raisedButtonClasses +
    ' text-orange-600 hover:text-orange-500 border border-seafoam-150 bg-gradient-to-br from-seafoam-50 to-seafoam-150',
  blue:
    raisedButtonClasses +
    ' text-white hover:text-gray-50 border border-blue-400 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600',
  orange:
    raisedButtonClasses +
    ' text-white hover:text-gray-50 border border-orange-600 bg-gradient-to-br from-orange-400 to-orange-600',
  white:
    raisedButtonClasses +
    ' text-orange-500 hover:text-orange-400 border border-gray-50 bg-gradient-to-br from-white to-gray-50',
  ghost: 'text-orange-500 hover:text-orange-400',
}

const sizeClasses = {
  large: 'px-8 pt-[14px] pb-[12px] text-lg font-medium',
  medium: 'px-6 pt-[12px] pb-[10px] text-base font-medium',
  small: 'px-5 pt-[10px] pb-[8px] text-sm font-medium',
}

export const Button = ({
  color = 'seafoam',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      className={`${baseClasses} ${
        colorClasses[color] ? colorClasses[color] : colorClasses['seafoam']
      } ${
        sizeClasses[size] ? sizeClasses[size] : sizeClasses['medium']
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export const LinkButton = ({
  link = '/',
  color = 'seafoam',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  return (
    <Link href={link} passHref>
      <a
        className={`${baseClasses} ${
          colorClasses[color] ? colorClasses[color] : colorClasses['seafoam']
        } ${
          sizeClasses[size] ? sizeClasses[size] : sizeClasses['medium']
        } ${className}`}
        {...props}
      >
        {children}
      </a>
    </Link>
  )
}

export const ButtonGroup = ({ children }) => {
  return (
    <div className="w-full flex justify-start flex-wrap items-center gap-4">
      {children}
    </div>
  )
}
