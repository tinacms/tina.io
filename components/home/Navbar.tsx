import React from 'react'
import Link from 'next/link'
import { BlockTemplate } from 'tinacms'
import ReactMarkdown from 'react-markdown'
import { BlocksControls } from 'react-tinacms-inline'
import { Container, IconRight } from './'
import TinaLogo from '../../public/svg/tina-logo.svg'
import { Button, ButtonGroup } from 'components/ui'

export const navbar_template: BlockTemplate = {
  label: 'Navbar',
  defaultItem: {},
  fields: [
    {
      label: 'Display Banner',
      name: 'banner.display',
      component: 'toggle',
    },
    {
      name: '',
      //@ts-ignore
      condition: value => value.banner.display === true,
      component: 'conditional',
      field: {
        label: 'Banner',
        name: 'banner',
        component: 'group',
        fields: [
          {
            label: 'Text',
            name: 'text',
            component: 'text',
          },
          {
            label: 'Link',
            name: 'link',
            component: 'group',
            fields: [
              {
                label: 'Label',
                name: 'label',
                component: 'text',
              },
              {
                label: 'Mobile Label',
                name: 'mobileLabel',
                component: 'text',
              },
              {
                label: 'Link',
                name: 'href',
                component: 'text',
              },
            ],
          },
        ],
      },
    },
    {
      label: 'Nav Items',
      name: 'navItems',
      component: 'group-list',
      fields: [
        {
          label: 'Label',
          name: 'label',
          component: 'text',
        },
        {
          label: 'Link',
          name: 'link',
          component: 'text',
        },
      ],
      //@ts-ignore
      itemProps: (item: any) => ({
        key: item.link,
        label: item.label,
      }),
    },
  ],
}

export function NavbarBlock({ data, index }) {
  const { banner, navItems } = data

  return (
    <BlocksControls
      index={index}
      insetControls={true}
      focusRing={{ offset: -16 }}
    >
      {banner.display && (
        <div className="banner">
          <div className="content">
            <span className="desktop">
              <ReactMarkdown source={banner.text} />
            </span>
            <Link href={banner.link.href}>
              <a className="link">
                <span className="desktop">{banner.link.label}</span>
                <span className="mobile">{banner.link.mobileLabel}</span>
                <IconRight />
              </a>
            </Link>
          </div>
          <div className="actions">
            <ButtonGroup>
              <Link href="https://auth.tina.io/">
                <Button size="small" color="blueInverted">
                  Sign In
                </Button>
              </Link>
              <Link href="https://auth.tina.io/register">
                <Button size="small" color="blue">
                  Sign Up
                </Button>
              </Link>
            </ButtonGroup>
          </div>
        </div>
      )}
      <div className="navbar">
        <Container width="wide">
          <div className="navGrid">
            <Link href="/">
              <a className="navLogo">
                <TinaLogo />
              </a>
            </Link>
            <nav className="navWrapper navNav">
              <ul className="navUl">
                {navItems.map(item => {
                  const { link, label } = item

                  return (
                    <li key={`link-${label}`} className="navLi">
                      <Link href={link}>{label}</Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <div className="navGithub">
              <iframe
                className="starButton"
                src="https://ghbtns.com/github-btn.html?user=tinacms&repo=tinacms&type=star&count=true&size=large"
                frameBorder="0"
                scrolling="0"
                width="150px"
                height="30px"
              ></iframe>
            </div>
          </div>
        </Container>
      </div>
      <style jsx>{`
        .desktop {
          display: none;
        }

        @media (min-width: 1200px) {
          .desktop {
            display: initial;
          }
          .mobile {
            display: none;
          }
        }

        .banner {
          background: linear-gradient(
            to right,
            white,
            rgb(254, 254, 254),
            rgb(250, 250, 250)
          );
          box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.03);
          color: var(--tina-color-primary);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem var(--container-padding);
          font-size: 1.125rem;
          position: relative;
          z-index: 10;

          :global(a) {
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 0;
            color: inherit;
            transition: opacity 150ms ease-out;
            font-size: 1.125rem;
            opacity: 0.7;

            &:not(:hover) {
              text-decoration: none;
            }
            &:hover {
              opacity: 1;
            }

            @media (min-width: 1200px) {
              margin-left: 1rem;
            }
          }

          :global(em) {
            font-style: normal;
            font-weight: bold;
          }
          :global(svg) {
            margin-left: 0.5rem;
            height: 1em;
          }
        }

        .content {
          display: flex;
          align-items: center;
        }

        .link {
          font-size: 1rem;
        }

        .tinaCloud {
          display: inline-block;
          white-space: nowrap;
        }

        .navbar {
          padding: 3.5rem 0 3.5rem 0;
          margin-bottom: -1px;
          background: linear-gradient(to bottom, #d1faf6, #e6faf8);
        }

        .navGrid {
          width: 100%;
          display: grid;
          grid-gap: 2rem 1rem;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;

          @media (min-width: 800px) {
            grid-gap: 1rem;
            align-items: center;
            grid-template-columns: auto 1fr auto;
            grid-template-rows: 1fr;
          }
        }

        .navLogo {
          grid-column-start: 1;
          grid-column-end: 2;
          grid-row-start: 1;
          grid-row-end: 2;
          text-decoration: none;
          padding-bottom: 10px;

          :global(svg) {
            width: 140px;
            height: auto;
          }

          @media (min-width: 800px) {
            grid-column-start: 1;
            grid-column-end: 2;
          }
        }

        .navNav {
          grid-column-start: 1;
          grid-column-end: 3;
          grid-row-start: 2;
          grid-row-end: 3;
          justify-self: center;

          @media (min-width: 800px) {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 2;
          }
        }

        .navGithub {
          grid-column-start: 2;
          grid-column-end: 3;
          grid-row-start: 1;
          grid-row-end: 2;
          justify-self: end;
          display: flex;
          align-items: center;

          @media (min-width: 800px) {
            grid-column-start: 3;
            grid-column-end: 4;
          }
        }

        .navUl {
          display: flex;
          margin: 0 -1.5rem;
        }

        .navLi {
          margin: 0 1.75rem;

          :global(a) {
            color: var(--color-blue);
            font-weight: 500;
            opacity: 0.7;
            transition: opacity 150ms ease-out;
            text-decoration: none;
            font-size: 1.125rem;
            &:hover {
              opacity: 1;
            }
          }
        }

        .logomark {
          color: var(--color-orange);
          fill: var(--color-orange);
          display: flex;
          align-items: center;

          :global(svg) {
            margin-top: -5px;
            height: 40px;
            width: auto;
            margin-right: 12px;
          }
        }

        .wordmark {
          font-size: 26px;
          font-weight: bold;
          font-family: var(--font-tuner);

          :global(span) {
            margin-left: 1px;
          }
        }
      `}</style>
    </BlocksControls>
  )
}
