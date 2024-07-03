declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const initializeGTM = (consentState: {
  ad_storage: boolean;
  ad_personalization: boolean;
  analytics_storage: boolean;
  ad_user_data: boolean;
}) => {
  // window.dataLayer = window.dataLayer || [];
  // window.dataLayer.push({
  //   event: 'consent_update',
  //   ad_storage: consentState.ad_storage ? 'granted' : 'denied',
  //   ad_personalization: consentState.ad_personalization ? 'granted' : 'denied',
  //   analytics_storage: consentState.analytics_storage ? 'granted' : 'denied',
  //   ad_user_data: consentState.ad_user_data ? 'granted' : 'denied',
  // });

};
