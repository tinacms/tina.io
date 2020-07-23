import React from 'react'
import { GetStaticProps } from 'next'
import { useCMS } from 'tinacms'
import { OpenAuthoringSiteForm } from 'components/layout/OpenAuthoringSiteForm'
import { useGithubJsonForm } from 'react-tinacms-github'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import styles from 'components/styles/home.module.scss'
import {
  GithubLogo,
  BootstrapLogo,
  ContentfulLogo,
  GatsbyLogo,
  GatsbyFullLogo,
  NextLogo,
  ReactLogo,
  ReactFullLogo,
  StrapiLogo,
} from 'components/logos'
import TinaLogomarkSvg from '../public/svg/tina-logomark.svg'

interface ActiveStack {
  data: 'github' | 'contentful' | 'strapi'
  framework: 'gatsby' | 'next' | 'react'
  ui: 'bootstrap' | '' | ''
}

const HomePage = (props: any) => {
  const cms = useCMS()
  const [formData, form] = useGithubJsonForm(props.file, {
    label: 'Home Page',
    fields: [],
  })

  const dataOptions = ['github', 'contentful', 'strapi']
  const frameworkOptions = ['gatsby', 'next', 'react']
  const uiOptions = ['bootstrap', '', '']

  const [activeStack, setActiveStack] = React.useState<ActiveStack>({
    data: 'github',
    framework: 'next',
    ui: '',
  })

  React.useEffect(() => {
    const intervalTime = 5000
    const interval = setInterval(() => {
      const randomData = randElem(dataOptions)
      const randomFramework = randElem(frameworkOptions)
      const randomUI = randElem(uiOptions)
      setActiveStack({
        data: randomData,
        framework: randomFramework,
        ui: randomUI,
      })
    }, intervalTime)
    return () => clearInterval(interval)
  }, [])

  return (
    <OpenAuthoringSiteForm
      form={form}
      path={props.file.fileRelativePath}
      preview={props.preview}
    >
      <div className={styles.header}>
        <a href="/">
          <h1>
            <TinaLogomarkSvg />
          </h1>
        </a>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=tinacms&repo=tinacms&type=star&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          width="150px"
          height="40px"
        ></iframe>
      </div>
      <div className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Bring Editing to Your
            <Framework activeStack={activeStack} />
            Project
          </h1>
          <p className={styles.heroText}>Made for developers and editors</p>
          <button className={styles.heroButton}>Start Learning</button>
        </div>
        <div className={styles.hero}>
          <div className={styles.wrapper}>
            <div className={styles.aspectRatio}>
              <div className={`${styles.grid} ${styles.gridLeft}`}>
                <div
                  className={`${styles.gridItem} ${styles.gridItem4} ${
                    activeStack.data === 'github' ? styles.gridItemActive : ''
                  }`}
                >
                  <GithubLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem5} ${
                    activeStack.framework === 'react'
                      ? styles.gridItemActive
                      : ''
                  }`}
                >
                  <ReactLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem6} ${
                    activeStack.framework === 'next'
                      ? styles.gridItemActive
                      : ''
                  } ${styles.bigLogo}`}
                >
                  <NextLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem7} ${
                    activeStack.data === 'contentful'
                      ? styles.gridItemActive
                      : ''
                  }`}
                >
                  <ContentfulLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem2} ${
                    activeStack.data === 'strapi' ? styles.gridItemActive : ''
                  }`}
                >
                  <StrapiLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem1} ${
                    activeStack.ui === 'bootstrap' ? styles.gridItemActive : ''
                  }`}
                >
                  <BootstrapLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem3} ${
                    activeStack.framework === 'gatsby'
                      ? styles.gridItemActive
                      : ''
                  }`}
                >
                  <GatsbyLogo />
                  <span></span>
                  <span></span>
                </div>
              </div>
              {/* End First Grid */}
              <div className={styles.grid}>
                <div
                  className={`${styles.gridItem} ${styles.gridItem1} ${
                    activeStack.data === 'github' ? styles.gridItemActive : ''
                  }`}
                >
                  <GithubLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem2} ${
                    activeStack.framework === 'react'
                      ? styles.gridItemActive
                      : ''
                  }`}
                >
                  <ReactLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem3} ${
                    activeStack.framework === 'next'
                      ? styles.gridItemActive
                      : ''
                  } ${styles.bigLogo}`}
                >
                  <NextLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem4} ${
                    activeStack.data === 'contentful'
                      ? styles.gridItemActive
                      : ''
                  }`}
                >
                  <ContentfulLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem5} ${
                    activeStack.data === 'strapi' ? styles.gridItemActive : ''
                  }`}
                >
                  <StrapiLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem6} ${
                    activeStack.ui === 'bootstrap' ? styles.gridItemActive : ''
                  }`}
                >
                  <BootstrapLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem7} ${
                    activeStack.framework === 'gatsby'
                      ? styles.gridItemActive
                      : ''
                  }`}
                >
                  <GatsbyLogo />
                  <span></span>
                  <span></span>
                </div>
              </div>
              {/* End Second Grid */}
              <div className={`${styles.grid} ${styles.gridRight}`}>
                <div
                  className={`${styles.gridItem} ${styles.gridItem2} ${
                    activeStack.data === 'github' ? styles.gridItemActive : ''
                  }`}
                >
                  <GithubLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem7} ${
                    activeStack.framework === 'react'
                      ? styles.gridItemActive
                      : ''
                  }`}
                >
                  <ReactLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem3} ${
                    activeStack.framework === 'next'
                      ? styles.gridItemActive
                      : ''
                  } ${styles.bigLogo}`}
                >
                  <NextLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem1} ${
                    activeStack.data === 'contentful'
                      ? styles.gridItemActive
                      : ''
                  }`}
                >
                  <ContentfulLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem5} ${
                    activeStack.data === 'strapi' ? styles.gridItemActive : ''
                  }`}
                >
                  <StrapiLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem6} ${
                    activeStack.ui === 'bootstrap' ? styles.gridItemActive : ''
                  }`}
                >
                  <BootstrapLogo />
                  <span></span>
                  <span></span>
                </div>
                <div
                  className={`${styles.gridItem} ${styles.gridItem4} ${
                    activeStack.framework === 'gatsby'
                      ? styles.gridItemActive
                      : ''
                  }`}
                >
                  <GatsbyLogo />
                  <span></span>
                  <span></span>
                </div>
              </div>
              {/* End Third Grid */}
            </div>
            {/* End Aspect Ratio */}
          </div>
          {/* End End Wrapper */}
        </div>
        {/* End Hero*/}
        <div className={styles.heroFeatures}>
          <div className={styles.heroFeaturesContainer}>
            <div className={styles.heroFeatureCard}>
              <h2>Data Sources</h2>
              <p>
                Tina can fetch data anywhere your data lives, from traditional
                headless CMSes to Airtable and Google Sheets
              </p>
            </div>
            <div className={styles.heroFeatureCard}>
              <h2>Frontend Frameworks</h2>
              <p>
                Tina plays well with any React-based framework. Whether your
                site is powered by Gatsby or Next.js, Tina has your back.
              </p>
            </div>
            <div className={styles.heroFeatureCard}>
              <h2>Component Libraries</h2>
              <p>
                Supercharge your website by converting your components into
                editable blocks.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero Wrapper*/}
    </OpenAuthoringSiteForm>
  )
}

const Framework = ({ activeStack }) => {
  const [animationState, setAnimationState] = React.useState(null)
  const [activeFramework, setActiveFramework] = React.useState(
    activeStack.framework ? activeStack.framework : null
  )

  React.useEffect(() => {
    let animateInTime = 1500
    let animateOutTime = 500

    if (activeStack.framework === activeFramework) return

    setAnimationState(styles.heroTitleAnimateOut)

    setTimeout(() => {
      setActiveFramework(activeStack.framework)
      setAnimationState(styles.heroTitleAnimate)
    }, animateOutTime)
  }, [activeStack])

  return (
    <span className={styles.heroTitleFramework}>
      <span className={animationState}>
        {activeFramework === 'gatsby' ? (
          <GatsbyFullLogo />
        ) : activeFramework === 'next' ? (
          <NextLogo />
        ) : activeFramework === 'react' ? (
          <ReactFullLogo />
        ) : null}
      </span>
    </span>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  return getJsonPreviewProps('content/pages/home.json', preview, previewData)
}

const randElem = array => {
  return array[Math.floor(Math.random() * array.length)]
}
