import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import {
  BUTTON,
  BUTTON_GROUP,
  type ButtonLevel,
} from '@/component/styles/buttons';
import { EYEBROW_LINK } from '@/component/styles/typography';
import { cn } from '@/lib/utils';
import { shouldPrefetchLink } from '@/utils/shouldPrefetchLink';

/**
 * tina.io buttons (#4964): three levels, one size. Pick a `level`; add only
 * layout classes (margin, width, alignment) through `className`. Colours,
 * radius, height and type come from the level. See components/styles/buttons.ts.
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  level?: ButtonLevel;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

/** The trailing arrow on buttons that go somewhere. */
export const ButtonArrow = () => (
  <BiArrowBack
    aria-hidden="true"
    className="h-[1.125em] w-auto -mr-1 rotate-180 opacity-70"
  />
);

export const Button = ({
  level = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) => (
  <button type={type} className={cn(BUTTON[level], className)} {...props}>
    {children}
  </button>
);

interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  link?: string;
  level?: ButtonLevel;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const LinkButton = ({
  link = '/',
  level = 'primary',
  className = '',
  children,
  ...props
}: LinkButtonProps) => {
  const externalLink = link.startsWith('http');
  const classes = cn(BUTTON[level], className);

  // Same-page anchors go through a plain <a>: Next 14 handles hash-only Link
  // clicks with scrollIntoView, which Chromium silently cancels while the
  // document's `scroll-behavior: smooth` is in flight, so the hash updates
  // but the page never moves. Native anchor navigation is reliable.
  if (link.startsWith('#')) {
    return (
      <a href={link} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={link}
      prefetch={shouldPrefetchLink(link)}
      className={classes}
      {...props}
      target={externalLink ? '_blank' : props.target}
      rel={externalLink ? 'noopener noreferrer' : props.rel}
    >
      {children}
    </Link>
  );
};

/**
 * A link with no button chrome, for card grids that list actions as text.
 * It reads as a standalone text link, so it takes EYEBROW_LINK.
 */
export const FlushButton = ({
  link = '/',
  className = '',
  children,
  ...props
}: LinkButtonProps) => (
  <Link
    href={link}
    prefetch={shouldPrefetchLink(link)}
    className={cn(
      EYEBROW_LINK,
      'inline-flex items-center gap-1.5 py-2',
      className,
    )}
    {...props}
  >
    {children}
  </Link>
);

/** A button that opens a modal; the caller owns the dialog. */
export const ModalButton = Button;

/** A row of buttons: stacked full width on phones, side by side from sm. */
export const ButtonGroup = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn(BUTTON_GROUP, className)}>{children}</div>;
