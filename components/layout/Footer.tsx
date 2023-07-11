import React from 'react'
import TwitterIconSvg from '../../public/svg/twitter-icon.svg'
import GithubIconSvg from '../../public/svg/github-icon.svg'
import { EmailForm } from '../forms/EmailForm'
import { TinaIcon } from '../../components/logo'
import Link from 'next/link'
import { DynamicLink } from '../../components/ui'

import { BsDiscord } from 'react-icons/bs'

const footerNav = [
  {
    label: 'Product',
    items: [
      // {
      //   link: '/demo/',
      //   label: 'Demo',
      // },
      {
        link: '/showcase/',
        label: 'Showcase',
      },
      {
        link: 'https://app.tina.io/',
        label: 'Tina Cloud',
      },
      {
        link: '/docs/',
        label: 'Introduction',
      },
      {
        link: '/docs/product-tour/',
        label: 'How Tina Works',
      },
    ],
  },
  {
    label: 'Resources',
    items: [
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
        label: 'Comparisons',
        children: [
          {
            link: '/tinacms-storyblok-comparison',
            label: 'TinaCMS vs Storyblok',
          },
          {
            link: '/sanity-tina-comparison',
            label: 'TinaCMS vs Sanity',
          },
          {
            link: '/tinacms-netlifycms-comparison',
            label: 'TinaCMS vs NetlifyCMS',
          },
          {
            link: '/tinacms-contentful-comparison',
            label: 'TinaCMS vs Contentful',
          },
          {
            link: '/tinacms-builder-comparison',
            label: 'TinaCMS vs Builder.io',
          },
          {
            link: '/tinacms-strapi-comparison',
            label: 'TinaCMS vs Strapi',
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
      // {
      //   link: '/',
      //   label: 'Releases',
      // },
    ],
  },
]

const footerLinks = [
  {
    link: '/security/',
    label: 'Security',
  },
  {
    link: '/telemetry/',
    label: 'Open Source Telemetry',
  },
  {
    link: '/terms-of-service/',
    label: 'Terms of Service',
  },
  {
    link: '/privacy-notice/',
    label: 'Privacy Notice',
  },
  {
    link: 'https://github.com/tinacms/tinacms/blob/master/LICENSE',
    label: 'License',
  },
]

const LinkGroup = ({ item }: { item: { children: any[]; label } }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <details
      className="inline-block drop-shadow-sm relative opacity-90 text-white uppercase text-lg lg:text-xl font-tuner transition duration-150 ease-out "
      onClick={() => setOpen(!open)}
    >
      <summary className="hover:-translate-y-px hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] active:translate-y-px hover:-translate-x-px active:translate-x-px hover:opacity-100 cursor-pointer">
        {item.label}
      </summary>
      <div className="p-4">
        {item.children.map((subItem) => (
          <div>
            <DynamicLink href={subItem.link} passHref>
              <a className="hover:-translate-y-px hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] active:translate-y-px hover:-translate-x-px active:translate-x-px hover:opacity-100 cursor-pointer">
                {subItem.label}
              </a>
            </DynamicLink>
          </div>
        ))}
      </div>
    </details>
  )
}

export const LinkItem = ({ item }) => {
  const { id, link, label } = item

  return (
    <DynamicLink href={link} passHref>
      <a className="inline-block drop-shadow-sm relative opacity-90 hover:opacity-100 text-white uppercase text-lg lg:text-xl font-tuner transition duration-150 ease-out hover:-translate-y-px hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] active:translate-y-px hover:-translate-x-px active:translate-x-px">
        {label}
      </a>
    </DynamicLink>
  )
}

const SocialLink = ({ link, children }) => {
  return (
    <a
      className="transition ease-out duration-150 opacity-80 hover:opacity-100 flex items-center gap-2 text-white font-tuner"
      href={link}
      target="_blank"
    >
      {children}
    </a>
  )
}

export const Footer = ({}) => {
  return (
    <div>
      {/* Top */}
      <div className="flex flex-col md:flex-row gap-6 w-full justify-between items-start bg-[url('/svg/orange-bg.svg')] bg-cover bg-center px-6 py-8 lg:py-12 lg:px-12 -mt-px">
        <div className="max-w-[20%] flex-1 drop-shadow-sm">
          <TinaIcon color="white" />
        </div>
        <div className="flex-1 flex flex-col py-2 lg:py-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {footerNav.map((item) => {
            const { label, items } = item
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
                  )
                })}
              </div>
            )
          })}
          <div className="flex flex-col lg:items-start">
            <div className="flex w-1/2 flex-col lg:items-end gap-4 drop-shadow-sm">
              <SocialLink link="https://github.com/tinacms/tinacms">
                <GithubIconSvg className="w-7 h-auto fill-current opacity-80" />{' '}
                Github
              </SocialLink>
              <SocialLink link="https://twitter.com/tinacms">
                <TwitterIconSvg className="w-7 h-auto fill-current opacity-80" />{' '}
                Twitter
              </SocialLink>
              <SocialLink link="https://discord.com/invite/zumN63Ybpf">
                <BsDiscord className="w-7 h-auto fill-current opacity-80" />{' '}
                Discord
              </SocialLink>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col lg:flex-row w-full lg:items-center lg:justify-between bg-gradient-to-br from-orange-600 via-orange-800 to-orange-900 text-white px-6 py-8 lg:px-12 gap-6">
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span>Stay in touch 👉</span>
          <EmailForm isFooter />
        </div>
        <div className="flex drop-shadow-sm flex-wrap justify-end gap-6">
          <div className="flex flex-wrap justify-end gap-x-6 gap-y-2">
            {footerLinks.map((item) => {
              const { link, label } = item
              return <FooterLink key={label} link={link} label={label} />
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
  )
}

const FooterLink = ({ link, label }) => {
  return (
    <Link href={link} passHref>
      <a className="transition ease-out duration-150 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] hover:opacity-100 opacity-70 whitespace-nowrap">
        {label}
      </a>
    </Link>
  )
}
