'use client';

import Cookies from 'js-cookie';
import Script from 'next/script';
import React, { useEffect } from 'react';

export default function HotjarScript() {
  useEffect(() => {
    const consentGiven = Cookies.get('consentGiven');
    if (consentGiven) {
      const consentState = JSON.parse(consentGiven);
    }
  });
  return (
    <Script id="hotjar" strategy="lazyOnload">
      {`
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:5190939,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}
    </Script>
  );
}
