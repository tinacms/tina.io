import React from 'react'
import { GetStaticProps } from 'next'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'

const IconRight = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
    </svg>
  )
}

const TinaIcon = () => {
  return (
    <svg
      viewBox="0 0 49 68"
      fill="inherit"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="title desc"
    >
      <title>Tina</title>
      <desc>A proud llama</desc>
      <path d="M31.4615 30.1782C34.763 27.4475 36.2259 11.3098 37.6551 5.50906C39.0843 -0.291715 44.995 0.00249541 44.995 0.00249541C44.995 0.00249541 43.4605 2.67299 44.0864 4.66584C44.7123 6.65869 49 8.44005 49 8.44005L48.0752 10.8781C48.0752 10.8781 46.1441 10.631 44.995 12.9297C43.8459 15.2283 45.7336 37.9882 45.7336 37.9882C45.7336 37.9882 38.8271 51.6106 38.8271 57.3621C38.8271 63.1136 41.5495 67.9338 41.5495 67.9338H37.7293C37.7293 67.9338 32.1252 61.2648 30.9759 57.9318C29.8266 54.5988 30.2861 51.2658 30.2861 51.2658C30.2861 51.2658 24.1946 50.921 18.7931 51.2658C13.3915 51.6106 9.78922 56.2539 9.13908 58.8512C8.48894 61.4486 8.21963 67.9338 8.21963 67.9338H5.19906C3.36057 62.2603 1.90043 60.2269 2.69255 57.3621C4.88665 49.4269 4.45567 44.9263 3.94765 42.9217C3.43964 40.9172 0 39.1676 0 39.1676C1.68492 35.7349 3.4048 34.0854 10.8029 33.9133C18.201 33.7413 28.1599 32.9088 31.4615 30.1782Z" />
      <path d="M12.25 57.03C12.25 57.03 13.0305 64.2533 17.1773 67.9342H20.7309C17.1773 63.9085 16.7897 53.415 16.7897 53.415C14.9822 54.0035 12.4799 56.1106 12.25 57.03Z" />
    </svg>
  )
}

const HomePage = (props: any) => {
  return (
    <>
      <div className="pageWrapper">
        <div className="banner orange">
          <div className="container">
            <a className="bannerLink">
              <span>
                Sign up for early access for <em>Tina Cloud</em> ☁️
              </span>
              <IconRight />
            </a>
          </div>
        </div>
        <div className="nav black">
          <div className="container navContainer">
            <div className="logomark">
              <TinaIcon />
              <h1 className="wordmark">Tina.io</h1>
            </div>
            <nav className="navWrapper">
              <ul className="navUl">
                <li className="navLi">
                  <a className="navLink" href="#">
                    Docs
                  </a>
                </li>
                <li className="navLi">
                  <a className="navLink" href="#">
                    Guides
                  </a>
                </li>
                <li className="navLi">
                  <a className="navLink" href="#">
                    Blog
                  </a>
                </li>
                <li className="navLi">
                  <iframe
                    className="starButton"
                    src="https://ghbtns.com/github-btn.html?user=tinacms&repo=tinacms&type=star&count=true&size=large"
                    frameBorder="0"
                    scrolling="0"
                    width="150px"
                    height="30px"
                  ></iframe>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="feature black">
          <div className="container"></div>
        </div>
        <div className="video">
          <div className="container"></div>
        </div>
        <div className="feature white">
          <div className="container"></div>
        </div>
        <div className="featureGroup white">
          <div className="container"></div>
        </div>
        <div className="feature blue">
          <div className="container"></div>
        </div>
        <div className="demo blue">
          <div className="container"></div>
        </div>
        <div className="valueProps white">
          <div className="container"></div>
        </div>
        <div className="feature lightGray">
          <div className="container"></div>
        </div>
        <div className="featureGroup lightGray">
          <div className="container"></div>
        </div>
        <div className="learnTina">
          <div className="container"></div>
        </div>
      </div>
      <style global jsx>{`
        :root {
          --color-orange: #ec4815;
          --color-orange-light: #eb6337;
          --color-orange-dark: #dc4419;
          --color-yellow: #f2c94c;
          --color-green: #6fcf97;
          --color-black: #111920;
          --color-blue: #00255b;
          --color-white: #ffffff;
          --color-gray: #b6b6b6;
          --color-light-gray: #f8f8f8;
        }
      `}</style>
      <style jsx>{`
        .pageWrapper {
        }

        .container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .bannner {
        }

        .bannerLink {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 0;
          font-size: 1.25rem;

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

        .nav {
          padding: 2rem 0;
        }

        .navContainer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navUl {
          display: flex;
          margin: 0 -1.5rem;
        }

        .navLi {
          margin: 0 1.5rem;
        }

        .navLink {
          color: white;
          opacity: 0.7;
          transition: opacity 150ms ease-out;
          text-decoration: none;
          font-size: 1.125rem;
        }

        .logomark {
          color: var(--color-orange);
          fill: var(--color-orange);
          display: flex;
          align-items: center;

          :global(svg) {
            margin-top: -0.375rem;
            height: 2.5rem;
            width: auto;
            margin-right: 0.5rem;
          }
        }

        .wordmark {
          font-size: 2rem;
          font-family: var(--font-tuner);
          font-weight: bold;
        }

        .feature {
        }

        .featureGroup {
        }

        .video {
        }

        .demo {
        }

        .orange {
          background: linear-gradient(
            to top right,
            var(--color-orange),
            var(--color-orange-light)
          );
          color: var(--color-white);
        }

        .black {
          background: var(--color-black);
          color: var(--color-white);
        }

        .blue {
          background: var(--color-blue);
          color: var(--color-white);
        }

        .lightGray {
          background: var(--color-light-gray);
          color: var(--color-black);
        }

        .white {
          background: var(--color-white);
          color: var(--color-black);
        }
      `}</style>
    </>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  return getJsonPreviewProps('content/pages/home.json', preview, previewData)
}
