import Link, { type LinkProps } from 'next/link';

type ExtraProps = Omit<LinkProps, 'as' | 'href'>;

interface DynamicLinkProps extends ExtraProps {
  href: string;
  children: any;
}

export const DynamicLink = ({ children, href, ...props }: DynamicLinkProps) => {
  return (
    <Link href={href} {...props} className="cursor-pointer">
      {children}
    </Link>
  );
};
