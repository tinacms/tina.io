import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { initializeGTM } from 'utils/gtm';
import Link from 'next/link';

const ConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentGiven = Cookies.get('consentGiven');
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('consentGiven', 'true', { expires: 365 });
    setIsVisible(false);
    initializeGTM();
  };

  const handleDecline = () => {
    Cookies.set('consentGiven', 'false', { expires: 365 });
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed bottom-0 w-full bg-gradient-to-br from-orange-400 to-orange-600 text-white p-4 text-center z-50">
        <p>
          We use cookies to improve your experience. By continuing, you agree to our use of cookies.{' '}
          <Link href="/privacy-notice" className="text-white underline">
            Learn More
          </Link>
        </p>
        <div className="mt-2">
          <button
            onClick={handleAccept}
            className="mx-2 px-4 py-2 bg-white text-[#ea6d43] rounded-3xl"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="mx-2 px-4 py-2"
          >
            Decline
          </button>
        </div>
      </div>
    )
  );
};

export default ConsentBanner;
