import { Container } from './Container'
import HeroBg from '../../public/svg/hero-bg.svg'

export function HeroBlock({ data, index }) {
  return (
    <section
      key={index}
      className={`relative overflow-visible z-10 text-center px-8 pb-10 md:pb-16 lg:pb-28 pt-32 lg:pt-40`}
    >
      <Container width="narrow" center>
        <HeroFeature item={data} />

        <form
          action="https://formspree.io/f/mzbqndez"
          method="POST"
        >
          <label>
            Your email:
            <input type="email" name="email" />
          </label>
          <label>
            Your message:
            <textarea name="message"></textarea>
          </label>
          <button type="submit">Send</button>
        </form>

      </Container>
      <HeroBg className="absolute pointer-events-none -z-1 left-0 bottom-0 w-full h-auto" />
    </section>
  )
}

export const HeroFeature = ({ item }) => {
  return (
    <>
      <div className="feature">
        {item.headline && <h2 className="heading">{item.headline}</h2>}
        {item.text && <p className="text-xl mt-6">{item.text}</p>}
      </div>
      <style jsx>{`
        .heading {
          font-family: var(--font-tuner);
          font-weight: bold;
          font-style: normal;
          font-size: 2.5rem;
          line-height: 1.3;
          letter-spacing: 0.1px;
          display: inline-block;
          color: transparent;
          background: linear-gradient(
            to right,
            var(--color-orange-light),
            var(--color-orange),
            var(--color-orange-dark)
          );
          -webkit-background-clip: text;
          background-clip: text;
          text-align: center;
          margin: 0 auto;
          max-width: 12em;

          @media (min-width: 800px) {
            font-size: 3rem;
          }

          @media (min-width: 1200px) {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </>
  )
}

export const Video = ({ src }) => {
  return (
    <>
      <video
        className="video"
        autoPlay={true}
        loop
        muted
        playsInline
        poster={`https://res.cloudinary.com/forestry-demo/video/upload/so_0/${src}.jpg`}
      >
        <source
          src={`https://res.cloudinary.com/forestry-demo/video/upload/q_100,h_584/${src}.webm`}
          type="video/webm"
        />
        <source
          src={`https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_584/${src}.mp4`}
          type="video/mp4"
        />
      </video>
      <style jsx>{`
        .video {
          width: 100%;
          border-radius: 0.5rem;
          box-shadow: inset 0 0 0 1px rgba(236, 72, 21, 0.03),
            0 6px 24px rgba(0, 37, 91, 0.05), 0 2px 4px rgba(0, 37, 91, 0.03);
          display: flex;
          justify-content: center;

          @media (min-width: 1100px) {
            width: 90%;
            margin: 0 auto;
          }

          @media (min-width: 1400px) {
            width: 80%;
          }
        }
      `}</style>
    </>
  )
}
