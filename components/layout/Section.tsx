import styled, { css } from 'styled-components'

interface SectionProps {
  children: any | any[]
  color?: 'seafoam' | 'white'
}

export const Section = ({ children, color = 'white' }: SectionProps) => {
  return (
    <section
      className={`py-12 lg:py-16 ${
        color === 'seafoam'
          ? 'bg-gradient-to-br from-seafoam-150/50 via-seafoam-100/30 to-white'
          : ''
      }`}
    >
      {children}
    </section>
  )
}
