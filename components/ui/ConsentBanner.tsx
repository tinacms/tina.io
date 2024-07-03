import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { FaChevronUp } from 'react-icons/fa';

const ConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consent, setConsent] = useState(() => {
    const consentGiven = Cookies.get('consentGiven');
    return consentGiven
      ? JSON.parse(consentGiven)
      : {
          ad_storage: false,
          ad_personalization: false,
          analytics_storage: false,
          ad_user_data: false,
        };
  });

  useEffect(() => {
    const consentGiven = Cookies.get('consentGiven');
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const handleConsentChange = (e) => {
    setConsent({
      ...consent,
      [e.target.name]: e.target.checked,
    });
  };

  const handleAcceptAll = () => {
    const acceptedConsent = {
      ad_storage: true,
      ad_personalization: true,
      analytics_storage: true,
      ad_user_data: true,
    };
    Cookies.set('consentGiven', JSON.stringify(acceptedConsent), {
      expires: 365,
    });
    setConsent(acceptedConsent);
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    const deniedConsent = {
      ad_storage: false,
      ad_personalization: false,
      analytics_storage: false,
      ad_user_data: false,
    };
    Cookies.set('consentGiven', JSON.stringify(deniedConsent), { expires: 365 });
    setIsVisible(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsVisible(false);
  };

  const closeModal = () => {
    Cookies.set('consentGiven', JSON.stringify(consent), { expires: 365 });
    setIsModalOpen(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-0 w-full bg-gradient-to-br from-orange-400 to-orange-600 text-white p-6 text-center z-50">
          <p className="pb-2">
            We use cookies to improve your experience. By continuing, you agree to our use of cookies.{' '}
            <Link href="/privacy-notice" className="text-white underline">
              Learn More
            </Link>
          </p>
          <div className="flex justify-center mt-2">
            <button
              onClick={handleAcceptAll}
              className="font-tuner text-sm mx-2 px-4 py-2 bg-white text-[#ea6d43] rounded-3xl hover:bg-gray-200"
            >
              Accept All
            </button>
            <button
              onClick={handleDeclineAll}
              className="mx-2 px-4 py-2 font-tuner text-sm border-2 border-white rounded-3xl hover:bg-orange-600"
            >
              Reject All
            </button>
            <button
              className="text-[#ea6d43] bg-white font-tuner rounded-3xl text-sm px-5 py-2.5 text-center inline-flex items-center mx-2 hover:bg-gray-200"
              onClick={openModal}
            >
              Customize
              <FaChevronUp className="pl-1" />
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded-lg w-11/12 sm:w-96 md:w-2/3 lg:w-1/3">
            <h2 className="text-xl md:text-xl lg:text-3xl text-orange-600 font-tuner mb-4 text-center">
              Customize your Consent Preferences
            </h2>
            <div className="lg:flex lg:justify-center lg:ml-auto lg:mr-auto">
              <ul className="p-3 space-y-1 text-sm text-gray-700">
                <li>
                  <div className="flex p-2 rounded">
                    <label className="inline-flex items-center w-full cursor-pointer">
                      <input
                        type="checkbox"
                        name="ad_storage"
                        checked={consent.ad_storage}
                        onChange={handleConsentChange}
                        className="sr-only peer"
                      />
                      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                      <span className="ms-3 font-semibold text-sm">
                        Ad Storage
                      </span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex p-2 rounded">
                    <label className="inline-flex items-center w-full cursor-pointer">
                      <input
                        type="checkbox"
                        name="ad_personalization"
                        checked={consent.ad_personalization}
                        onChange={handleConsentChange}
                        className="sr-only peer"
                      />
                      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                      <span className="ms-3 font-semibold text-sm">
                        Ad Personalization
                      </span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex p-2 rounded">
                    <label className="inline-flex items-center w-full cursor-pointer">
                      <input
                        type="checkbox"
                        name="analytics_storage"
                        checked={consent.analytics_storage}
                        onChange={handleConsentChange}
                        className="sr-only peer"
                      />
                      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                      <span className="ms-3 font-semibold text-sm">
                        Analytics Storage
                      </span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex p-2 rounded">
                    <label className="inline-flex items-center w-full cursor-pointer">
                      <input
                        type="checkbox"
                        name="ad_user_data"
                        checked={consent.ad_user_data}
                        onChange={handleConsentChange}
                        className="sr-only peer"
                      />
                      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                      <span className="ms-3 font-semibold text-sm">
                        Ad User Data
                      </span>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-orange-600 text-white font-tuner rounded-3xl mx-auto block"
            >
              Save my Preferences
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsentBanner;
