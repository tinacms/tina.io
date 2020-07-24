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
import TinaLogomarkSvg from 'public/svg/tina-logomark.svg'
import WhyTinaBackground from 'public/svg/why-tina-background.svg'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

interface Library {
  id: string
  label: string
  type: 'framework' | 'ui' | 'data'
  component: React.FC | null
  componentSmall: React.FC | null
}

const Next: Library = {
  id: 'next',
  label: 'Next.js',
  type: 'framework',
  component: NextLogo,
  componentSmall: NextLogo,
}

const Gatsby: Library = {
  id: 'gatsby',
  label: 'Gatsby.js',
  type: 'framework',
  component: GatsbyFullLogo,
  componentSmall: GatsbyLogo,
}

const ReactLib: Library = {
  id: 'react',
  label: 'React',
  type: 'framework',
  component: ReactFullLogo,
  componentSmall: ReactLogo,
}

const Github: Library = {
  id: 'github',
  label: 'Github',
  type: 'data',
  component: GithubLogo,
  componentSmall: GithubLogo,
}

const Contentful: Library = {
  id: 'contentful',
  label: 'Contentful',
  type: 'data',
  component: ContentfulLogo,
  componentSmall: ContentfulLogo,
}

const Strapi: Library = {
  id: 'strapi',
  label: 'Strapi',
  type: 'data',
  component: StrapiLogo,
  componentSmall: StrapiLogo,
}

const Bootstrap: Library = {
  id: 'bootstrap',
  label: 'Bootstrap',
  type: 'ui',
  component: BootstrapLogo,
  componentSmall: BootstrapLogo,
}

const Material: Library = {
  id: 'material',
  label: 'Material',
  type: 'ui',
  component: null,
  componentSmall: null,
}

const Foo: Library = {
  id: 'foo',
  label: 'Foo',
  type: 'ui',
  component: null,
  componentSmall: null,
}

const libraries: Library[] = [
  Next,
  Gatsby,
  ReactLib,
  Github,
  Contentful,
  Strapi,
  Bootstrap,
  Material,
  Foo,
]

const DefaultLibraries = [Next, Github]

const codeString = `import { Tina, TinaCMS } from 'tinacms';
const cms = new TinaCMS();
return (
    <Tina cms={cms}>
        <MyApp />
    </Tina>
    <Tina cms={cms}>
        <MyApp />
    </Tina>
    <Tina cms={cms}>
        <MyApp />
    </Tina>
);`

const HomePage = (props: any) => {
  const cms = useCMS()
  const [formData, form] = useGithubJsonForm(props.file, {
    label: 'Home Page',
    fields: [],
  })
  const [activeLibraries, setActiveLibraries] = React.useState(DefaultLibraries)
  const [userOverride, setUserOverride] = React.useState(false)

  const randomizeLibraries = () => {
    if (userOverride) return

    const randomData = randElem(
      libraries.filter(library => {
        return library.type === 'data'
      })
    )
    const randomFramework = randElem(
      libraries.filter(library => {
        return library.type === 'framework'
      })
    )
    const randomUi = randElem(
      libraries.filter(library => {
        return library.type === 'ui'
      })
    )
    setActiveLibraries([randomData, randomFramework, randomUi])
  }

  const setDataLibraries = () => {
    setUserOverride(true)
    const dataLibraries = libraries.filter(library => {
      return library.type === 'data'
    })
    setActiveLibraries(dataLibraries)
  }

  const setFrameworkLibraries = () => {
    setUserOverride(true)
    const frameworkLibraries = libraries.filter(library => {
      return library.type === 'framework'
    })
    setActiveLibraries(frameworkLibraries)
  }

  const setUiLibraries = () => {
    setUserOverride(true)
    const uiLibraries = libraries.filter(library => {
      return library.type === 'ui'
    })
    setActiveLibraries(uiLibraries)
  }

  const resetLibraries = () => {
    setActiveLibraries([])
    setUserOverride(false)
  }

  React.useEffect(() => {
    if (userOverride) return
    const intervalTime = 5000
    const interval = setInterval(() => {
      randomizeLibraries()
    }, intervalTime)
    return () => clearInterval(interval)
  }, [userOverride])

  return (
    <OpenAuthoringSiteForm
      form={form}
      path={props.file.fileRelativePath}
      preview={props.preview}
    >
      <div className={styles.pageWrapper}>
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
              <Framework activeLibraries={activeLibraries} />
              Project
            </h1>
            <p className={styles.heroText}>Made for developers and editors</p>
            <button className={styles.heroButton}>Start Learning</button>
          </div>
          <div className={styles.hero}>
            <div className={styles.wrapper}>
              <div className={styles.aspectRatio}>
                <div className={`${styles.grid} ${styles.gridLeft}`}>
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={1}
                    library={Bootstrap}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={2}
                    library={Strapi}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={3}
                    library={Gatsby}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={4}
                    library={Github}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={5}
                    library={ReactLib}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={6}
                    library={Next}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={7}
                    library={Contentful}
                  />
                </div>
                {/* End First Grid */}
                <div className={styles.grid}>
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={1}
                    library={Github}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={2}
                    library={ReactLib}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={3}
                    library={Next}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={4}
                    library={Contentful}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={5}
                    library={Strapi}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={6}
                    library={Bootstrap}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={7}
                    library={Gatsby}
                  />
                </div>
                {/* End Second Grid */}
                <div className={`${styles.grid} ${styles.gridRight}`}>
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={1}
                    library={ReactLib}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={2}
                    library={Github}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={3}
                    library={Bootstrap}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={4}
                    library={Gatsby}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={5}
                    library={Strapi}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={6}
                    library={Next}
                  />
                  <GridItem
                    activeLibraries={activeLibraries}
                    number={7}
                    library={Contentful}
                  />
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
              <div
                className={styles.heroFeatureCard}
                onMouseEnter={setDataLibraries}
                onMouseLeave={resetLibraries}
              >
                <h2>Data Sources</h2>
                <p>
                  Tina can fetch data anywhere your data lives, from traditional
                  headless CMSes to Airtable and Google Sheets
                </p>
              </div>
              <div
                className={styles.heroFeatureCard}
                onMouseEnter={setFrameworkLibraries}
                onMouseLeave={resetLibraries}
              >
                <h2>Frontend Frameworks</h2>
                <p>
                  Tina plays well with any React-based framework. Whether your
                  site is powered by Gatsby or Next.js, Tina has your back.
                </p>
              </div>
              <div
                className={styles.heroFeatureCard}
                onMouseEnter={setUiLibraries}
                onMouseLeave={resetLibraries}
              >
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
        <div className={styles.whySection}>
          <div className={styles.whySectionContainer}>
            <h2 className={styles.whySectionTitle}>Why Tina?</h2>
            <div className={styles.whyGrid}>
              <div className={styles.whyGridContent}>
                <ThirdPartyIcon />
                <h3>Working with 3rd Party APIs</h3>
                <p>
                  Quisque nisl arcu, volutpat malesuada sapien in, ullamcorper
                  pharetra leo. Quisque velit augue, sagittis non hendrerit eu,
                  semper tincidunt ex. Ut dapibus, sapien sed congue dignissim,
                  odio massa rutrum risus, vel lacinia arcu sapien non libero.{' '}
                </p>
              </div>
              <div className={styles.whyGridCode}>
                <SyntaxHighlighter language="javascript">
                  {codeString}
                </SyntaxHighlighter>
              </div>
              <div className={styles.whyGridCode}>
                <SyntaxHighlighter language="javascript">
                  {codeString}
                </SyntaxHighlighter>
              </div>
              <div className={styles.whyGridContent}>
                <WrapComponentsIcon />
                <h3>Wrap your components</h3>
                <p>
                  Quisque nisl arcu, volutpat malesuada sapien in, ullamcorper
                  pharetra leo. Quisque velit augue, sagittis non hendrerit eu,
                  semper tincidunt ex. Ut dapibus, sapien sed congue dignissim,
                  odio massa rutrum risus, vel lacinia arcu sapien non libero.{' '}
                </p>
              </div>

              <div className={styles.whyGridContent}>
                <BlockBasedEditingIcon />
                <h3>Block Based Editing</h3>
                <p>
                  Quisque nisl arcu, volutpat malesuada sapien in, ullamcorper
                  pharetra leo. Quisque velit augue, sagittis non hendrerit eu,
                  semper tincidunt ex. Ut dapibus, sapien sed congue dignissim,
                  odio massa rutrum risus, vel lacinia arcu sapien non libero.{' '}
                </p>
              </div>
              <div className={styles.whyGridCode}>
                <SyntaxHighlighter language="javascript">
                  {codeString}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
          <div className={styles.whySectionBackground}>
            <WhyTinaBackground />
          </div>
        </div>
      </div>
      {/* End Page Wrapper*/}
    </OpenAuthoringSiteForm>
  )
}

const Framework = ({ activeLibraries }) => {
  const [animationState, setAnimationState] = React.useState(null)
  const [activeLibrary, setActiveLibrary] = React.useState(
    DefaultLibraries.filter(library => {
      return library.type === 'framework'
    })[0]
  )
  const [frameworkWidth, setFrameworkWidth] = React.useState(200)
  const frameworkSpanRef = React.useRef(null)

  React.useEffect(() => {
    if (
      !frameworkSpanRef.current ||
      !activeLibraries.filter(library => {
        return library.type === 'framework'
      })[0] ||
      activeLibraries.filter(library => {
        return library.type === 'framework'
      })[0] === activeLibrary
    ) {
      return
    }

    setAnimationState(styles.heroTitleAnimateOut)

    let animateOutTime = 500

    setTimeout(() => {
      setActiveLibrary(
        activeLibraries.filter(library => {
          return library.type === 'framework'
        })[0]
      )
      setAnimationState(styles.heroTitleAnimate)
    }, animateOutTime)
  }, [frameworkSpanRef.current, activeLibraries])

  React.useEffect(() => {
    if (!frameworkSpanRef.current) return

    setFrameworkWidth(frameworkSpanRef.current.offsetWidth)
  }, [frameworkSpanRef.current, activeLibrary])

  return (
    <span
      className={`${styles.heroTitleFramework} ${styles.heroTitleFrameworkHide2}`}
      style={{ width: `${frameworkWidth}px` }}
    >
      <span className={animationState} ref={frameworkSpanRef}>
        {activeLibrary && <activeLibrary.component />}
      </span>
    </span>
  )
}

interface GridItemProps {
  activeLibraries: Library[] | null
  number: number
  library: Library
}

const GridItem = ({ activeLibraries, number, library }: GridItemProps) => {
  const [activeStyles, setActiveStyles] = React.useState('')

  React.useEffect(() => {
    if (
      activeLibraries.filter(testLibrary => {
        return testLibrary.id === library.id
      }).length > 0
    ) {
      setActiveStyles(styles.gridItemActive)
    } else {
      setActiveStyles('')
    }
  }, [activeLibraries])

  return (
    <div
      className={`${styles.gridItem} ${
        styles['gridItem' + number]
      } ${activeStyles} ${library.id === 'next' ? styles.bigLogo : ''}`}
    >
      {library.componentSmall && <library.componentSmall />}
      <span></span>
      <span></span>
    </div>
  )
}

const ThirdPartyIcon = () => {
  return (
    <span className={styles.thirdPartyIcon}>
      <span></span>
      <span></span>
      <span></span>
    </span>
  )
}

const WrapComponentsIcon = () => {
  return (
    <span className={styles.wrapComponentsIcon}>
      <span></span>
      <span></span>
    </span>
  )
}

const BlockBasedEditingIcon = () => {
  return (
    <span className={styles.blockBasedEditingIcon}>
      <span></span>
      <span></span>
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
