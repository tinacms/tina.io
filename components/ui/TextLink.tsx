import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import { TEXT_LINK, TEXT_LINK_ARROW } from '@/component/styles/links';
import { cn } from '@/lib/utils';
import { shouldPrefetchLink } from '@/utils/shouldPrefetchLink';

/**
 * A standalone text link (“Read more →”) (#4964). It always ends in the short
 * arrow; there is no option to drop it or swap the icon. External links open
 * in a new tab. Inside a card that is itself the link, pass `as="span"`.
 */

/** The short arrow at the end of every text link. */
export const TextLinkArrow = () => (
  <BiArrowBack aria-hidden="true" className={TEXT_LINK_ARROW} />
);

type TextLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  href?: string;
  as?: 'a' | 'span';
  className?: string;
  children: React.ReactNode;
};

export const TextLink = ({
  href = '/',
  as = 'a',
  className = '',
  children,
  ...props
}: TextLinkProps) => {
  const classes = cn(TEXT_LINK, className);
  const content = (
    <>
      {children}
      <TextLinkArrow />
    </>
  );

  if (as === 'span') {
    return <span className={classes}>{content}</span>;
  }

  const external = /^https?:\/\//.test(href);
  return (
    <Link
      href={href}
      prefetch={shouldPrefetchLink(href)}
      className={classes}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {content}
    </Link>
  );
};
