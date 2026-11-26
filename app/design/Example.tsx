import {
  BODY_SMALL,
  CARD_TITLE,
  HIGHLIGHT,
  LABEL,
  LINE,
  LINK,
  SHIMMER,
  SUBTLE_LINK,
  SURFACE,
  TITLE_LINK,
} from '@/component/styles/typography';
import { type RoleGuide, roleClass } from '@/component/styles/typography.guide';

export type ExampleProps = {
  role: RoleGuide;
  /** Where the example links to, when the role is a link. */
  href: string;
};

/**
 * A role's example, drawn through the real role. Anything clickable on the
 * site is a real link here too, so it shows the pointer and its hover state.
 */
export const Example = ({ role, href }: ExampleProps) => {
  const cls = roleClass(role.name);
  switch (role.exampleKind) {
    case 'link':
      return (
        <a className={cls} href={href}>
          {role.example}
        </a>
      );
    case 'inline-link':
      return (
        <p className={BODY_SMALL}>
          Start a{' '}
          <a className={LINK} href={href}>
            {role.example}
          </a>
        </p>
      );
    case 'heading-link':
      return (
        <a className="inline-block" href={href}>
          <span className={`${CARD_TITLE} ${TITLE_LINK}`}>{role.example}</span>
        </a>
      );
    case 'subtle-link':
      return (
        <a className={`${BODY_SMALL} ${SUBTLE_LINK}`} href={href}>
          {role.example}
        </a>
      );
    case 'highlight':
      return (
        <p className={BODY_SMALL}>
          The best <span className={HIGHLIGHT}>{role.example}</span> CMS
        </p>
      );
    case 'shimmer':
      return (
        <a
          className={`${SURFACE.info} ${LABEL} inline-flex rounded-full border px-3.5 py-1.5`}
          href={href}
        >
          <span className={SHIMMER}>{role.example}</span>
        </a>
      );
    case 'field':
      return (
        <input
          className={`${cls} h-10 w-full max-w-xs rounded-md border ${LINE.subtle} px-3`}
          placeholder={role.example}
          aria-label="Example field"
        />
      );
    default:
      return <p className={cls}>{role.example}</p>;
  }
};
