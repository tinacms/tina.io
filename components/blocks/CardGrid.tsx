import Link from 'next/link';
import { Actions } from '../blocks/ActionButton/ActionsButton';

export const CardGrid = ({ props }) => {
  return (
    <>
      <div className="cards grid-cols-1 md:grid-cols-2 my-8">
        {props.cards?.map((card) => (
          <a className="card" href={card.link}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <div className="spacer"></div>
            {card.linkText && (
              <Actions
                items={[
                  {
                    variant: 'secondary',
                    label: card.linkText,
                    icon: 'arrowRight',
                    url: card.link,
                  },
                ]}
                flush={true}
              />
            )}
          </a>
        ))}
      </div>
      <style jsx>{`
        .cards {
          border-radius: 0.75rem;
          overflow: hidden;
          display: grid;
          width: 100%;
          border: 1px solid var(--color-seafoam-300);
          box-shadow: 0 6px 24px rgba(0, 37, 91, 0.05),
            0 2px 4px rgba(0, 37, 91, 0.03);
        }

        .card {
          width: 100%;
          padding: 2.25rem 2rem;
          width: calc(100% + 1px);
          height: calc(100% + 1px);
          margin: 0 -1px -1px 0;
          border-right: 1px solid var(--color-seafoam-300);
          border-bottom: 1px solid var(--color-seafoam-300);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-decoration: none;
          transition: all ease-out 150ms;
          background-color: transparent;

          h2,
          h3 {
            transition: all ease-out 150ms;
            color: var(--color-orange);
            font-weight: bold;
            font-size: 1.5rem;
            line-height: 1.3;
            font-family: var(--font-tuner);
          }

          &:hover {
            background-color: var(--color-seafoam-100);

            * {
              color: var(--color-secondary);
            }

            p {
              color: black;
            }
          }
        }

        .card > *:not(:last-child) {
          margin: 0 0 1rem 0;
        }

        .spacer {
          flex: 1 1 auto;
          margin: 0 !important;
        }
      `}</style>
    </>
  );
};
