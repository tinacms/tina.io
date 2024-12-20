'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import HotjarScript from './HotjarScript';
import ClarityScript from './ClarityScript';

export default function ClientTracking() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const consentCookie = Cookies.get('consentGiven');
    if (consentCookie) {
      const consentState = JSON.parse(consentCookie);
      setConsentGiven(Boolean(consentState));
    }
  }, []);

  return (
    <>
      {consentGiven && (
        <>
          <HotjarScript />
          <ClarityScript />
        </>
      )}
    </>
  );
}
