'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

import '../../../styles/tailwind.css';
import { TinaIcon } from '../../logo';
import { DynamicLink } from '../../ui';
import { footerLinksZh, footerNavZh } from './constants';
import { SocialIcon } from './social-icon';
import { SubscriptionForm } from './subscription-form';

const linkStyles =
  'inline-block drop-shadow-sm relative opacity-90 hover:opacity-100 text-white uppercase text-lg lg:text-xl font-ibm-plex transition duration-150 ease-out hover:-translate-y-px hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] active:translate-y-px hover:-translate-x-px active:translate-x-px';

interface FooterItem {
  id?: string;
  href?: string;
  label: string;
  items?: FooterItem[];
  _template?: string;
}

interface FooterColumn {
  header: string;
  footerItem: FooterItem[];
}

interface FooterData {
  Column1: FooterColumn;
  Column2: FooterColumn;
  Column3: FooterColumn;
  Column4: {
    footerItem: FooterItem[];
  };
}

const LinkGroup = React.memo(
  ({ item }: { item: { items: FooterItem[]; label: string } }) => {
    const [open, setOpen] = React.useState(false);

    return (
      <details
        className={`${linkStyles} cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <summary className="hover:-translate-y-px hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] active:translate-y-px hover:-translate-x-px active:translate-x-px hover:opacity-100 cursor-pointer">
          {item.label}
        </summary>
        <div className="p-4">
          {item.items.map((subItem, index) => (
            <div key={index}>
              <DynamicLink href={subItem.href || ''} passHref>
                <div className="hover:-translate-y-px hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] active:translate-y-px hover:-translate-x-px active:translate-x-px hover:opacity-100 cursor-pointer">
                  {subItem.label}
                </div>
              </DynamicLink>
            </div>
          ))}
        </div>
      </details>
    );
  },
);

LinkGroup.displayName = 'LinkGroup';

export const LinkItem = React.memo(({ item }: { item: FooterItem }) => {
  const { href, label } = item;

  return (
    <DynamicLink href={href || ''} passHref>
      <div className={linkStyles}>{label}</div>
    </DynamicLink>
  );
});

LinkItem.displayName = 'LinkItem';

const FooterLink = React.memo(
  ({ link, label }: { link: string; label: string }) => {
    return (
      <Link
        href={link || ''}
        className="transition ease-out duration-150 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] hover:opacity-100 opacity-70 whitespace-nowrap"
        passHref
      >
        {label}
      </Link>
    );
  },
);

FooterLink.displayName = 'FooterLink';

export function Footer({ footerData }: { footerData: FooterData }) {
  const pathName = usePathname();
  const isZhPath = pathName?.includes('/zh') || false;

  const { socialLinks, currentFooterNav, currentFooterLinks, modalButton } =
    useMemo(() => {
      const socialLinks =
        footerData.Column4.footerItem.filter(
          (item) => item._template === 'socialLink',
        ) || [];

      const currentFooterNav = isZhPath
        ? footerNavZh
        : [footerData.Column1, footerData.Column2, footerData.Column3];

      const currentFooterLinks = isZhPath
        ? footerLinksZh
        : footerData.Column4.footerItem.filter(
            (item) => item._template === 'stringItem',
          );

      const modalButton = footerData.Column4.footerItem.find(
        (item) => item._template === 'modalButton',
      );

      return { socialLinks, currentFooterNav, currentFooterLinks, modalButton };
    }, [footerData, isZhPath]);

  return (
    <div>
      {/* Footer Top */}
      <div className="bg-[url('/svg/orange-bg.svg')] bg-cover bg-center">
        <div className="px-6 md:mx-auto max-w-7xl flex flex-col md:flex-row w-full justify-between items-start py-8 lg:py-16 lg:px-8">
          <div className="max-w-[15%] flex-1 drop-shadow-sm">
            <TinaIcon color="white" />
          </div>
          <div className="flex-1 flex flex-col py-2 lg:py-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentFooterNav.map((item, index) => {
              const { header, footerItem } = item;
              return (
                <div
                  key={`footer-nav-${header}-${index}`}
                  className="flex flex-col items-stretch justify-start gap-2"
                >
                  <p className="uppercase text-orange-100 font-bold -mt-1">
                    {header}
                  </p>
                  {footerItem.map((item, itemIndex) => {
                    return item.items ? (
                      <LinkGroup
                        key={`link-group-${item.label}-${itemIndex}`}
                        item={item}
                      />
                    ) : (
                      <LinkItem
                        key={`link-item-${item.label}-${itemIndex}`}
                        item={item}
                      />
                    );
                  })}
                </div>
              );
            })}
            {modalButton && modalButton._template === 'modalButton' && (
              <SubscriptionForm props={modalButton} />
            )}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-linear-to-br from-orange-600 via-orange-800 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto flex justify-between flex-col lg:flex-row w-full lg:items-center py-8 gap-6 px-2 lg:px-8">
          <SocialIcon socialLinks={socialLinks} />
          <div className="ml-5 flex drop-shadow-sm flex-wrap gap-6 md:ml-5">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {currentFooterLinks.map((item, index) => {
                const { id, href, label } = item;
                return (
                  <FooterLink
                    key={`footer-link-${id || index}`}
                    link={href || ''}
                    label={label}
                  />
                );
              })}
            </div>
            <div>
              <p>
                &copy; TinaCMS 2019–
                {new Date().getFullYear()}
              </p>
            </div>
            {isZhPath && (
              <div>
                <p>
                  网站备案号:{' '}
                  <a
                    href="https://beian.miit.gov.cn/#/Integrated/index"
                    className="transition-all duration-200 hover:underline hover:opacity-100 opacity-80"
                  >
                    浙ICP备20009588号-5
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
