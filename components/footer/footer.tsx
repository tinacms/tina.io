'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo, useState } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import '../../styles/tailwind.css';
import { TinaIcon } from '../logo';
import { ContactForm } from '../modals/ContactForm';
import { DynamicLink } from '../ui';
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
            <div
              key={
                subItem.id ||
                subItem.href ||
                subItem.label ||
                `sub-item-${index}`
              }
            >
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
  const [isContactOpen, setIsContactOpen] = useState(false);

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
    <footer>
      {/* Footer Top */}
      <div className="bg-[url('/svg/orange-bg.svg')] bg-cover bg-center">
        {modalButton && modalButton._template === 'modalButton' && (
          <div className="px-6 md:mx-auto max-w-7xl w-full pt-8 pb-6 lg:hidden">
            <SubscriptionForm props={modalButton} />
          </div>
        )}
        <div className="px-6 md:mx-auto max-w-7xl w-full py-8 lg:py-16 lg:px-8">
          <div className="flex flex-row gap-6">
            <div className="hidden md:block max-w-[15%] flex-1 drop-shadow-sm">
              <TinaIcon color="white" />
            </div>
            <div className="flex-1 grid grid-cols-2 py-2 lg:py-0 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
              {currentFooterNav.map((item, _columnIndex) => {
                const { header, footerItem } = item;
                return (
                  <div
                    key={`footer-nav-${header}-${item.id}`}
                    className="flex flex-col items-stretch justify-start gap-2"
                  >
                    <p className="uppercase text-orange-300/70 text-xs font-semibold tracking-wider -mt-1">
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
                <div className="hidden lg:block">
                  <SubscriptionForm props={modalButton} />
                </div>
              )}
              <div className="flex items-end justify-end md:hidden">
                <div className="w-12 drop-shadow-sm">
                  <TinaIcon color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col items-center lg:flex-row lg:justify-between w-full lg:items-start py-8 gap-6 px-6 lg:px-8 text-white">
          <SocialIcon socialLinks={socialLinks} />
          <div className="flex drop-shadow-sm flex-wrap justify-center gap-x-6 gap-y-2 lg:justify-end">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
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
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="transition ease-out duration-150 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] hover:opacity-100 opacity-70 whitespace-nowrap"
              >
                Contact Us
              </button>
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

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="!max-w-2xl w-[90vw] !max-h-[90vh] !p-0 !duration-0">
          <ContactForm />
        </DialogContent>
      </Dialog>

        </svg>
        <span className="-ml-1">{', '}</span>
        Australia&apos;s leading software consultants
      </a>
      <p className="relative z-10 text-white/65 text-sm md:text-base font-bold">
        &copy; TinaCMS 2019–
        {new Date().getFullYear()}
      </p>
    </div>
    </footer>
  );
}