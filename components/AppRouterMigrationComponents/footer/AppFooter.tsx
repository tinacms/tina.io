'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import '../../../styles/tailwind.css';
import { TinaIcon } from '../../logo';
import { DynamicLink } from '../../ui';
import { SubscriptionForm } from './subscription-form';

const footerNavZh = [
  {
    header: '产品',
    footerItem: [
      {
        href: '/zh/showcase',
        label: '案例展示',
      },
      {
        href: 'https://app.tina.io',
        label: 'TinaCloud',
      },
      {
        href: '/docs',
        label: '产品介绍',
      },
      {
        href: '/docs/product-tour',
        label: '工作原理',
      },
      {
        label: '产品路线',
        href: '/zh/roadmap',
      },
    ],
  },
  {
    header: '资源',
    footerItem: [
      {
        label: '博客',
        href: '/blog',
      },
      {
        label: '示例',
        href: '/examples',
      },
      {
        label: '产品对比',
        href: '/zh/compare-tina',
      },
      {
        label: '技术支持',
        href: '/docs/support',
      },
      {
        href: '/media',
        label: '媒体资源',
      },
    ],
  },
  {
    label: '',
    footerItem: [
      {
        label: '最新动态',
        items: [
          {
            href: '/whats-new/tinacms',
            label: 'TinaCMS',
          },
          {
            href: '/whats-new/tinacloud',
            label: 'TinaCloud',
          },
        ],
      },
      {
        label: '应用场景',
        items: [
          {
            href: '/agencies',
            label: '开发机构',
          },
          {
            href: '/documentation',
            label: '文档管理',
          },
          {
            href: '/cms-for-teams',
            label: '团队协作',
          },
          {
            href: '/jamstack-cms',
            label: 'Jamstack CMS',
          },
        ],
      },
      {
        label: '核心优势',
        items: [
          {
            href: '/mdx-cms',
            label: 'MDX支持',
          },
          {
            href: '/markdown-cms',
            label: 'Markdown支持',
          },
          {
            href: '/git-cms',
            label: 'Git集成',
          },
          {
            href: '/editorial-workflow',
            label: '编辑工作流',
          },
          {
            href: '/flexible-cms',
            label: '高度定制',
          },
          {
            href: '/seo',
            label: 'SEO优化',
          },
        ],
      },
      {
        label: '集成方案',
        items: [
          {
            href: '/astro',
            label: 'Astro',
          },
          {
            href: '/hugo-cms',
            label: 'Hugo',
          },
          {
            href: '/nextjs-cms',
            label: 'NextJS',
          },
          {
            href: '/jekyll-cms',
            label: 'Jekyll',
          },
        ],
      },
    ],
  },
] as const;

const footerLinksZh = [
  {
    href: '/security',
    label: '安全政策',
  },
  {
    href: '/telemetry',
    label: '开源遥测',
  },
  {
    href: '/terms-of-service',
    label: '服务条款',
  },
  {
    href: '/privacy-notice',
    label: '隐私声明',
  },
  {
    href: 'https://github.com/tinacms/tinacms/blob/master/LICENSE',
    label: '开源许可',
  },
  {
    href: '/docs/support',
    label: '技术支持',
  },
];

const LinkGroup = ({ item }: { item: { items: any[]; label } }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <details
      className="inline-block drop-shadow-sm relative opacity-90 text-white uppercase text-lg lg:text-xl font-tuner transition duration-150 ease-out "
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
};

export const LinkItem = ({ item }) => {
  const { id, href, label } = item;

  return (
    <DynamicLink href={href || ''} passHref>
      <div className="inline-block drop-shadow-sm relative opacity-90 hover:opacity-100 text-white uppercase text-lg lg:text-xl font-tuner transition duration-150 ease-out hover:-translate-y-px hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] active:translate-y-px hover:-translate-x-px active:translate-x-px">
        {label}
      </div>
    </DynamicLink>
  );
};

const SocialLink = ({ link, children }) => {
  return (
    <a
      className="transition ease-out duration-150 opacity-80 hover:opacity-100 flex items-center gap-2 font-tuner"
      href={link || ''}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export function AppFooter({ footerData }) {
  const pathName = usePathname();
  const isZhPath = pathName?.includes('/zh') || false;

  const socialLinks =
    footerData.Column4.footerItem.filter(
      (item) => item._template === 'socialLink'
    ) || [];

  const currentFooterNav = isZhPath
    ? footerNavZh
    : [footerData.Column1, footerData.Column2, footerData.Column3];
  const currentFooterLinks = isZhPath
    ? footerLinksZh
    : footerData.Column4.footerItem.filter(
        (item) => item._template === 'stringItem'
      );

  const modalButton = footerData.Column4.footerItem.filter(
    (item) => item._template === 'modalButton'
  )[0];

  return (
    <div>
      {/* Top */}
      <div className=" bg-[url('/svg/orange-bg.svg')] bg-cover bg-center ">
        <div className="px-6 md:mx-auto max-w-7xl flex flex-col md:flex-row w-full justify-between items-start py-8 lg:py-16 lg:px-8">
          <div className="max-w-[15%] flex-1 drop-shadow-sm">
            <TinaIcon color="white" />
          </div>
          <div className="flex-1 flex flex-col py-2 lg:py-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentFooterNav.map((item) => {
              const { header, footerItem } = item;
              return (
                <div
                  key={header}
                  className="flex flex-col items-stretch justify-start gap-2"
                >
                  <p className="uppercase text-orange-100 font-bold -mt-1">
                    {header}
                  </p>
                  {footerItem.map((item) => {
                    return item.items ? (
                      <LinkGroup key={item.label} item={item} />
                    ) : (
                      <LinkItem key={item.label} item={item} />
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

      {/* Bottom */}
      <div className=" bg-linear-to-br from-orange-600 via-orange-800 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto flex justify-between flex-col lg:flex-row w-full lg:items-center py-8 gap-6 px-2 lg:px-8">
          <div className="flex justify-center md:justify-start md:ml-5 lg:items-start gap-6 drop-shadow-sm lg:ml-0">
            {socialLinks.map((socialLink, index) => (
              <SocialLink key={index} link={socialLink.href}>
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
          <div className="ml-5 flex drop-shadow-sm flex-wrap gap-6 md:ml-5">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {currentFooterLinks.map((item) => {
                const { id, href, label } = item;
                return <FooterLink key={id} link={href} label={label} />;
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

const FooterLink = ({ link, label }) => {
  return (
    <Link
      href={link || ''}
      className="transition ease-out duration-150 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] hover:opacity-100 opacity-70 whitespace-nowrap"
      passHref
    >
      {label}
    </Link>
  );
};
