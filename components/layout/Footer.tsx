import React, { useEffect } from 'react';
import TwitterIconSvg from '../../public/svg/twitter-icon.svg';
import XIconSvg from '../../public/svg/x-icon.svg';
import GithubIconSvg from '../../public/svg/github-icon.svg';
import LinkedInIconSvg from '../../public/svg/linkedin-icon.svg';
import YoutubeIconSvg from '../../public/svg/youtube-icon.svg';
import { TinaIcon } from '../../components/logo';
import Link from 'next/link';
import { DynamicLink } from '../../components/ui';
import { BsDiscord } from 'react-icons/bs';
import FooterData from '../../content/footer/Master-Footer.json';

const footerLinks = [
  {
    link: '/security',
    label: 'Security',
  },
  {
    link: '/telemetry',
    label: 'Open Source Telemetry',
  },
  {
    link: '/terms-of-service',
    label: 'Terms of Service',
  },
  {
    link: '/privacy-notice',
    label: 'Privacy Notice',
  },
  {
    link: 'https://github.com/tinacms/tinacms/blob/master/LICENSE',
    label: 'License',
  },
  {
    link: '/docs/support',
    label: 'Support',
  },
];

const LinkGroup = ({ item, isOpen, onClick }: { 
  item: { children: any[]; label: string }; 
  isOpen: boolean; 
  onClick: () => void; 
}) => {
  return (
    <details
      className={`inline-block drop-shadow-sm relative opacity-90 text-white text-lg lg:text-xl font-tuner transition duration-150 ease-out ${isOpen ? 'open' : ''}`}
      open={isOpen}
      onClick={(e) => {
        e.preventDefault(); 
        onClick();
      }}
    >
      <summary className="hover:-translate-y-px hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] active:translate-y-px hover:-translate-x-px active:translate-x-px hover:opacity-100 cursor-pointer">
        {item.label}
      </summary>
      <div className="p-4">
        {item.children.map((subItem, index) => (
          <div key={index}>
            <DynamicLink href={subItem.link} passHref>
              <div className="hover:-translate-y-px hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] active:translate-y-px hover:-translate-x-px active:translate-x-px hover:opacity-100 cursor-pointer">
                {subItem.label}
              </div>
            </DynamicLink>
          </div>
        ))}
      </div>
    </details>
  );
};

export const LinkItem = ({ item }) => {
  const { link, label } = item;

  return (
    <DynamicLink href={link} passHref>
      <div className="inline-block drop-shadow-sm relative opacity-90 hover:opacity-100 text-white text-lg lg:text-xl font-tuner transition duration-150 ease-out hover:-translate-y-px hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] active:translate-y-px hover:-translate-x-px active:translate-x-px">
        {label}
      </div>
    </DynamicLink>
  );
};

const SocialLink = ({ link, children }) => {
  return (
    <a
      className="transition ease-out duration-150 opacity-80 hover:opacity-100 flex items-center gap-2 text-white font-tuner"
      href={link}
      target="_blank"
    >
      {children}
    </a>
  );
};

export const Footer = () => {
  const [openGroups, setOpenGroups] = React.useState<{ [columnIndex: number]: number | null }>({});

  const handleGroupClick = (columnIndex: number, groupIndex: number) => {
    setOpenGroups((prev) => ({
      ...prev,
      [columnIndex]: prev[columnIndex] === groupIndex ? null : groupIndex,
    }));
  };

  return (
    <div>
      {/* Top */}
      <div className="flex flex-col md:flex-row gap-6 w-full justify-between items-start bg-[url('/svg/orange-bg.svg')] bg-cover bg-center px-6 py-8 lg:py-12 lg:px-12 -mt-px">
        <div className="max-w-[20%] flex-1 drop-shadow-sm">
          <TinaIcon color="white" />
        </div>
        <div className="flex-1 flex flex-col py-2 lg:py-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[FooterData.Column1, FooterData.Column2, FooterData.Column3].map((column, columnIndex) => {
            const hasHeader = 'header' in column;
            return (
              <div
                key={columnIndex}
                className="flex flex-col items-stretch justify-start gap-2"
              >
                {hasHeader && (
                  <p className="uppercase text-orange-100 opacity-70 font-bold -mt-1">
                    {column.header}
                  </p>
                )}
                {column.footerItem.map((item, idx) => {
                  return item.items ? (
                    <LinkGroup
                      key={`column-${columnIndex}-group-${idx}`}
                      item={{
                        label: item.label,
                        children: item.items.map((subItem) => ({
                          label: subItem.label,
                          link: subItem.href,
                        })),
                      }}
                      isOpen={openGroups[columnIndex] === idx}
                      onClick={() => handleGroupClick(columnIndex, idx)}
                    />
                  ) : (
                    <LinkItem
                      key={`column-${columnIndex}-item-${idx}`}
                      item={{
                        label: item.label,
                        link: item.href,
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
          {/* Social links column */}
          <div className="flex flex-col lg:items-center">
            <div className="flex flex-col lg:items-start gap-4 drop-shadow-sm">
              {FooterData.Column4.footerItem.map((socialItem, idx) => (
                <SocialLink key={`social-${idx}`} link={socialItem.href}>
                  {socialItem.image ? (
                    <img src={socialItem.image} alt={socialItem.label} className="w-7 h-auto" />
                  ) : null}
                  {socialItem.label}
                </SocialLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-end flex-col lg:flex-row w-full lg:items-center bg-gradient-to-br from-orange-600 via-orange-800 to-orange-900 text-white px-6 py-8 lg:px-18 gap-6">
        <div className="flex drop-shadow-sm flex-wrap gap-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((item, idx) => {
              const { link, label } = item;
              return <FooterLink key={`${label}-${idx}`} link={link} label={label} />;
            })}
          </div>
          <div>
            <p>
              &copy; TinaCMS 2019–
              {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FooterLink = ({ link, label }) => {
  return (
    <Link
      href={link}
      className="transition ease-out duration-150 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] hover:opacity-100 opacity-70 whitespace-nowrap"
      passHref
    >
      {label}
    </Link>
  );
};
