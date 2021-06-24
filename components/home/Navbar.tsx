import React from 'react'
import Link from 'next/link'
import { BlockTemplate } from 'tinacms'
import ReactMarkdown from 'react-markdown'
import { BlocksControls } from 'react-tinacms-inline'
import { Container, IconRight, TinaIcon } from './'

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
            component: 'text',
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
        <div className="banner orange">
          <Container>
            <Link href={banner.link}>
              <a>
                <span>
                  <ReactMarkdown source={banner.text} />
                </span>
                <IconRight />
              </a>
            </Link>
          </Container>
        </div>
      )}
      <div className="navbar blue">
        <Container>
          <div className="navGrid">
            <Link href="/">
              <a className="logomark navLogo">
                <TinaIcon />
                <h1 className="wordmark">Tina</h1>
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
            <div className="githubStar navGithub">
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
        .banner {
          :global(a) {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 0;
            font-size: 1.25rem;
            line-height: 1.4;
            text-decoration: none;
            color: inherit;
            transition: opacity 150ms ease-out;
            &:hover {
              opacity: 0.8;
            }
          }
          :global(em) {
            font-style: normal;
            font-weight: bold;
            text-decoration: underline;
          }
          :global(svg) {
            margin-left: 1rem;
            height: 1em;
          }
        }

        .tinaCloud {
          display: inline-block;
          white-space: nowrap;
        }

        .navbar {
          padding: 2rem 0 2rem 0;
          margin-bottom: -1px;
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
          margin: 0 1.5rem;

          :global(a) {
            color: white;
            opacity: 0.7;
            transition: opacity 150ms ease-out;
            text-decoration: none;
            font-size: 1.25rem;
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
