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
  NextLogo,
  ReactLogo,
  StrapiLogo,
} from 'components/logos'

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
      <div className={styles.pageWrapper}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Bring Editing to Your <Framework activeStack={activeStack} />{' '}
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
          </div>
        </div>
      </div>
    </OpenAuthoringSiteForm>
  )
}

const Framework = ({ activeStack }) => {
  const activeFramework =
    activeStack.framework === 'gatsby' ? (
      <GatsbyLogo />
    ) : activeStack.framework === 'next' ? (
      <NextLogo />
    ) : activeStack.framework === 'react' ? (
      <ReactLogo />
    ) : null
  return activeFramework
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
