import Link, { LinkProps } from 'next/link'
import { getDynamicPath } from '../../utils/getDynamicPath'

type ExtraProps = Omit<LinkProps, 'as' | 'href'>

interface DynamicLinkProps extends ExtraProps {
  href: string
  children: any
}

export const DynamicLink = ({ children, href, ...props }: DynamicLinkProps) => {
  return (
    <Link legacyBehavior href={href} {...props}>
      {children}
    </Link>
  )
}
