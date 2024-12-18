'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

const ConsentManager = () => {
  useEffect(() => {
    const consentGiven = Cookies.get('consentGiven');
    if (consentGiven) JSON.parse(consentGiven);
  }, []);

  return null;
};

export default ConsentManager;
