declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface Window {
  gtag?: (
    command: string,
    eventName: string,
    params?: Record<string, unknown>,
  ) => void;
}
