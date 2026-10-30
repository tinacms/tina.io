'use client';
import { init } from '@plausible-analytics/tracker';
import Cookies from 'js-cookie';
import Link from 'next/link';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { FOCUS_RING_PEER } from '@/component/styles/buttons';
import {
  BODY_SMALL,
  CARD_TITLE,
  LABEL,
  LINK,
  ON_DARK,
} from '@/component/styles/typography';
import { plausibleSiteIdForHost } from '@/utils/i18n/domains';
import { Button, ButtonGroup } from './ui/Button';

let plausibleInitialized = false;

const hasAnalyticsConsent = () => {
  const savedConsent = Cookies.get('consentGiven');
  if (!savedConsent) {
    return false;
  }

  try {
    return JSON.parse(savedConsent).analytics_storage === true;
  } catch {
    return false;
  }
};

const initPlausible = () => {
  if (plausibleInitialized || !hasAnalyticsConsent()) {
    return;
  }

  const plausibleSiteId = plausibleSiteIdForHost(window.location.hostname);
  if (!plausibleSiteId) {
    return;
  }

  plausibleInitialized = true;
  init({
    // Keep the country domains on separate Plausible sites for comparison.
    domain: plausibleSiteId,
    endpoint: '/p/e',
  });
};

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

  useEffect(() => {
    initPlausible();
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
    initPlausible();
  };

  const handleDeclineAll = () => {
    const deniedConsent = {
      ad_storage: false,
      ad_personalization: false,
      analytics_storage: false,
      ad_user_data: false,
    };
    Cookies.set('consentGiven', JSON.stringify(deniedConsent), {
      expires: 365,
    });
    setConsent(deniedConsent);
    setIsVisible(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsVisible(false);
  };

  const closeModal = () => {
    Cookies.set('consentGiven', JSON.stringify(consent), { expires: 365 });
    setIsModalOpen(false);
    initPlausible();
  };

  const cancelModal = useCallback(() => {
    setIsModalOpen(false);
    setIsVisible(true);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      cancelModal();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cancelModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscapeKey);

      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isModalOpen, cancelModal]);

  return (
    <>
      {isVisible && (
        <div
          className={`${ON_DARK} fixed flex flex-col gap-4 bottom-0 w-full z-50 bg-linear-to-br from-orange-400 to-orange-600 p-6 text-center justify-center items-center`}
        >
          <p className={`${BODY_SMALL} pb-2`}>
            We use cookies to improve your experience. By continuing, you accept
            our{' '}
            <Link href="/privacy-notice" className={LINK}>
              cookie policy
            </Link>
            .
          </p>
          <ButtonGroup className="sm:justify-center">
            <Button level="primary" onClick={handleAcceptAll}>
              Accept All
            </Button>
            <Button level="tertiary" onClick={handleDeclineAll}>
              Reject All
            </Button>
          </ButtonGroup>
          <button
            type="button"
            className={`${BODY_SMALL} ${LINK} cursor-pointer`}
            onClick={openModal}
          >
            Manage cookies
          </button>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white p-10 rounded-lg w-11/12 sm:w-96 md:w-2/3 lg:w-1/3">
            <h2 className={`${CARD_TITLE} mb-4 text-center`}>
              Customize your Consent Preferences
            </h2>
            <div className="lg:flex lg:justify-center lg:ml-auto lg:mr-auto">
              <ul className={`${BODY_SMALL} p-3 space-y-1`}>
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
                      <div
                        className={`${FOCUS_RING_PEER} relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:rtl:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600`}
                      ></div>
                      <span className={`${LABEL} ms-3`}>Ad Storage</span>
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
                      <div
                        className={`${FOCUS_RING_PEER} relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:rtl:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600`}
                      ></div>
                      <span className={`${LABEL} ms-3`}>
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
                      <div
                        className={`${FOCUS_RING_PEER} relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:rtl:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600`}
                      ></div>
                      <span className={`${LABEL} ms-3`}>Analytics Storage</span>
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
                      <div
                        className={`${FOCUS_RING_PEER} relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:rtl:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600`}
                      ></div>
                      <span className={`${LABEL} ms-3`}>Ad User Data</span>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <ButtonGroup className="mt-4 sm:justify-center">
              <Button level="primary" onClick={closeModal}>
                Save my Preferences
              </Button>
              <Button level="tertiary" onClick={cancelModal}>
                Cancel
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsentBanner;
