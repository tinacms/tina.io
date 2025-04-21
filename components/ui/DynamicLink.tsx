import Link, { LinkProps } from 'next/link';
import { getDynamicPath } from '../../utils/getDynamicPath';

type ExtraProps = Omit<LinkProps, 'as' | 'href'>;

interface DynamicLinkProps extends ExtraProps {
  href: string;
  children: any;
  className?: string;
}

export const DynamicLink = ({
  children,
  href,
  className,
  ...props
}: DynamicLinkProps) => {
  return (
    <Link
      href={href}
      {...props}
      className={`cursor-pointer ${className || ''}`}
    >
      {children}
    </Link>
  );
};
