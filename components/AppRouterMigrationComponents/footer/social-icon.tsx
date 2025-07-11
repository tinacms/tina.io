import Image from 'next/image';

export const SocialIcon = ({ socialLinks }) => {
  return (
    <div className="flex justify-center md:justify-start md:ml-5 lg:items-start gap-6 drop-shadow-sm lg:ml-0 !items-center">
      {socialLinks.map((socialLink, _index) => (
        <SocialLink key={socialLink.href} link={socialLink.href}>
          <Image
            src={socialLink.image}
            alt={socialLink.label}
            width={14}
            height={14}
            className="w-6 h-auto"
          />
        </SocialLink>
      ))}
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
