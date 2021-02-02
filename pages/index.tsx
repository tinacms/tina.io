import React from 'react'
import { GetStaticProps } from 'next'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { Footer } from 'components/layout'
import Link from 'next/link'

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
  let src = 'v1571425758/tina-hero-demo-v2'

  return (
    <>
      <div className="pageWrapper">
        <div className="banner orange">
          <div className="container">
            <Link href="/enterprise">
              <a>
                <span>
                  Sign up for early access{' '}
                  <span className="tinaCloud">
                    for <em>Tina Cloud</em> ☁️
                  </span>
                </span>
                <IconRight />
              </a>
            </Link>
          </div>
        </div>
        <div className="nav black">
          <div className="container navContainer">
            <Link href="/">
              <a className="logomark navLogo">
                <TinaIcon />
                <h1 className="wordmark">Tina.io</h1>
              </a>
            </Link>
            <nav className="navWrapper navNav">
              <ul className="navUl">
                <li className="navLi">
                  <Link href="/docs">Docs</Link>
                </li>
                <li className="navLi">
                  <Link href="/guides">Guides</Link>
                </li>
                <li className="navLi">
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </nav>
            <div className="githubStar navGithub">
              <iframe
                className="starButton"
                src="https://ghbtns.com/github-btn.html?user=tinacms&repo=tinacms&type=star&count=true&size=large"
                frameBorder="0"
                scrolling="0"
                width="150px"
                height="30px"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="feature black">
          <div className="container featureContainer">
            <h2 className="featureTitle">
              Content editing for modern&nbsp;teams
            </h2>
            <p className="featureText">
              Tina is an open-source CMS admin that talks to any API
            </p>
            <div className="featureActions">
              <a href="#" className="button buttonOrange">
                Try Demo <IconRight />
              </a>
              <a href="#" className="button buttonGhost">
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div className="video">
          <div className="container videoContainer">
            <video
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
          </div>
        </div>
        <div className="feature white">
          <div className="container featureContainer">
            <h2 className="featureTitle">
              Edit content, in the <em>context of your site</em>
            </h2>
            <p className="featureText">
              Just click on the page and type. Contextual toolbars and panels
              appear at just the right times to create the content you want.
            </p>
          </div>
        </div>
        <div className="featureGroup white">
          <div className="container featureGroupContainer">
            <div className="summary active">
              <h3 className="summaryTitle">Page Building</h3>
              <p className="summaryText">
                Pick from your custom predefined components to build web
                experiences, blazing fast
              </p>
            </div>
            <div className="details">
              <img
                className="detailsImage"
                src="img/tina-sidebar-gatsby-london.gif"
                alt=""
              />
            </div>
            <div className="summary">
              <h3 className="summaryTitle">Design Systems</h3>
              <p className="summaryText">
                Build pages with YOUR design system. Maximize reusability.
              </p>
            </div>
            <div className="summary">
              <h3 className="summaryTitle">Improve Time-to-Market</h3>
              <p className="summaryText">
                Better creative control, don’t rely on developers to make
                content changes.
              </p>
            </div>
          </div>
        </div>
        <div className="feature blue">
          <div className="container featureContainer">
            <h2 className="featureTitle">
              Build with <em>your components</em>
            </h2>
            <p className="featureText">
              Let your team build great layouts with your own
              React&nbsp;components.
            </p>
          </div>
        </div>
        <div className="demo">
          <div className="container demoContainer">
            <iframe
              src="https://codesandbox.io/embed/vigilant-cohen-73its?fontsize=147hidenavigation=17theme=dark"
              width="800"
              height="800"
              title="CodeSandbox example of TinaCMS with Next.js"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
            ></iframe>
          </div>
        </div>
        <div className="feature white">
          <div className="container featureContainer">
            <h2 className="featureTitle">Avoid Vendor Lock-In</h2>
            <p className="featureText">
              Add visual editing to your site for logged in users. Write&nbsp;to
              any API.
            </p>
          </div>
        </div>
        <div className="valueProps white">
          <div className="container browserContainer">
            <div className="browser browserGrid">
              <div className="browserContent">
                <span className="contentTitle">Tina comes with editing.</span>
                <span className="contentText">
                  Super simple, just click and edit.
                </span>
                <span className="contentFootnote">
                  It’s 35 degrees and sunny
                </span>
              </div>
              <div className="browserImageWrapper">
                <img className="browserImage" src="img/tina-wow.png" alt="" />
              </div>
            </div>
            <div className="divider dividerMobile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 600 120"
                width="100%"
                preserveAspectRatio="false"
              >
                <line
                  x1="50%"
                  x2="50%"
                  y1="0"
                  y2="100%"
                  stroke="var(--color-orange)"
                  strokeWidth="4"
                  strokeDasharray="10 20"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="divider dividerDesktop">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1200 150"
                className="dividerSvg"
              >
                <g>
                  <path
                    stroke="var(--color-orange)"
                    strokeWidth="4"
                    strokeDasharray="10 20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    d="M591.036 0v70.447m0 0H20c-11.046 0-20 8.955-20 20v51.406m591.036-71.406H1180c11.05 0 20 8.955 20 20V150"
                  ></path>
                </g>
                <line
                  x1="49.25%"
                  x2="49.25%"
                  y1="0"
                  y2="100%"
                  stroke="var(--color-orange)"
                  strokeWidth="4"
                  strokeDasharray="10 20"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="cardGroup">
              <div className="card">
                <img src="img/headlessCms.png" alt="" className="cardImage" />
                <h3 className="cardTitle">Headless Cms</h3>
                <p className="cardText">
                  Sync your website data to a headless CMS of your choice
                </p>
              </div>
              <div className="divider dividerMobile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 600 120"
                  width="100%"
                  preserveAspectRatio="false"
                >
                  <line
                    x1="50%"
                    x2="50%"
                    y1="0"
                    y2="100%"
                    stroke="var(--color-orange)"
                    strokeWidth="4"
                    strokeDasharray="10 20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
              <div className="card">
                <img src="img/headlessCms.png" alt="" className="cardImage" />
                <h3 className="cardTitle">3rd Party APIs</h3>
                <p className="cardText">
                  Sync your website data to a headless CMS of your choice
                </p>
              </div>
              <div className="divider dividerMobile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 600 120"
                  width="100%"
                  preserveAspectRatio="false"
                >
                  <line
                    x1="50%"
                    x2="50%"
                    y1="0"
                    y2="100%"
                    stroke="var(--color-orange)"
                    strokeWidth="4"
                    strokeDasharray="10 20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
              <div className="card">
                <img src="img/headlessCms.png" alt="" className="cardImage" />
                <h3 className="cardTitle">Git Filesystem</h3>
                <p className="cardText">
                  Sync your website data to a headless CMS of your choice
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="feature lightGray">
          <div className="container featureContainer">
            <h2 className="featureTitle">Explore the Tina ecosystem</h2>
            <p className="featureText">
              More than just a headless CMS, Tina has all the tools for building
              web experiences for interdisciplinary teams.
            </p>
          </div>
        </div>
        <div className="featureGroup lightGray">
          <div className="container featureGroupContainer">
            <div className="summary active">
              <h3 className="summaryTitle">Data Source Plugins</h3>
              <p className="summaryText">
                Pick from your custom predefined components to build web
                experiences, blazing fast
              </p>
            </div>
            <div className="details">
              <img
                className="detailsImage"
                src="img/tina-sidebar-gatsby-london.gif"
                alt=""
              />
            </div>
            <div className="summary">
              <h3 className="summaryTitle">Design Systems</h3>
              <p className="summaryText">
                Build pages with YOUR design system. Maximize reusability.
              </p>
            </div>
            <div className="summary">
              <h3 className="summaryTitle">Improve Time-to-Market</h3>
              <p className="summaryText">
                Better creative control, don’t rely on developers to make
                content changes.
              </p>
            </div>
          </div>
        </div>
        <div className="learnTina">
          <div className="container learnContainer">
            <div className="learnImageWrapper">
              <img className="learnImage" src="img/flyingTina.png" alt="" />
            </div>
            <div className="learnContent">
              <h3 className="learnTitle">Learn Tina</h3>
              <p className="learnText">
                Learn Tina through Interactive & Fun Tutorials.
              </p>
              <div className="buttonGroup">
                <a href="#" className="button buttonOrange">
                  Get Started <IconRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style global jsx>{`
        :root {
          --color-orange: #ec4815;
          --color-orange-light: #eb6337;
          --color-orange-dark: #dc4419;
          --color-yellow: #f2c94c;
          --color-green: #6fcf97;
          --color-black: #111920;
          --color-blue: #241748;
          --color-white: #ffffff;
          --color-gray: #f3f3f3;
          --color-light-gray: #fafafa;

          --color-emphasis: var(--color-orange);
          --color-card-background: var(--color-light-gray);
        }
      `}</style>
      <style jsx>{`
        .pageWrapper {
        }

        .container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .banner {
          :global(a) {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 0;
            font-size: 1.25rem;
            line-height: 1.4;
            text-decoration: none;
            color: inherit;
            transition: opacity 150ms ease-out;

            &:hover {
              opacity: 0.8;
            }
          }

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

        .tinaCloud {
          display: inline-block;
          white-space: nowrap;
        }

        .nav {
          padding: 2rem 0 2rem 0;
        }

        .navContainer {
          display: grid;
          grid-gap: 2rem 1rem;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;

          @media (min-width: 800px) {
            grid-gap: 1rem;
            align-items: center;
            grid-template-columns: auto 1fr auto;
            grid-template-rows: 1fr;
          }
        }

        .navLogo {
          grid-column-start: 1;
          grid-column-end: 2;
          grid-row-start: 1;
          grid-row-end: 2;
          text-decoration: none;

          @media (min-width: 800px) {
            grid-column-start: 1;
            grid-column-end: 2;
          }
        }

        .navNav {
          grid-column-start: 1;
          grid-column-end: 3;
          grid-row-start: 2;
          grid-row-end: 3;
          justify-self: center;

          @media (min-width: 800px) {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 2;
          }
        }

        .navGithub {
          grid-column-start: 2;
          grid-column-end: 3;
          grid-row-start: 1;
          grid-row-end: 2;
          justify-self: end;

          @media (min-width: 800px) {
            grid-column-start: 3;
            grid-column-end: 4;
          }
        }

        .navUl {
          display: flex;
          margin: 0 -1.5rem;
        }

        .navLi {
          margin: 0 1.5rem;

          :global(a) {
            color: white;
            opacity: 0.7;
            transition: opacity 150ms ease-out;
            text-decoration: none;
            font-size: 1.125rem;

            &:hover {
              opacity: 1;
            }
          }
        }

        .logomark {
          color: var(--color-orange);
          fill: var(--color-orange);
          display: flex;
          align-items: center;

          :global(svg) {
            margin-top: -0.5rem;
            height: 2.75rem;
            width: auto;
            margin-right: 0.75rem;
          }
        }

        .wordmark {
          font-size: 1.675rem;
          font-weight: bold;
          font-family: var(--font-tuner);
        }

        .feature {
          padding: 9rem 0;
        }

        .featureContainer {
          max-width: 740px;
          text-align: center;
        }

        .featureTitle {
          font-family: var(--font-tuner);
          font-weight: bold;
          font-size: 2.75rem;
          line-height: 1.4;
          margin-bottom: 2rem;

          :global(em) {
            font-style: inherit;
            font-weight: inherit;
            color: var(--color-emphasis);

            @media (min-width: 600px) {
              white-space: nowrap;
            }
          }
        }

        .featureText {
          display: block;
          width: 100%;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          font-size: 1.375rem;
          margin-bottom: 2rem;
        }

        .featureActions {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 0.5rem;
          margin: 0 -0.5rem;

          :global(a),
          :global(button) {
            margin: 0 0.5rem;
          }
        }

        .button {
          font-family: var(--font-tuner);
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

          :global(svg) {
            display: inline-block;
            width: auto;
            height: 1.125em;
            margin-left: 0.75rem;
          }
        }

        .buttonOrange {
          background: var(--color-orange);
          transition: background 150ms ease-out;
          color: white;

          :hover {
            background: var(--color-orange-light);
          }
        }

        .buttonGhost {
          opacity: 0.7;
          transition: opacity 150ms ease-out;

          :hover {
            opacity: 1;
          }
        }

        .video {
          margin-top: -3rem;
          background: linear-gradient(
            to bottom,
            var(--color-black) 0%,
            var(--color-blue) 50%,
            var(--color-light-gray) 50%,
            var(--color-white) 100%
          );
        }

        .videoContainer {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        video {
          width: 100%;
          margin: 0;
          border-radius: 0.25rem;
          box-shadow: inset 0 0 0 1px rgba(236, 72, 21, 0.03),
            0 6px 24px rgba(0, 37, 91, 0.05), 0 2px 4px rgba(0, 37, 91, 0.03);
        }

        .featureGroup {
          margin-top: -5rem;
          padding-bottom: 9rem;
        }

        .featureGroupContainer {
          display: grid;
          grid-gap: 2rem;
          align-content: start;
          align-items: start;

          @media (min-width: 1000px) {
            grid-gap: 2rem 4rem;
            grid-template-columns: 2fr 3fr;
            grid-template-rows: auto auto 1fr;
          }
        }

        .summary {
          grid-column-start: 1;
          opacity: 0.4;
          transition: opacity 150ms ease-out;
          cursor: pointer;
          user-select: none;
          color: var(--color-blue);
        }

        .summary.active {
          cursor: inherit;
          color: var(--color-black);
        }

        .summary.active,
        .summary:hover {
          opacity: 1;
        }

        .summaryTitle {
          font-size: 1.675rem;
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        .summaryText {
          font-size: 1.125rem;
          max-width: 400px;
          margin: 0;
        }

        .details {
          @media (min-width: 1000px) {
            grid-column-start: 2;
            grid-row-start: 1;
            grid-row-end: 4;
          }
        }

        .detailsImage {
          width: 100%;
          display: block;
          margin: 0;
        }

        .demoContainer {
          max-width: 1600px;
        }

        .demo {
          margin-top: -4rem;
          background: linear-gradient(
            to bottom,
            var(--color-blue) 0%,
            var(--color-blue) 100%
          );

          :global(iframe) {
            width: 100%;
            border: none !important;
            display: block;
            margin: 0;
          }
        }

        .valueProps {
          margin-top: -5rem;
          padding-bottom: 9rem;
        }

        .browser {
          position: relative;
          padding: 4rem 3rem 3rem 3rem;
          border-radius: 2rem;
          overflow: visible;
          background: var(--color-card-background);
          background: linear-gradient(
            to bottom right,
            var(--color-light-gray) 30%,
            var(--color-gray)
          );
          transform: rotate3d(1, 0, 0, 2deg);
          background-position: top left;
          border-radius: 0.25rem;
          box-shadow: inset 0 0 0 1px rgba(236, 72, 21, 0.03),
            0 24px 32px rgba(236, 72, 21, 0.05),
            0 6px 8px rgba(236, 72, 21, 0.03),
            0 48px 48px -64px rgba(236, 72, 21, 0.3);

          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 2rem;
            left: 3rem;
            transform: translate3d(-0.875rem, 0, 0);
            width: 0.875rem;
            height: 0.875rem;
            border-radius: 1rem;
            overflow: visible;
            box-shadow: 0.875rem 0 0 var(--color-orange),
              2.375rem 0 0 var(--color-yellow), 3.875rem 0 0 var(--color-green);
          }
        }

        .browserContainer {
          perspective: 300px;
        }

        .browserGrid {
          display: grid;
          grid-gap: 3rem 2rem;

          @media (min-width: 1000px) {
            grid-template-columns: 1fr 1fr;
            align-items: center;
          }
        }

        .browserContent {
        }

        .contentTitle {
          font-family: var(--font-tuner);
          color: var(--color-orange);
          display: block;
          font-size: 2.25rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .contentText {
          display: block;
          font-size: 1.5rem;
          margin-bottom: 1.25rem;
        }

        .contentFootnote {
          display: block;
          font-size: 1.125rem;
          opacity: 0.5;
        }

        .browserImageWrapper {
          margin-top: -1rem;
        }

        .browserImage {
          display: block;
          width: 100%;
          height: auto;
          margin: 0;
          filter: drop-shadow(0 3px 8px rgba(0, 37, 91, 0.07));
        }

        .divider {
          display: flex;
          justify-content: center;
          width: 100%;

          :global(svg) {
            width: 100%;
            margin: 0 auto;
            overflow: visible !important;

            :global(line),
            :global(path) {
              animation: dash 1s infinite linear;
            }
          }

          @media (min-width: 1000px) {
            :global(svg) {
              width: 66%;
            }
          }
        }

        .dividerDesktop {
          height: 7.5rem;

          :global(svg) {
            height: 100%;
          }

          @media (max-width: 999px) {
            display: none;
          }
        }

        .dividerMobile {
          height: 4rem;

          @media (min-width: 1000px) {
            display: none;
          }

          :global(svg) {
            width: 100%;
          }
        }

        @keyframes dash {
          0% {
            stroke-dashoffset: 30;
          }

          100% {
            stroke-dashoffset: 0;
          }
        }

        .cardGroup {
          display: grid;
          grid-template-rows: 1fr;

          @media (min-width: 1000px) {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2rem;
          }
        }

        .card {
          background: var(--color-card-background);
          padding: 2rem;
          border-radius: 0.25rem;
          box-shadow: inset 0 0 0 1px rgba(236, 72, 21, 0.03),
            0 6px 24px rgba(0, 37, 91, 0.05), 0 2px 4px rgba(0, 37, 91, 0.03);
        }

        .cardImage {
          display: block;
          width: auto;
          margin-bottom: 1.125rem;
        }

        .cardTitle {
          font-size: 1.675rem;
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        .cardText {
          font-size: 1.125rem;
          opacity: 0.7;
        }

        .learnTina {
          padding: 5rem 0;
          background-image: url('/img/clouds.jpg');
          background-position: center top;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .learnContainer {
          display: grid;
          grid-gap: 2rem;
          align-content: center;
          align-items: center;
          max-width: 820px;

          @media (min-width: 1000px) {
            grid-gap: 2rem;
            grid-template-columns: 2fr 3fr;
          }
        }

        @keyframes learnImage {
          0% {
            transform: translate3d(0, -0.5rem, 0);
          }
          100% {
            transform: translate3d(0, 0.75rem, 0);
          }
        }

        .learnImage {
          margin: 0;
          position: relative;
          animation: learnImage 3s ease-in-out infinite alternate;

          @media (prefers-reduced-motion) {
            animation: none;
          }
        }

        .learnContent {
        }

        .learnTitle {
          font-family: var(--font-tuner);
          margin-bottom: 1rem;
          font-size: 2.25rem;
          font-weight: bold;
        }

        .learnText {
          display: block;
          font-size: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .buttonGroup {
          display: flex;
          align-items: center;
          padding-top: 0.5rem;
          margin: 0 -0.5rem;

          :global(a),
          :global(button) {
            margin: 0 0.5rem;
          }
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

          --color-emphasis: var(--color-orange-light);
        }

        .lightGray {
          background: var(--color-light-gray);
          color: var(--color-black);

          --color-card-background: var(--color-white);
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
