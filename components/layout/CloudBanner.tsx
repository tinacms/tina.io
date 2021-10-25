import React from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { BlocksControls } from 'react-tinacms-inline'
import { IconRight } from '../home'
import TinaLogo from '../../public/svg/tina-logo.svg'
import TinaCloudWordmark from '../../public/svg/tina-cloud-wordmark.svg'
import { Button, ButtonGroup } from 'components/ui'

export function CloudBanner() {
  return (
    <>
      <div className="banner">
        <div className="content">
          <span className="desktop">
            <p className="text">
              <span className="wordmark">
                <TinaCloudWordmark />
              </span>{' '}
               Now supports MDX components. Give the power of MDX to your content creators!
            </p>ß
          </span>
          <Link href="/blog/tina-supports-mdx/">
            <a className="link">
              <span className="desktop">Read The Announcement</span>
              <span className="mobile">Tina Cloud supports MDX componentsß</span>
              <IconRight />
            </a>
          </Link>
        </div>
        <div className="actions">
          <ButtonGroup>
            <Link href="https://app.tina.io/">
              <Button size="small" color="blueInverted">
                Sign In
              </Button>
            </Link>
            <Link href="https://app.tina.io/quickstart">
              <Button size="small" color="blue">
                Get Started
              </Button>
            </Link>
          </ButtonGroup>
        </div>
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

        .text {
          display: flex;
          align-items: center;
        }

        .wordmark {
          display: inline-flex;
          align-items: center;
          margin-right: 0.5rem;

          :global(svg) {
            height: 1rem;
            width: auto;
            margin-bottom: 0.125rem;
          }
        }

        .banner {
          background: linear-gradient(
            90deg,
            white,
            #f2fdfc 33.3%,
            #e6faf8 100%
          );
          box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.03);
          border-bottom: 1px solid #d1faf6;
          color: var(--tina-color-primary);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 2rem;
          font-size: 1.125rem;
          position: relative;
          z-index: 10;
          line-height: 1.2;

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
        }

        .content {
          display: flex;
          align-items: center;
        }

        .actions {
          flex: 1 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;

          :global(> *) {
            width: auto;
          }
        }

        .link {
          font-size: 1rem;
          margin-right: 2rem;
          :global(svg) {
            margin-left: 0.5rem;
            height: 1em;
          }
        }

        .tinaCloud {
          display: inline-block;
          white-space: nowrap;
        }
      `}</style>
    </>
  )
}
