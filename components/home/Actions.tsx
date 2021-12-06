import React from 'react'
import styled from 'styled-components'
import { IconRight } from './Icons'
import { WithCodeStyles } from 'components/layout/MarkdownContent'

const BashWrapper = styled.div`
  code {
    ::before {
      content: '$ ';
    }
  }
`

export const Actions = ({ items, align = 'left' }) => {
  return (
    <>
      <div
        className={[
          'actionGroup',
          align === 'center' && 'actionGroupCenter',
        ].join(' ')}
      >
        {items.map(item => {
          if (item.variant == 'command') {
            return (
              <BashWrapper>
                <WithCodeStyles language="bash,copy" value={item.label} />
              </BashWrapper>
            )
          }

          const { variant, label, icon, url } = item
          const externalUrlPattern = /^((http|https|ftp):\/\/)/
          const external = externalUrlPattern.test(url)
          let link = null
          if (external) {
            link = (
              <a
                key={`action-${label}`}
                href={url}
                className={`action ${variant}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label} {icon === 'arrowRight' && <IconRight />}
              </a>
            )
          } else {
            link = (
              <a
                key={`action-${label}`}
                href={url}
                className={`action ${variant}`}
              >
                {label} {icon === 'arrowRight' && <IconRight />}
              </a>
            )
          }
          return link
        })}
      </div>
      <style jsx>{`
        .actionGroup {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding-top: 0.5rem;
          margin: 0 -0.75rem;

          :global(a),
          :global(button) {
            margin: 0 0.75rem;
          }
        }

        .actionGroupCenter {
          justify-content: center;
        }

        .action {
          font-weight: bold;
          font-size: 1.125rem;
          border-radius: 2rem;
          cursor: pointer;
          transition: all 150ms ease-out;
          width: max-content;
          transform: translate3d(0px, 0px, 0px);
          display: flex;
          align-items: center;
          background-color: var(--color-seafoam);
          color: var(--color-orange);
          border-radius: 2rem;
          text-transform: uppercase;
          padding: 1rem 1.5rem;
          border: 1px solid #b4f4e0;
          font-family: var(--font-tuner);
          font-weight: regular;
          font-style: normal;
          text-decoration: none !important;
          white-space: nowrap;
          opacity: 1;
          line-height: 1;

          &:hover,
          &:focus {
            color: var(--color-orange);
            text-decoration: none;
            transform: translate3d(-1px, -2px, 0);
            transition: transform 180ms ease-out;
          }
          &:focus {
            box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px inset,
              rgba(236, 72, 21, 0.7) 0px 0px 0px 3px,
              rgba(0, 0, 0, 0.12) 0px 2px 3px;
          }
          &:focus,
          &:active {
            outline: none;
          }
          &:active {
            filter: none;
          }

          :global(svg) {
            display: inline-block;
            fill: currentColor;
            margin-left: 0.375em;
            margin-right: 0;
            height: 1em;
            width: auto;
            transition: opacity ease-out 150ms;
          }
          :not(:hover):global(svg) {
            opacity: 0.85;
          }
        }

        .link {
          font-size: 1.125rem;
          color: var(--color-orange);
          padding: 0;

          &:after {
            width: calc(100% + 1.5rem);
            height: calc(100% + 1rem);
            top: -0.5rem;
            left: -0.75rem;
          }

          :global(svg) {
            display: inline-block;
            fill: currentColor;
            margin-left: 0.375em;
            margin-right: 0;
            height: 1em;
            width: auto;
            transition: opacity ease-out 150ms;
          }
          :not(:hover):global(svg) {
            opacity: 0.85;
          }
        }

        .orange {
          background-color: var(--color-orange);
          background: linear-gradient(
            to bottom right,
            var(--color-orange),
            var(--color-orange-dark)
          );
          color: white;
          border-color: var(--color-orange);
          font-weight: bold;

          &:hover,
          &:focus {
            color: white;
          }
        }

        .ghost {
          border-color: transparent;
          padding: 0 0.25rem;

          :hover {
            color: var(--color-orange-dark);
          }
        }
      `}</style>
    </>
  )
}

export const ActionFields = [
  {
    label: 'Actions',
    name: 'actions',
    component: 'group-list',
    fields: [
      {
        label: 'Label',
        name: 'label',
        component: 'text',
      },
      {
        label: 'Variant',
        name: 'variant',
        component: 'select',
        options: ['button', 'link'],
      },
      {
        label: 'URL',
        name: 'url',
        component: 'text',
      },
      {
        label: 'Icon',
        name: 'icon',
        component: 'select',
        options: ['none', 'arrowRight'],
      },
    ],
    itemProps: (item: any) => ({
      key: item.name,
      label: `Action: ${item.label || 'New Action'}`,
    }),
  },
]
