'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import React from 'react';
import { BsDiscord } from 'react-icons/bs';
import GithubIconSvg from '../../public/svg/github-icon.svg';
import LinkedInIconSvg from '../../public/svg/linkedin-icon.svg';
import XIconSvg from '../../public/svg/x-icon.svg';
import YoutubeIconSvg from '../../public/svg/youtube-icon.svg';
import '../../styles/tailwind.css';
import { TinaIcon } from '../logo';
import { DynamicLink } from '../ui';

//TODO: Implement TinaCMS collection - https://github.com/tinacms/tina.io/issues/2656
const footerNavEn = [
  {
    label: 'Product',
    items: [
      {
        link: '/showcase',
        label: 'Showcase',
      },
      {
        link: 'https://app.tina.io',
        label: 'TinaCloud',
      },
      {
        link: '/docs',
        label: 'Introduction',
      },
      {
        link: '/docs/product-tour',
        label: 'How Tina Works',
      },
      {
        label: 'Roadmap',
        link: '/roadmap',
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      {
        label: 'Blog',
        link: '/blog',
      },
      {
        label: 'Examples',
        link: '/examples',
      },
      {
        label: 'Compare Tina',
        link: '/compare-tina',
      },
      {
        label: 'Support',
        link: '/docs/support',
      },
      {
        link: '/media',
        label: 'Media',
      },
    ],
  },
  {
    label: '',
    items: [
      {
        label: 'Whats New',
        children: [
          {
            link: '/whats-new/tinacms',
            label: 'TinaCMS',
          },
          {
            link: '/whats-new/tinacloud',
            label: 'TinaCloud',
          },
        ],
      },
      {
        label: 'Use Cases',
        children: [
          {
            link: '/agencies',
            label: 'Agencies',
          },
          {
            link: '/documentation',
            label: 'Documentation',
          },
          {
            link: '/cms-for-teams',
            label: 'Teams',
          },
          {
            link: '/jamstack-cms',
            label: 'Jamstack CMS',
          },
        ],
      },
      {
        label: 'Benefits',
        children: [
          {
            link: '/mdx-cms',
            label: 'MDX',
          },
          {
            link: '/markdown-cms',
            label: 'Markdown',
          },
          {
            link: '/git-cms',
            label: 'Git',
          },
          {
            link: '/editorial-workflow',
            label: 'Editorial Workflow',
          },
          {
            link: '/flexible-cms',
            label: 'Customization',
          },
          {
            link: '/seo',
            label: 'SEO',
          },
        ],
      },
      {
        label: 'Integrations',
        children: [
          {
            link: '/astro',
            label: 'Astro',
          },
          {
            link: '/hugo-cms',
            label: 'Hugo',
          },
          {
            link: '/nextjs-cms',
            label: 'NextJS',
          },
          {
            link: '/jekyll-cms',
            label: 'Jekyll',
          },
        ],
      },
    ],
  },
] as const;

const footerNavZh = [
  {
    label: '产品',
    items: [
      {
        link: '/zh/showcase',
        label: '案例展示',
      },
      {
        link: 'https://app.tina.io',
        label: 'TinaCloud',
      },
      {
        link: '/docs',
        label: '产品介绍',
      },
      {
        link: '/docs/product-tour',
        label: '工作原理',
      },
      {
        label: '产品路线',
        link: '/zh/roadmap',
      },
    ],
  },
  {
    label: '资源',
    items: [
      {
        label: '博客',
        link: '/blog',
      },
      {
        label: '示例',
        link: '/examples',
      },
      {
        label: '产品对比',
        link: '/zh/compare-tina',
      },
      {
        label: '技术支持',
        link: '/docs/support',
      },
      {
        link: '/media',
        label: '媒体资源',
      },
    ],
  },
  {
    label: '',
    items: [
      {
        label: '最新动态',
        children: [
          {
            link: '/whats-new/tinacms',
            label: 'TinaCMS',
          },
          {
            link: '/whats-new/tinacloud',
            label: 'TinaCloud',
          },
        ],
      },
      {
        label: '应用场景',
        children: [
          {
            link: '/agencies',
            label: '开发机构',
          },
          {
            link: '/documentation',
            label: '文档管理',
          },
          {
            link: '/cms-for-teams',
            label: '团队协作',
          },
          {
            link: '/jamstack-cms',
            label: 'Jamstack CMS',
          },
        ],
      },
      {
        label: '核心优势',
        children: [
          {
            link: '/mdx-cms',
            label: 'MDX支持',
          },
          {
            link: '/markdown-cms',
            label: 'Markdown支持',
          },
          {
            link: '/git-cms',
            label: 'Git集成',
          },
          {
            link: '/editorial-workflow',
            label: '编辑工作流',
          },
          {
            link: '/flexible-cms',
            label: '高度定制',
          },
          {
            link: '/seo',
            label: 'SEO优化',
          },
        ],
      },
      {
        label: '集成方案',
        children: [
          {
            link: '/astro',
            label: 'Astro',
          },
          {
            link: '/hugo-cms',
            label: 'Hugo',
          },
          {
            link: '/nextjs-cms',
            label: 'NextJS',
          },
          {
            link: '/jekyll-cms',
            label: 'Jekyll',
          },
        ],
      },
    ],
  },
] as const;

const footerLinksEn = [
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

const footerLinksZh = [
  {
    link: '/security',
    label: '安全政策',
  },
  {
    link: '/telemetry',
    label: '开源遥测',
  },
  {
    link: '/terms-of-service',
    label: '服务条款',
  },
  {
    link: '/privacy-notice',
    label: '隐私声明',
  },
  {
    link: 'https://github.com/tinacms/tinacms/blob/master/LICENSE',
    label: '开源许可',
  },
  {
    link: '/docs/support',
    label: '技术支持',
  },
];

const LinkGroup = ({ item }: { item: { children: any[]; label } }) => {
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
  const { id, link, label } = item;

  return (
    <DynamicLink href={link} passHref>
      <div className="inline-block drop-shadow-sm relative opacity-90 hover:opacity-100 text-white uppercase text-lg lg:text-xl font-tuner transition duration-150 ease-out hover:-translate-y-px hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] active:translate-y-px hover:-translate-x-px active:translate-x-px">
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

export const AppFooter = ({}) => {
  const pathName = usePathname();
  const isZhPath = pathName?.includes('/zh') || false;

  const currentFooterNav = isZhPath ? footerNavZh : footerNavEn;
  const currentFooterLinks = isZhPath ? footerLinksZh : footerLinksEn;

  return (
    <div>
      {/* Top */}
      <div className="flex flex-col md:flex-row gap-6 w-full justify-between items-start bg-[url('/svg/orange-bg.svg')] bg-cover bg-center px-6 py-8 lg:py-12 lg:px-12 -mt-px">
        <div className="max-w-[20%] flex-1 drop-shadow-sm">
          <TinaIcon color="white" />
        </div>
        <div className="flex-1 flex flex-col py-2 lg:py-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentFooterNav.map((item) => {
            const { label, items } = item;
            return (
              <div
                key={label}
                className="flex flex-col items-stretch justify-start gap-2"
              >
                <p className="uppercase text-orange-100 font-bold -mt-1">
                  {label}
                </p>
                {items.map((item) => {
                  return item.children ? (
                    <LinkGroup key={item.label} item={item} />
                  ) : (
                    <LinkItem key={item.label} item={item} />
                  );
                })}
              </div>
            );
          })}
          <div className="flex flex-col lg:items-center font-tuner">
            <div className="flex flex-col lg:items-start gap-4 drop-shadow-sm font-tuner">
              <SocialLink link="https://github.com/tinacms/tinacms">
                <GithubIconSvg className="w-7 h-auto fill-current opacity-80" />{' '}
                GitHub
              </SocialLink>
              <SocialLink link="https://x.com/tinacms">
                <XIconSvg className="w-7 h-auto fill-current opacity-80" /> X
              </SocialLink>
              <SocialLink link="https://discord.com/invite/zumN63Ybpf">
                <BsDiscord className="w-7 h-auto fill-current opacity-80" />{' '}
                Discord
              </SocialLink>
              <SocialLink link="https://www.youtube.com/@TinaCMS">
                <YoutubeIconSvg className="w-7 h-auto fill-current opacity-80" />{' '}
                YouTube
              </SocialLink>
              <SocialLink link="https://www.linkedin.com/company/tinacms">
                <LinkedInIconSvg className="w-7 h-auto fill-current opacity-80" />{' '}
                LinkedIn
              </SocialLink>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-end flex-col lg:flex-row w-full lg:items-center bg-gradient-to-br from-orange-600 via-orange-800 to-orange-900 text-white px-6 py-8 lg:px-18 gap-6">
        <div className="flex drop-shadow-sm flex-wrap gap-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {currentFooterLinks.map((item) => {
              const { link, label } = item;
              return <FooterLink key={label} link={link} label={label} />;
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
