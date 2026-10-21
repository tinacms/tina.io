'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useEditState } from 'tinacms/dist/react';
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
    <a
      href={`/admin/index.html#/~${pathname}`}
      className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
    >
      <TinaIconSvg className="h-5 w-auto fill-white" />
      Edit ✏️
    </a>
  );
};

export default AdminLink;
