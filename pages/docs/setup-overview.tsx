import React from 'react'
import { NextSeo } from 'next-seo'
import { DocsLayout } from 'components/layout'
import { useRouter } from 'next/router'
import * as ga from '../../utils/ga'
import { getDocProps, getDocsNav } from 'utils/docs/getDocProps'
import { GetStaticProps } from 'next/types'
import { NotFoundError } from 'utils/error/NotFoundError'
import { Actions } from 'components/home/Actions'

const pageData = {
  title: 'Getting Started',
  excerpt: 'Whatever',
}

const OverviewTemplate = props => {
  const router = useRouter()
  const isBrowser = typeof window !== `undefined`

  React.useEffect(() => {
    const handleRouteChange = url => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <NextSeo
        title={pageData.title}
        titleTemplate={'%s | TinaCMS Docs'}
        description={pageData.excerpt}
        openGraph={{
          title: pageData.title,
          description: pageData.excerpt,
          // images: [openGraphImage(frontmatter.title, '| TinaCMS Docs')],
        }}
      />
      <DocsLayout navItems={props.docsNav}>
        <div className="wrapper">
          <div className="intro">
            <h1>Getting Started With Tina</h1>
            <hr />
            <p className="intro-text">
              Tina is a Git-backed headless content management system that
              enables developers and content creators to collaborate seamlessly.
              With Tina, developers can create a custom visual editing
              experience that is perfectly tailored to their site.
            </p>
            <p>
              Tina is a Git-backed headless content management system that
              enables developers and content creators to collaborate seamlessly.
            </p>
          </div>
          <div className="cards">
            <a className="card" href="#">
              <h2>CLI Quickstart</h2>
              <p>
                Select a starter or bootstrap your Next.js project with Tina
                setup and get started in minutes.
              </p>
              <div className="spacer"></div>
              <Actions
                items={[
                  {
                    variant: 'secondary',
                    label: 'Learn More',
                    icon: 'arrowRight',
                    url: '/',
                  },
                ]}
              />
            </a>
            <a className="card" href="#">
              <h2>Existing Next.js Site</h2>
              <p>
                Learn how to set up an existing Next.js site for editing with
                Tina.
              </p>
              <div className="spacer"></div>
              <Actions
                items={[
                  {
                    variant: 'secondary',
                    label: 'Learn More',
                    icon: 'arrowRight',
                    url: '/',
                  },
                ]}
              />
            </a>
            <a className="card" href="#">
              <h2>Select A Tina Starter</h2>
              <p>Select a Tina starter from Tina Cloud's onboarding process.</p>
              <div className="spacer"></div>
              <Actions
                items={[
                  {
                    variant: 'secondary',
                    label: 'Select Starter',
                    icon: 'arrowRight',
                    url: '/',
                  },
                ]}
              />
            </a>
          </div>
        </div>
        <style jsx>{`
          .wrapper {
            display: block;
            width: 100%;
            position: relative;
            padding: 1rem 2rem 3rem 2rem;
            max-width: 1400px;
            margin: 0 auto;

            @media (min-width: 500px) {
              padding: 1rem 3rem 3rem 3rem;
            }
          }

          .intro {
            display: block;
            max-width: 960px;
            margin: 0 auto 2.25rem auto;
          }

          .intro-text {
            font-size: 1.25rem;
          }

          .cards {
            border-radius: 0.75rem;
            overflow: hidden;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
            }

            &:hover {
              background-color: var(--color-seafoam-100);

              h2,
              h3 {
                color: var(--color-secondary);
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
      </DocsLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async function(props) {
  // @ts-ignore This should maybe always be a string[]?
  const slug = 'setup-overview'

  try {
    return await getDocProps(props, slug)
  } catch (e) {
    if (e) {
      return {
        props: {
          error: { ...e }, //workaround since we cant return error as JSON
        },
      }
    } else if (e instanceof NotFoundError) {
      return {
        props: {
          notFound: true,
        },
      }
    }
  }
}

export default OverviewTemplate
