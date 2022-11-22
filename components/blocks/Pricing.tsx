import { RichTextWrapper } from '../layout/RichTextWrapper'
import { Wrapper } from '../layout/Wrapper'
import { Actions } from './Actions'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

const PricingCard = ({ data }) => {
  if (!data) return null

  return (
    <>
      <div className="card">
        <div className="header">
          <h3 className="title">{data.name}</h3>
          {data.price && (
            <>
              <span className="dotted"></span>
              <h3 className="price !text-blue-800">
                <span className="number">{data.price}</span>
                {data.interval && (
                  <span className="interval">{data.interval}</span>
                )}
              </h3>
            </>
          )}
        </div>
        <div className="body">
          <div className="content">
            {/* @ts-ignore */}
            {data.body && <TinaMarkdown content={data.body} />}
          </div>
          {data.actions && <Actions items={data.actions} />}
        </div>
      </div>
      <style jsx>{`
        .card {
          flex: 1 1 auto;
          width: 100%;
          margin: 0 auto;
          max-width: 38rem;
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
          gap: 1rem;
          line-height: 1.2;
          background: linear-gradient(
            to bottom right,
            var(--color-seafoam-200),
            var(--color-seafoam-100),
            white
          );
          border-bottom: 1px solid var(--color-seafoam-300);
          padding: 1.5rem 1.5rem;

          @media (min-width: 1400px) {
            padding: 1.5rem 2rem;
          }
        }
        .title {
          font-family: var(--font-tuner);
          color: var(--color-orange);
          font-size: 1.5rem;
          flex: 0 0 auto;
          margin: 0;
        }
        .price {
          font-family: var(--font-tuner);
          font-size: 1.5rem;
          flex: 0 0 auto;
          margin: 0;
          display: flex;
          flex-direction: column;
          item-align: center;
          text-align: center;
        }
        .interval {
          font-size: 0.75em;
          color: var(--color-seaforam-500);
        }
        .body {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: var(--color-secondary);
          background: white;
          padding: 1.75rem 1.5rem;

          @media (min-width: 1400px) {
            padding: 2.25rem 2rem;
          }
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
            font-size: 1.125rem;
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

export function PricingBlock({ data, index }) {
  return (
    <>
      <section key={index} className="section pricing">
        <RichTextWrapper>
          <Wrapper>
            {data.intro && (
              <div className="intro-text text-center">
                <TinaMarkdown content={data.intro} />
              </div>
            )}
            {data.base && <PricingCard data={data.base} />}
            <div className="segue"></div>
          </Wrapper>
          <Wrapper wide>
            <div className="card-wrapper">
              {data.plans &&
                data.plans.map((plan, index) => (
                  <PricingCard data={plan} key={index} />
                ))}
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
          display: block;
          border: none;
          border-image: initial;
          background: url('/svg/vr.svg');
          background-position: center;
          background-size: 100% auto;
          background-repeat: no-repeat;
          width: 7px;
          height: 200px;
          margin: 0 auto;
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
