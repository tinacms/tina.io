import React from 'react'
import styled, { css } from 'styled-components'
import { LinkNav } from '../ui/LinkNav'
import TwitterIconSvg from '../../public/svg/twitter-icon.svg'
import GithubIconSvg from '../../public/svg/github-icon.svg'
import { EmailForm } from '../forms/EmailForm'
import { TinaIcon } from '../../components/logo'
import Link from 'next/link'
import TinaIconSvg from '../../public/svg/tina-icon.svg'
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
    ],
  },
  {
    label: 'Docs',
    items: [
      {
        link: '/docs/',
        label: 'Introduction',
      },
      {
        link: '/docs/product-tour/',
        label: 'How Tina Works',
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
      <div className="flex flex-col md:flex-row gap-6 w-full justify-between items-start bg-[url('/svg/orange-bg.svg')] bg-cover bg-center px-4 py-6 lg:py-10 lg:px-10 -mt-px">
        <div className="max-w-[20%] flex-1 drop-shadow-sm">
          <TinaIcon color="white" />
        </div>
        <div className="flex-1 flex flex-col py-2 lg:py-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {footerNav.map((item) => {
            const { label, items } = item
            return (
              <div className="flex flex-col items-stretch justify-start gap-2">
                <p className="uppercase text-orange-100 font-bold -mt-1">
                  {label}
                </p>
                {items.map((item) => {
                  return <LinkItem item={item} />
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
              <SocialLink link="https://twitter.com/tina_cms">
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
      <div className="flex flex-col lg:flex-row w-full lg:items-center lg:justify-between bg-gradient-to-br from-orange-600 via-orange-800 to-orange-900 text-white p-4 lg:py-6 lg:px-10">
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span>Stay in touch 👉</span>
          <EmailForm isFooter />
        </div>
        <div className="flex drop-shadow-sm flex-wrap justify-end gap-x-6 gap-y-2">
          <div className="flex flex-wrap justify-end gap-x-3 gap-y-1">
            {footerLinks.map((item) => {
              const { link, label } = item
              return <FooterLink link={link} label={label} />
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
