import Link, { LinkProps } from 'next/link';
import { getDynamicPath } from '../../utils/getDynamicPath';

type ExtraProps = Omit<LinkProps, 'as' | 'href'>;

interface DynamicLinkProps extends ExtraProps {
  href: string;
  children: any;
}

export const DynamicLink = ({ children, href, ...props }: DynamicLinkProps) => {
  return (
    // Because {children} contains <a> tags we need to wrap it in a div to pass className attributes in. If we inserted into the <Link> it doesnt get passed in. 
    <div className="cursor-pointer">
      {/* Work around for using legacyBehavior so that anchors in HTML in MDX files do not cause legacy errors */}
      <Link href={href} {...props} legacyBehavior>
        {children}
      </Link>
    </div>
  );
};
