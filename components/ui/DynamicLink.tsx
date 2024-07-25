import Link, { LinkProps } from 'next/link'
import { getDynamicPath } from '../../utils/getDynamicPath'

type ExtraProps = Omit<LinkProps, 'as' | 'href'>

interface DynamicLinkProps extends ExtraProps {
  href: string
  children: any
}

export const DynamicLink = ({ children, href, ...props }: DynamicLinkProps) => {
  return (
    //Work around for using legacyBehaviour so that anchors in HTML in MDX files do not cause legacy errors
    <Link href={href} {...props} legacyBehavior>
      {children}
    </Link>
  )
}
