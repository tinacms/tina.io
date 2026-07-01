import Image from 'next/image';

export const SocialIcon = ({ socialLinks }) => {
  return (
    <div className="flex justify-center md:justify-start md:ml-5 lg:items-start gap-6 drop-shadow-sm lg:ml-0 !items-center">
      {socialLinks.map((socialLink, _index) =>
        socialLink.label === 'WeChat' ? (
          <WeChatIcon key="wechat" socialLink={socialLink} />
        ) : (
          <SocialLink key={socialLink.href} link={socialLink.href}>
            <Image
              src={socialLink.image}
              alt={socialLink.label}
              width={14}
              height={14}
              className="w-6 h-auto"
            />
          </SocialLink>
        ),
      )}
    </div>
  );
};

const WeChatIcon = ({ socialLink }) => {
  return (
    <div className="relative group">
      <button
        className="transition ease-out duration-150 opacity-80 hover:opacity-100 flex items-center gap-2 font-ibm-plex cursor-pointer"
        aria-label="WeChat QR Code"
        type="button"
      >
        <Image
          src="/WeChat-QRcode.jpg"
          alt="WeChat QR Code"
          width={200}
          height={200}
          priority
          className="block w-[200px] h-[200px]"
        />
      </button>
      {/* QR code popup */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-50 w-max">
        <div className="bg-white rounded-lg py-2 px-0.5 shadow-xl border border-gray-100">
          <Image
            src={socialLink.image}
            alt={socialLink.label}
            width={14}
            height={14}
            className="w-6 h-auto"
          />
        </div>
        {/* arrow */}
        <div className="w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45 mx-auto -mt-1.5 shadow-sm" />
      </div>
    </div>
  );
};

const SocialLink = ({ link, children }) => {
  return (
    <a
      className="transition ease-out duration-150 opacity-80 hover:opacity-100 flex items-center gap-2 font-ibm-plex"
      href={link || ''}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
