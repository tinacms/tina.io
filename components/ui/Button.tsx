import Link from 'next/link';
import {
  BUTTON,
  BUTTON_GROUP,
  type ButtonLevel,
} from '@/component/styles/buttons';
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
  /** A full page load instead of a client-side route change (another origin, /admin). */
  reloadDocument?: boolean;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

/**
 * A button that goes somewhere. External links open in a new tab unless you
 * pass a `target`.
 */
export const LinkButton = ({
  link = '/',
  level = 'primary',
  reloadDocument = false,
  className = '',
  target,
  rel,
  children,
  ...props
}: LinkButtonProps) => {
  const classes = cn(BUTTON[level], className);
  const external = /^https?:\/\//.test(link);
  const linkTarget = target ?? (external ? '_blank' : undefined);
  const linkRel =
    rel ?? (linkTarget === '_blank' ? 'noopener noreferrer' : undefined);

  // Same-page anchors go through a plain <a>: Next 14 handles hash-only Link
  // clicks with scrollIntoView, which Chromium silently cancels while the
  // document's `scroll-behavior: smooth` is in flight, so the hash updates
  // but the page never moves. Native anchor navigation is reliable.
  if (reloadDocument || link.startsWith('#')) {
    return (
      <a
        href={link}
        className={classes}
        target={linkTarget}
        rel={linkRel}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={link}
      prefetch={shouldPrefetchLink(link)}
      className={classes}
      target={linkTarget}
      rel={linkRel}
      {...props}
    >
      {children}
    </Link>
  );
};

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
