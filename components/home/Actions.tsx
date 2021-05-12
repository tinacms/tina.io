import React from 'react'
import { InlineGroup } from 'react-tinacms-inline'
import { IconRight } from './Icons'

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
          position: relative;
          text-decoration: none;
          color: inherit;
          font-size: 1.25rem;
          line-height: 1;
          font-weight: bold;
          padding: 1rem 1.75rem;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          white-space: nowrap;
          outline: none;

          &:after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 150ms ease-out;
            border-radius: 0.25rem;
            box-shadow: 0 0 0 4px currentColor;
          }
          &:focus,
          &:active {
            &:after {
              opacity: 0.3;
            }
          }
          :global(svg) {
            display: inline-block;
            width: auto;
            height: 1.125em;
            margin-left: 0.75rem;
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
            height: 1rem;
          }
        }

        .orange {
          background: var(--color-orange);
          transition: background 150ms ease-out;
          color: white;

          :hover {
            background: var(--color-orange-light);
          }
        }

        .ghost {
          opacity: 0.7;
          transition: opacity 150ms ease-out;

          :hover {
            opacity: 1;
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
