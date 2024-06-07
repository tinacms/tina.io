import React from 'react'
import Link from 'next/link'
import { IconRight } from '../blocks'
import { Button, ButtonGroup } from '../../components/ui'
import GitHubButton from 'react-github-btn'
import { EmailForm } from '../forms/EmailForm'
export function CloudBanner() {
  return (
    <>
      <div className="banner">
        <div className="banner-content">
          <span className="mobile pr-2">
              Loving Tina? ⭐️ us on{' '}
              <a href="https://github.com/tinacms/tinacms" target="new">
                GitHub
              </a>
          </span>
          {/* @ts-ignore */}
          <GitHubButton
            href="https://github.com/tinacms/tinacms"
            data-size="medium"
            data-show-count="true"
            aria-label="Star TinaCMS on GitHub"
          >
            Star
          </GitHubButton>
        </div>
      </div>

      <style jsx>{`
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
          color: var(--color-tina-blue);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          position: relative;
          z-index: 10;
          line-height: 1.2;
          flex: 0 1 auto;
          width: 100%;
          flex-direction: column;

          :global(a) {
            text-decoration: underline;
          }

          :global(em) {
            font-style: normal;
            font-weight: bold;
          }
        }

        .banner-content {
          display: flex;
          align-items: center;
          margin-top: 0.3rem;
          margin-bottom: 0.5rem;
        }

        .banner-content-subscribe {
          flex-direction: column;
        }

        .hand-emoji {
          display: none;
        }

        @media (min-width: 1024px) {
          .banner {
            flex-direction: row;
            padding-left: 2rem;
            padding-right: 2.5rem;
          }

          .hand-emoji {
            display: block;
          }

          .banner-content-subscribe {
            flex-direction: row;
          }

          .banner-content {
            margin-bottom: 0;
          }
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
          margin-right: 1rem;
          :global(svg) {
            display: none;
            margin-left: 0.5rem;
            height: 1em;
            @media (min-width: 680px) {
              display: inline-block;
            }
          }
          @media (min-width: 680px) {
            margin-right: 2rem;
            white-space: nowrap;
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
