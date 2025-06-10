'use client';

import React from "react";
import { useEffect } from "react";
import { useEditState } from 'tinacms/dist/react';
import { RxCross1 } from "react-icons/rx";


const AdminLink = () => {
  const { edit } = useEditState();
  const [showAdminLink, setShowAdminLink] = React.useState(false);

  useEffect(() => {
    setShowAdminLink(
      !edit &&
        JSON.parse((window.localStorage.getItem('tinacms-auth') as any) || '{}')
          ?.access_token
    );
  }, [edit]);

  const handleDismiss = () => {
    setShowAdminLink(false);
  };

  return (
    <>
      {showAdminLink && (
        <div className="fixed top-[88px] right-16 flex items-center justify-between bg-blue-500 text-white px-3 py-1 rounded-full z-50">
          <a
            href={`/admin/index.html#/~${window.location.pathname}`}
            className="text-xs"
          >
            Edit This Page
          </a>
          <button onClick={handleDismiss} className="ml-2 text-sm">
            <RxCross1/>
          </button>
        </div>
      )}
    </>
  );
};

export default AdminLink;