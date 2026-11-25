import { BODY_SMALL, CODE } from '@/component/styles/typography';
import type { RoleGuide } from '@/component/styles/typography.guide';
import { Example } from './Example';
import { GuideTable } from './GuideTable';

export type RoleTableProps = {
  roles: RoleGuide[];
  /** Where the link examples point, usually the group's own anchor. */
  href: string;
};

/** A group of type roles: each one's example, name, use and what not to use it for. */
export const RoleTable = ({ roles, href }: RoleTableProps) => (
  <GuideTable
    columns={['Example', 'Role', 'Use for', 'Not for']}
    widths={['w-5/12', 'w-1/6', 'w-1/4', 'w-1/6']}
    rows={roles.map((role) => ({
      key: role.name,
      cells: [
        <div key="example" className="wrap-anywhere">
          <Example role={role} href={href} />
        </div>,
        <p key="role" className={`${CODE} wrap-anywhere`}>
          {role.name}
        </p>,
        <p key="use" className={BODY_SMALL}>
          {role.useFor}
        </p>,
        role.notFor && (
          <p key="not" className={BODY_SMALL}>
            {role.notFor.job} →{' '}
            <span className={CODE}>{role.notFor.instead}</span>
          </p>
        ),
      ],
    }))}
  />
);
