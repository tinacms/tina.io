'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { BsDiscord } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { IoIosWarning } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import GithubIconSvg from '../../public/svg/github-icon.svg';
import LinkedInIconSvg from '../../public/svg/linkedin-icon.svg';
import XIconSvg from '../../public/svg/x-icon.svg';
import YoutubeIconSvg from '../../public/svg/youtube-icon.svg';
import '../../styles/tailwind.css';
import { addToMailchimp } from '../../utils';
import { TinaIcon } from '../logo';
import { DynamicLink, Input, ModalButton } from '../ui';

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

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

export function AppFooter() {
  const pathName = usePathname();
  const isZhPath = pathName?.includes('/zh') || false;
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const currentFooterNav = isZhPath ? footerNavZh : footerNavEn;
  const currentFooterLinks = isZhPath ? footerLinksZh : footerLinksEn;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const result = await addToMailchimp(
        formData.email,
        formData.firstName,
        formData.lastName
      );

      if (result.result === 'success') {
        setMessage({
          text: "You've been added to the llama list!",
          type: 'success',
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
        });
      } else if (result.message.includes('400')) {
        setMessage({ text: "You're already in our herd!", type: 'warning' });
      } else {
        setMessage({
          text: 'There was an error. Please try again.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({
        text: 'There was an error. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Top */}
      <div className=" bg-[url('/svg/orange-bg.svg')] bg-cover bg-center ">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row w-full justify-between items-start py-8 lg:py-12 -mt-px px-2 lg:px-0">
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
            <div className="flex flex-col">
              <form
                className="flex flex-col text-left gap-1.5 items-start w-full"
                onSubmit={handleSubmit}
              >
                <h2 className="text-xl font-tuner text-white">
                  Join the Herd!
                </h2>
                <p className="text-sm font-light text-white/80 pb-1.5">
                  Become part of our coding comunity and stay updated with the
                  latest tips and news.
                </p>
                <div className="flex flex-col gap-2.5 w-full">
                  <div className="flex gap-2.5">
                    <input
                      className="w-full px-2 py-2 text-sm  text-white border rounded-sm border-white placeholder:text-white/70 bg-white/10"
                      placeholder="First name"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                    <input
                      className="w-full px-2 py-2 text-sm bg-white/10 text-white border rounded-sm border-white placeholder:text-white/70"
                      placeholder="Last name"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <input
                    className="w-full px-2 py-2 text-sm bg-white/10 text-white border rounded-sm border-white placeholder:text-white/70"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                  {message.text && (
                    <p
                      className={`text-xs flex items-center gap-1 ${
                        message.type === 'success'
                          ? 'text-green-300'
                          : message.type === 'warning'
                          ? 'text-white'
                          : 'text-white'
                      }`}
                    >
                      {message.type === 'success' && (
                        <TiTick className="w-3 h-3" />
                      )}
                      {message.type === 'warning' && (
                        <IoIosWarning className="w-3 h-3" />
                      )}
                      {message.type === 'error' && (
                        <ImCross className="w-3 h-3" />
                      )}
                      {message.text}
                    </p>
                  )}
                  <div className="flex justify-center pt-1">
                    <button
                      type="submit"
                      className="px-2 py-2 text-sm w-full bg-white text-orange-600 font-tuner shadow-xl hover:bg-white/80 transition-colors duration-200 rounded-full "
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Subscribe...' : 'Subscribe'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className=" bg-gradient-to-br from-orange-600 via-orange-800 to-orange-900 text-white ">
        <div className="max-w-7xl mx-auto flex justify-between flex-col lg:flex-row w-full lg:items-center py-8 gap-6 px-2 lg:px-0">
        <div className="flex lg:items-start gap-6 drop-shadow-sm">
          <SocialLink link="https://github.com/tinacms/tinacms">
            <GithubIconSvg className="w-7 h-auto fill-current " />{' '}
          </SocialLink>
          <SocialLink link="https://x.com/tinacms">
            <XIconSvg className="w-7 h-auto fill-current " />
          </SocialLink>
          <SocialLink link="https://discord.com/invite/zumN63Ybpf">
            <BsDiscord className="w-7 h-auto fill-current" />{' '}
          </SocialLink>
          <SocialLink link="https://www.youtube.com/@TinaCMS">
            <YoutubeIconSvg className="w-7 h-auto fill-current " />{' '}
          </SocialLink>
          <SocialLink link="https://www.linkedin.com/company/tinacms">
            <LinkedInIconSvg className="w-7 h-auto fill-current " />{' '}
          </SocialLink>
        </div>
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
    </div>
  );
}

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
