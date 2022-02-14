import React from 'react'
import { RichTextWrapper, Wrapper } from 'components/layout'

export function FaqBlock({ data, index }) {
  return (
    <>
      <section key={index} className="faq section seafoam">
        <RichTextWrapper>
          <Wrapper narrow>
            <div className="faq-wrapper">
              <h3>Frequently Asked Questions</h3>
              <p>
                Maecenas ac tellus vulputate, bibendum orci vitae, fermentum
                purus.
              </p>
              <h4>What's the meaning of life?</h4>
              <p>
                Suspendisse lacinia tempor quam ac aliquet. Quisque sed nunc ac
                sem dictum blandit. Morbi finibus, ligula vitae finibus
                hendrerit, tellus metus auctor urna, lacinia pulvinar justo nibh
                eget nibh. Maecenas a nulla cursus, scelerisque leo vel, ornare
                leo. In hac habitasse platea dictumst. Maecenas ac tellus
                vulputate, bibendum orci vitae, fermentum purus.
              </p>
              <hr />
              <h4>Important question number two goes here?</h4>
              <p>
                Nulla eget sem vel nunc pellentesque iaculis. Donec hendrerit
                eros eget lacus tristique imperdiet. Nulla at ex cursus, mattis
                est tristique, blandit tortor.
              </p>
              <hr />
              <h4>Donec viverra ullamcorper ligula a mollis?</h4>
              <p>
                Praesent massa sem, fermentum eu enim sed, convallis vulputate
                nulla. Nam vitae ex eget lectus commodo elementum non sit amet
                nisl. Proin egestas sit amet lectus ac ultricies. Suspendisse
                potenti. Praesent sed tempus magna, sit amet vestibulum ex. Sed
                pretium, ipsum vitae convallis tristique, tellus tortor euismod
                ante.
              </p>
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
      `}</style>
    </>
  )
}
