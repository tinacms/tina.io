'use client';

import React, { useEffect, useState } from 'react';
import { useEditState } from 'tinacms/dist/react';

export const AdminLink = () => {
  const { edit } = useEditState();
  const [showAdminLink, setShowAdminLink] = useState(false);

  useEffect(() => {
    setShowAdminLink(
      !edit &&
        JSON.parse((window.localStorage.getItem('tinacms-auth') as any) || '{}')?.access_token
    );
  }, [edit]);

  return showAdminLink ? (
    <div className="fixed top-4 right-4 flex items-center justify-between bg-blue-500 text-white px-3 py-1 rounded-full z-50">
      <a
        href={`/admin/index.html#/~${window.location.pathname}`}
        className="text-xs"
      >
        Edit This Page
      </a>
      <button onClick={() => setShowAdminLink(false)} className="ml-2 text-sm">
        xx
      </button>
    </div>
  ) : null;
};
