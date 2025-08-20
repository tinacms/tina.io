interface FooterLinkWrapperProps {
  children?: any;
  data?: {
    isFullscreen?: boolean;
  };
}

// Specialized wrapper for footer link pages (security, telemetry, terms-of-service, privacy-notice)
export const FooterLinkWrapper = (props: FooterLinkWrapperProps) => {
  const { children, data } = props;
  return (
    <div
      className={
        data?.isFullscreen
          ? 'md:min-h-[70vh] pt-28 md:pt-24 md:pb-36 pb-0 flex items-center justify-center w-full'
          : 'pt-0'
      }
    >
      {children}
    </div>
  );
};

//Width Limit Container (reused from main Container.tsx)
interface FooterLinkContainerProps {
  children?: any;
  width?: 'medium' | 'narrow' | 'wide';
  center?: boolean;
}

export const FooterLinkContainer = ({
  width = 'medium',
  center = false,
  children,
}: FooterLinkContainerProps) => {
  return (
    <>
      <div className={['container', width, center ? 'center' : ''].join(' ')}>
        {children}
      </div>
      <style jsx>{`
        .container {
          margin: 0 auto;
          padding: 0 20px;

          @media (min-width: 800px) {
            width: 80%;
          }
        }

        .wide {
          max-width: 1500px;

          @media (min-width: 600px) {
            width: 100%;
          }

          @media (min-width: 1000px) {
            width: 92%;
          }
        }

        .medium {
          max-width: 1350px;

          @media (min-width: 600px) {
            width: 90%;
          }

          @media (min-width: 1000px) {
            width: 80%;
          }
        }

        .narrow {
          max-width: 900px;

          @media (min-width: 600px) {
            width: 60%;
          }

          @media (min-width: 1000px) {
            width: 55%;
          }
        }

        .center {
          text-align: center;
        }
      `}</style>
    </>
  );
};

