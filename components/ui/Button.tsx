import styled, { css } from 'styled-components'

interface ButtonProps {
  color?:
    | 'white'
    | 'primary'
    | 'secondary'
    | 'seafoam'
    | 'variable'
    | 'blue'
    | 'blueInverted'
  size?: 'large' | 'small'
}

export const Button = ({
  color = 'seafoam',
  size = 'large',
  className = '',
  children,
  ...props
}) => {
  const baseClasses =
    'transition duration-150 ease-out rounded-full flex items-center font-tuner px-6 pt-[12px] pb-[10px] text-base font-medium whitespace-nowrap leading-snug focus:outline-none focus:shadow-outline hover:-translate-y-px active:translate-y-px hover:-translate-x-px active:translate-x-px leading-tight'

  const raisedButtonClasses = 'hover:shadow active:shadow-none'

  const colorClasses = {
    seafoam:
      raisedButtonClasses +
      ' text-blue-600 hover:text-blue-500 border border-seafoam-100 bg-gradient-to-br from-seafoam-50 to-seafoam-150',
    blue:
      raisedButtonClasses +
      ' text-white hover:text-gray-50 border border-blue-500 bg-gradient-to-br from-blue-300 to-blue-600',
    orange:
      raisedButtonClasses +
      ' text-white hover:text-gray-50 border border-orange-600 bg-gradient-to-br from-orange-400 to-orange-600',
    white:
      raisedButtonClasses +
      ' text-orange-500 hover:text-orange-400 border border-gray-50 bg-gradient-to-br from-white to-gray-50',
  }

  return (
    <button
      className={`${baseClasses} ${
        colorClasses[color] ? colorClasses[color] : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  color: 'seafoam',
}

export const ButtonGroup = ({ children }) => {
  return (
    <div className="w-full flex justify-start flex-wrap items-center gap-4">
      {children}
    </div>
  )
}
