import { BODY_SMALL, CODE } from '@/component/styles/typography';
import type { RoleGuide } from '@/component/styles/typography.guide';
import { Example } from './Example';
import { GuideTable } from './GuideTable';

export type RoleTableProps = {
  roles: RoleGuide[];
  /** Where the link examples point, usually the group's own anchor. */
  href: string;
};

/**
 * A group of type roles as specimen and spec: each one's example on the left,
 * its name, use and what not to use it for stacked on the right.
 */
export const RoleTable = ({ roles, href }: RoleTableProps) => (
  <GuideTable
    layout="spec"
    columns={['Example', 'Role', 'Use for', 'Not for']}
    rows={roles.map((role) => ({
      key: role.name,
      cells: [
        <Example key="example" role={role} href={href} />,
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
