'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

import '../../styles/tailwind.css';
import { TinaIcon } from '../logo';
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
            {currentFooterNav.map((item, _index) => {
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
        <div className="max-w-7xl mx-auto flex flex-col items-center lg:flex-row lg:justify-between w-full lg:items-center py-8 gap-6 px-6 lg:px-8 text-white border-t border-white/20">
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

      {/* SSW Banner */}
      <div
        className="group relative flex justify-center overflow-hidden py-6"
        style={{
          backgroundImage: 'linear-gradient(60deg, #000000 0%, #CC4141 50%, #000000 100%)',
        }}
      >
        <div
          className="absolute top-0 -left-1/2 w-[200%] h-full z-[1] transition-transform duration-1000 ease-in-out group-hover:scale-x-[2]"
          style={{
            backgroundImage: 'linear-gradient(60deg, #333333 25%, #CC4141 50%, #333333 75%)',
          }}
        />
        <a
          href="https://www.ssw.com.au"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 px-4 text-center text-white text-sm md:text-base font-bold no-underline hover:no-underline"
        >
          TinaCMS is maintained by
          <svg
            viewBox="0 0 90 60"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block h-[2em] w-auto"
            aria-label="SSW"
          >
            <path d="M80.009 17.1911C75.893 12.4661 69.545 9.43706 62.43 9.43706C55.42 9.43706 49.1639 12.3691 45.049 16.9611C49.15 10.7141 56.1169 6.50906 64.0859 6.21606C64.3089 6.22406 64.5439 6.22906 64.7979 6.24306C65.0999 6.25606 65.42 6.30006 65.773 6.33206C66.467 6.40806 67.247 6.54606 68.08 6.74806C68.902 6.97906 69.795 7.25006 70.68 7.67106C71.565 8.08306 72.4559 8.59806 73.3259 9.21606C74.1919 9.83306 75.0259 10.5401 75.8499 11.3171C76.6629 12.0721 77.3889 12.9221 78.0479 13.8401C78.3759 14.2951 78.6899 14.7701 78.9789 15.2451C79.2699 15.7261 79.5239 16.1951 79.7839 16.7141C79.8589 16.8721 79.932 17.0291 80.009 17.1911Z" />
            <path d="M82.773 45.8201C78.41 50.7071 72.056 53.7831 64.986 53.7831C56.634 53.7831 49.292 49.4961 45.036 43.0081C49.154 47.6081 55.415 50.5471 62.423 50.5471C67.872 50.5471 72.861 48.7741 76.757 45.8221H82.774L82.773 45.8201Z" />
            <path d="M88.809 29.9932V30.0932H84.041C84.031 29.9002 84.016 29.6832 84.009 29.4362C83.952 28.4152 83.882 26.9562 83.669 25.1912C83.445 23.4382 83.086 21.3652 82.313 19.2582C81.928 18.1982 81.453 17.1532 80.864 16.1182C80.589 15.6352 80.266 15.1132 79.932 14.6312C79.604 14.1392 79.251 13.6632 78.875 13.2032C78.139 12.2852 77.305 11.4172 76.409 10.6752C75.54 9.93915 74.621 9.24515 73.689 8.66115C72.755 8.07215 71.798 7.59315 70.861 7.22215C69.929 6.84015 69.005 6.61215 68.148 6.42415C68.017 6.40015 67.878 6.37915 67.75 6.35815C79.607 7.72815 88.809 17.7842 88.809 29.9932Z" />
            <path d="M20.436 30.6051C19.81 29.5661 18.809 28.6991 17.429 27.9981C16.056 27.2921 13.774 26.6021 10.595 25.9151C9.308 25.6481 8.494 25.3531 8.148 25.0511C7.8 24.7461 7.62 24.4101 7.62 24.0331C7.62 23.5231 7.833 23.0861 8.263 22.7261C8.691 22.3681 9.33 22.1881 10.175 22.1881C11.201 22.1881 12.007 22.4271 12.594 22.9091C13.175 23.3921 13.561 24.1661 13.741 25.2251L20.606 24.8211C20.303 22.3801 19.362 20.5991 17.783 19.4781C16.203 18.3571 13.909 17.7971 10.897 17.7971C8.445 17.7971 6.512 18.1111 5.108 18.7261C3.696 19.3391 2.64 20.1891 1.941 21.2631C1.24 22.3401 0.887 23.4831 0.887 24.6941C0.887 26.5371 1.575 28.0501 2.949 29.2431C4.305 30.4321 6.584 31.3871 9.775 32.1011C11.729 32.5291 12.971 32.9881 13.504 33.4671C14.042 33.9471 14.307 34.4921 14.307 35.1091C14.307 35.7481 14.028 36.3181 13.463 36.8011C12.903 37.2871 12.114 37.4261 11.077 37.4261C9.687 37.4261 8.597 37.0561 7.849 36.1011C7.384 35.5171 7.084 34.6581 6.93 33.5351L0 33.9671C0.207 36.3401 1.082 38.3011 2.621 39.8461C4.166 41.3891 6.939 42.1601 10.943 42.1601C13.225 42.1601 15.119 41.8341 16.618 41.1701C18.115 40.5141 19.283 39.5491 20.118 38.2701C20.953 36.9981 21.374 35.6061 21.374 34.0921C21.376 32.8071 21.062 31.6461 20.436 30.6051Z" />
            <path d="M43.824 34.121C43.824 35.601 43.426 36.959 42.622 38.217C42.604 38.242 42.587 38.272 42.57 38.299C42.442 38.496 42.305 38.684 42.154 38.863C41.365 39.865 40.33 40.644 39.066 41.201C37.569 41.859 35.677 42.185 33.393 42.185C29.382 42.185 26.614 41.416 25.068 39.869C23.526 38.33 22.654 36.369 22.448 33.992L29.373 33.558C29.522 34.681 29.832 35.537 30.29 36.129C31.041 37.078 32.114 37.449 33.512 37.449C34.545 37.449 35.343 37.311 35.908 36.824C36.465 36.336 36.754 35.772 36.754 35.131C36.754 34.519 36.483 33.972 35.948 33.49C35.412 33.008 34.174 32.552 32.222 32.121C29.028 31.404 26.749 30.449 25.392 29.263C24.023 28.075 23.334 26.558 23.334 24.717C23.334 23.507 23.685 22.363 24.388 21.286C25.091 20.208 26.142 19.364 27.554 18.745C28.967 18.125 30.895 17.824 33.347 17.824C36.358 17.824 38.657 18.382 40.234 19.5C40.949 20.005 41.536 20.651 41.986 21.433C42.15 21.707 42.295 22.004 42.419 22.315C42.727 23.057 42.938 23.902 43.049 24.841L41.699 24.918L40.627 24.983L36.189 25.241C36.004 24.181 35.624 23.411 35.045 22.925C34.458 22.449 33.651 22.204 32.628 22.204C31.779 22.204 31.145 22.384 30.714 22.745C30.285 23.1 30.071 23.537 30.071 24.057C30.071 24.426 30.241 24.762 30.597 25.063C30.94 25.376 31.753 25.665 33.043 25.93C36.221 26.619 38.501 27.314 39.877 28.014C39.936 28.044 39.993 28.075 40.048 28.105C40.463 28.327 40.845 28.563 41.188 28.816C41.909 29.349 42.474 29.949 42.883 30.622C43.51 31.668 43.824 32.83 43.824 34.121Z" />
            <path d="M76.701 18.229L71.514 41.781H64.365L60.234 26.951L56.124 41.781H48.984L43.896 18.918V18.916L43.803 18.491L43.743 18.229H50.656L53.145 31.412L56.791 18.229H63.675L67.331 31.395L69.826 18.229H76.701Z" />
            <path d="M90.014 31.332H84.012V37.336H90.014V31.332Z" />
            <path d="M82.77 31.332H76.766V37.336H82.77V31.332Z" />
            <path d="M90.014 38.5762H84.012V44.5822H90.014V38.5762Z" />
            <path d="M82.77 38.5762H76.766V44.5822H82.77V38.5822Z" />
          </svg><span className="-ml-1">{', '}</span>
          Australia&apos;s leading software consultants
        </a>
      </div>
    </footer>
  );
}
