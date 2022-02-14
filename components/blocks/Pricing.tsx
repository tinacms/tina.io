import * as React from 'react'
import { MarkdownContent, RichTextWrapper, Wrapper } from 'components/layout'
import { Actions } from 'components/blocks'

export function PricingBlock({ data, index }) {
  return (
    <>
      <section key={index} className="section pricing">
        <RichTextWrapper>
          <Wrapper>
            <div className="intro-text">
              <p>
                <strong>No surprises.</strong> Predictable pricing for every
                project. Complete control of your content, forever.
              </p>
              <p>
                Tina’s source code is open-source. Your content lives in
                accessible formats right in your Git repository.
              </p>
            </div>
            <PricingCard
              actions={[
                {
                  variant: 'orange',
                  label: 'Get Started',
                  icon: 'arrowRight',
                  url: '#',
                },
              ]}
            />
            <div className="segue">
              <span>
                <strong>Need a bit more?</strong>
                <br /> We have you covered.
              </span>
            </div>
          </Wrapper>
          <Wrapper wide>
            <div className="card-wrapper">
              <PricingCard
                name="Team"
                price="$"
                interval="month"
                size="small"
              />
              <PricingCard
                name="Business"
                price="$$$"
                interval="month"
                body={`- Tina's Business plan offers **something** per project\n- Each additional something being billed at **$0/month**`}
                size="small"
              />
              <PricingCard
                name="Enterprise"
                price="Contact Us"
                body={`- Our Enterprise plan offers **amazing features**\n- Really **exceptional value**\n- **Anything is possible**`}
                size="small"
              />
            </div>
          </Wrapper>
        </RichTextWrapper>
      </section>
      <style jsx>{`
        .section {
          padding: 3rem 0;

          @media (min-width: 800px) {
            padding: 5rem 0;
          }
        }

        .seafoam {
          background-color: var(--color-seafoam);
          background: linear-gradient(
            to bottom,
            var(--color-seafoam-200) 8rem,
            var(--color-seafoam-100)
          );
        }

        .intro-text {
          margin: 0 auto 4.5rem auto;
          max-width: 40rem;

          :global(p) {
            &:first-of-type {
              font-size: 1.5rem;
            }

            font-size: 1.25rem;
            color: var(--color-secondary);
          }
        }
        .faq-wrapper {
          :global(h3) {
            font-size: 2rem;
            color: var(--color-secondary);
            font-family: var(--font-tuner);
          }
          :global(p) {
            &:first-of-type {
              font-size: 1.5rem;
              margin-bottom: 2.5rem;
            }
            color: var(--color-secondary);
          }
        }
        .segue {
          position: relative;
          font-size: 1.5rem;
          text-align: center;
          color: var(--color-secondary);
          padding: 4.5rem 0;

          :global(span) {
            display: block;
            padding: 1rem;
            background: white;
          }

          @media (min-width: 1100px) {
            padding: 6rem 0;
          }

          &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            height: 100%;
            width: 0;
            transform: translateX(-50%);
            border-left: 5px dotted var(--color-seafoam-dark);
            z-index: -1;
          }
        }
        .card-wrapper {
          margin-bottom: 4rem;
          display: flex;
          width: 100%;
          overflow: hidden;
          border-radius: 0.75rem;
          box-shadow: 0 6px 24px rgba(0, 37, 91, 0.05),
            0 2px 4px rgba(0, 37, 91, 0.03);

          :global(> *) {
            box-shadow: none;
          }

          @media (max-width: 1099px) {
            max-width: 40rem;
            margin: 0 auto;
            flex-direction: column;
            align-items: stretch;
            justify-content: stretch;

            :global(> *) {
              &:not(:last-child) {
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
                border-bottom: none;
              }
              &:not(:first-child) {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
              }
            }
          }

          @media (min-width: 1100px) {
            flex-direction: row;
            align-items: stretch;
            justify-content: space-between;

            :global(> *) {
              &:not(:last-child) {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                border-right: none;
              }
              &:not(:first-child) {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
              }
            }
          }
        }
      `}</style>
    </>
  )
}

const PricingCard = ({
  size = 'large',
  name = 'Community',
  price = 'Free',
  interval = '',
  actions = [
    {
      variant: 'white',
      label: 'Contact Us',
      icon: 'arrowRight',
      url: '/',
    },
  ],
  body = '',
}) => {
  return (
    <>
      <div className="card">
        <div className="header">
          <h3 className="title">{name}</h3>
          <span className="dotted"></span>
          <h3 className="price">
            {price}
            {interval && <span className="interval">/{interval}</span>}
          </h3>
        </div>
        <div className="body">
          <div className="content">
            <MarkdownContent content={body} />
          </div>
          <Actions items={actions} />
        </div>
      </div>
      <style jsx>{`
        .card {
          flex: 1 1 auto;
          width: 100%;
          margin: 0 auto;
          max-width: 45rem;
          border: 1px solid var(--color-seafoam-300);
          border-radius: 0.75rem;
          box-shadow: 0 6px 24px rgba(0, 37, 91, 0.05),
            0 2px 4px rgba(0, 37, 91, 0.03);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          flex-wrap: wrap;
          align-items: center;
          line-height: 1.2;
          background: var(--color-seafoam-100);
          border-bottom: 1px solid var(--color-seafoam-300);
          padding: ${size === 'large' ? '2.5rem' : '2.25rem'};
        }
        .title {
          font-family: var(--font-tuner);
          color: var(--color-orange);
          font-size: ${size === 'large' ? '2rem' : '1.5rem'};
          flex: 0 0 auto;
          padding-right: 1rem;
          margin: 0;
        }
        .price {
          font-family: var(--font-tuner);
          color: var(--color-secondary);
          font-size: ${size === 'large' ? '2rem' : '1.5rem'};
          flex: 0 0 auto;
          padding-left: 1rem;
          margin: 0;
        }
        .interval {
          margin-left: 0.125rem;
          font-size: 0.75em;
          color: var(--color-seaforam-500);
        }
        .body {
          flex: 1 1 auto;
          padding: ${size === 'large' ? '2.5rem' : '2.25rem'};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: var(--color-secondary);
        }
        .content {
          :global(strong) {
            opacity: 0.8;
          }
          :global(ul) {
            margin: 0 0 1.5rem 0;
            padding: 0;
            list-style-type: none;
          }
          :global(li) {
            position: relative;
            margin: 0 0 0.5rem 0;
            padding: 0 0 0 1.5rem;
            &:before {
              content: '';
              position: absolute;
              left: 0;
              top: 0.6em;
              width: 0.5em;
              height: 0.5em;
              border-radius: 100%;
              background: var(--color-seafoam-400);
            }
          }
          :global(p) {
            font-size: ${size === 'large' ? '1.25rem' : '1.125rem'};
          }
        }
        .dotted {
          border-top: none;
          border-right: none;
          border-left: none;
          border-image: initial;
          border-bottom: 5px dotted var(--color-seafoam-dark);
          width: 100%;
          max-width: 100%;
          flex: 1 1 0;
          display: block;
          height: 0px;
          margin: 0.5rem 0 0.5rem 0;
        }
      `}</style>
    </>
  )
}
