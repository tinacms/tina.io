declare global {
    interface Window {
      dataLayer: any[];
    }
  }
  
  export const initializeGTM = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });
  
    const script = document.createElement('script');
    script.id = 'gtag-base';
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${process.env.GTM_ID}`;
    document.head.appendChild(script);
  };
  