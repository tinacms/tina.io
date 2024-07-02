import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';
import { initializeGTM } from 'utils/gtm';

const ConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [consent, setConsent] = useState(() => {
    const consentGiven = Cookies.get('consentGiven');
    return consentGiven ? JSON.parse(consentGiven) : {
      ad_storage: false,
      ad_personalization: false,
      analytics_storage: false,
      ad_user_data: false,
    };
  });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const consentGiven = Cookies.get('consentGiven');
    if (!consentGiven) {
      setIsVisible(true);
    } else {
      const consentState = JSON.parse(consentGiven);
      initializeGTM(consentState);
    }
  }, []);

  const handleConsentChange = (e) => {
    setConsent({
      ...consent,
      [e.target.name]: e.target.checked,
    });
  };

  const handleAccept = () => {
    Cookies.set('consentGiven', JSON.stringify(consent), { expires: 365 });
    setIsVisible(false);
    initializeGTM(consent);
  };

  const handleDecline = () => {
    const deniedConsent = {
      ad_storage: false,
      ad_personalization: false,
      analytics_storage: false,
      ad_user_data: false,
    };
    Cookies.set('consentGiven', JSON.stringify(deniedConsent), { expires: 365 });
    setIsVisible(false);
    initializeGTM(deniedConsent);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    isVisible && (
      <div className="fixed bottom-0 w-full bg-gradient-to-br from-orange-400 to-orange-600 text-white p-6 text-center z-50">
        <p className="pb-2">
          We use cookies to improve your experience. By continuing, you agree to our use of cookies.{' '}
          <Link href="/privacy-notice" className="text-white underline">
            Learn More
          </Link>
        </p>
        <div className="flex justify-center mt-2">
          <button
            onClick={handleAccept}
            className="font-tuner text-sm mx-2 px-4 py-2 bg-white text-[#ea6d43] rounded-3xl hover:bg-gray-200"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="mx-2 px-4 py-2 font-tuner text-sm border-2 border-white rounded-3xl hover:bg-orange-600"
          >
            Decline
          </button>
          <button
            id="dropdownToggleButton"
            data-dropdown-toggle="dropdownToggle"
            className="text-[#ea6d43] bg-white font-tuner rounded-3xl text-sm px-5 py-2.5 text-center inline-flex items-center mx-2 hover:bg-gray-200"
            onClick={toggleDropdown}
          >
            Customize
            <FaChevronDown className="pl-1" />
          </button>
        </div>
        {isDropdownVisible && (
          <div
            id="dropdownToggle"
            className="z-10 divide-y divide-gray-100 rounded-lg shadow-lg w-72 mt-2 mx-auto bg-white"
          >
            <ul
              className="p-3 space-y-1 text-sm text-gray-700"
              aria-labelledby="dropdownToggleButton"
            >
              <li>
                <div className="flex p-2 rounded hover:bg-gray-100">
                  <label className="inline-flex items-center w-full cursor-pointer">
                    <input
                      type="checkbox"
                      name="ad_storage"
                      checked={consent.ad_storage}
                      onChange={handleConsentChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-tuner">
                      Ad Storage
                    </span>
                  </label>
                </div>
              </li>
              <li>
                <div className="flex p-2 rounded hover:bg-gray-100">
                  <label className="inline-flex items-center w-full cursor-pointer">
                    <input
                      type="checkbox"
                      name="ad_personalization"
                      checked={consent.ad_personalization}
                      onChange={handleConsentChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-tuner">
                      Ad Personalization
                    </span>
                  </label>
                </div>
              </li>
              <li>
                <div className="flex p-2 rounded hover:bg-gray-100">
                  <label className="inline-flex items-center w-full cursor-pointer">
                    <input
                      type="checkbox"
                      name="analytics_storage"
                      checked={consent.analytics_storage}
                      onChange={handleConsentChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-tuner">
                      Analytics Storage
                    </span>
                  </label>
                </div>
              </li>
              <li>
                <div className="flex p-2 rounded hover:bg-gray-100">
                  <label className="inline-flex items-center w-full cursor-pointer">
                    <input
                      type="checkbox"
                      name="ad_user_data"
                      checked={consent.ad_user_data}
                      onChange={handleConsentChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-tuner">
                      Ad User Data
                    </span>
                  </label>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  );
};

export default ConsentBanner;
