'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useEditState } from 'tinacms/dist/react';
import { LinkButton } from '@/component/ui/Button';
import TinaIconSvg from '../public/svg/tina-icon.svg';

const hasTinaSession = () => {
  const raw = window.localStorage.getItem('tinacms-auth');
  if (!raw) {
    return false;
  }
  try {
    const auth: unknown = JSON.parse(raw);
    return (
      typeof auth === 'object' &&
      auth !== null &&
      'access_token' in auth &&
      Boolean(auth.access_token)
    );
  } catch {
    return false;
  }
};

const AdminLink = () => {
  const { edit } = useEditState();
  const pathname = usePathname();
  const [showAdminLink, setShowAdminLink] = useState(false);

  useEffect(() => {
    setShowAdminLink(!edit && hasTinaSession());
  }, [edit]);

  if (!showAdminLink) {
    return null;
  }

  return (
    <LinkButton
      link={`/admin/index.html#/~${pathname}`}
      reloadDocument
      className="shrink-0"
    >
      <TinaIconSvg aria-hidden="true" className="h-5 w-auto fill-current" />
      Edit ✏️
    </LinkButton>
  );
};

export default AdminLink;
