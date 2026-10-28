import type { ReactNode } from 'react';
import { ImCross } from 'react-icons/im';
import { IoIosWarning } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import { BODY_SMALL, SURFACE } from '@/component/styles/typography';

export type StatusType = 'success' | 'warning' | 'error';

const ICON = {
  success: TiTick,
  warning: IoIosWarning,
  error: ImCross,
} as const;

/**
 * The result of a form action, in a tinted box: success, warning or error.
 * The surface sets the fill, border and text colour, and the icon follows the
 * text, so a message can't pass for body copy. Picked by design (Oct 2026).
 */
export const StatusMessage = ({
  type,
  className = '',
  children,
}: {
  type: StatusType;
  className?: string;
  children: ReactNode;
}) => {
  const Icon = ICON[type];
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`${SURFACE[type]} ${BODY_SMALL} flex items-start gap-2 rounded-md border px-3 py-2 ${className}`}
    >
      <Icon className="mt-1 size-3.5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">{children}</div>
    </div>
  );
};
