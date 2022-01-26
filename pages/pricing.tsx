import React from 'react'
import { GetStaticProps } from 'next'
import {
  Hero,
  Layout,
  RichTextWrapper,
  Section,
  Wrapper,
} from 'components/layout'
import { NextSeo } from 'next-seo'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { useGithubJsonForm } from 'react-tinacms-github'
import { usePlugin, useCMS } from 'tinacms'
import { Actions, Divider } from 'components/home'

function PricingPage({ file: community, metadata, preview }) {
  const cms = useCMS()

  // Registers Tina Form
  const [data, form] = useGithubJsonForm(community, {
    label: 'Community Page',
    fields: [
      {
        label: 'Headline',
        name: 'headline',
        description: 'Enter the main headline here',
        component: 'text',
      },
      {
        label: 'Community Image',
        name: 'img',
        component: 'group',
        fields: [
          {
            label: 'Image',
            name: 'src',
            component: 'image',
            parse: media => {
              if (!media) return ''
              return media.id
            },
            uploadDir: () => '/img/',
          },
          { label: 'Alt Text', name: 'alt', component: 'text' },
        ],
      },
      {
        label: 'Secondary Headline',
        name: 'supporting_headline',
        description: 'Enter the secondary headline here',
        component: 'textarea',
      },
      {
        label: 'Secondary Body Copy',
        name: 'supporting_body',
        description: 'Enter the body copy here',
        component: 'markdown',
      },
      {
        label: 'Newsletter Header',
        name: 'newsletter_header',
        component: 'text',
      },
      {
        label: 'Newsletter CTA',
        name: 'newsletter_cta',
        component: 'text',
      },
    ],
  })

  usePlugin(form)

  return (
    <Layout>
      <NextSeo
        title={data.title}
        description={data.description}
        openGraph={{
          title: data.title,
          description: data.description,
        }}
      />
      <Hero>Pricing</Hero>
      <RichTextWrapper>
        <Section>
          <Wrapper>
            <div style={{ margin: '0 auto 4.5rem auto', maxWidth: '40rem' }}>
              <p
                style={{ fontSize: '1.5rem', color: 'var(--color-secondary)' }}
              >
                <strong>No surprises.</strong> Predictable pricing for every
                project. Complete control of your content, forever.
              </p>
              <p
                style={{ fontSize: '1.25rem', color: 'var(--color-secondary)' }}
              >
                Tina’s source code is open-source. Your content lives in
                accessible formats right in your Git repository.
              </p>
            </div>
            <PricingCard />
            <div style={{ padding: '4rem 0', display: 'flex' }}>
              <PricingCard
                name="Team"
                price="$99"
                cta="Contact Us"
                size="small"
                rounded="0.5rem 0 0 0.5rem"
              />
              <PricingCard
                name="Business"
                price="$949"
                cta="Contact Us"
                size="small"
                rounded="0"
              />
              <PricingCard
                name="Enterprises"
                price="Contact Us"
                cta="Contact Us"
                size="small"
                rounded="0 0.5rem 0.5rem 0"
              />
            </div>
          </Wrapper>
        </Section>
      </RichTextWrapper>
    </Layout>
  )
}

const PricingCard = ({
  size = 'large',
  name = 'Community',
  price = 'Free',
  cta = 'Get Started',
  rounded = '0.5rem',
}) => {
  return (
    <>
      <div
        style={{
          margin: '0 auto',
          maxWidth: '45rem',
          border: '1px solid var(--color-seafoam-300)',
          borderRadius: rounded,
          boxShadow:
            '0 6px 24px rgba(0, 37, 91, 0.05), 0 2px 4px rgba(0, 37, 91, 0.03)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--color-seafoam-100)',
            borderBottom: '1px solid var(--color-seafoam-300)',
            padding: size === 'large' ? '2rem 2.5rem' : '1.75rem 2.25rem',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-tuner)',
              color: 'var(--color-orange)',
              fontSize: size === 'large' ? '2rem' : '1.5rem',
              flex: '0 0 auto',
              paddingRight: '1rem',
              margin: '0',
            }}
          >
            {name}
          </h3>
          <hr />
          <h3
            style={{
              fontFamily: 'var(--font-tuner)',
              color: 'var(--color-secondary)',
              fontSize: size === 'large' ? '2rem' : '1.5rem',
              flex: '0 0 auto',
              paddingLeft: '1rem',
              margin: '0',
            }}
          >
            {price}
          </h3>
        </div>
        <div
          style={{
            padding: size === 'large' ? '2.5rem' : '2.25rem',
          }}
        >
          <ul style={{ margin: '0 0 1.5rem 0', padding: '0 0 0 1rem' }}>
            <li>
              <p
                style={{
                  fontSize: size === 'large' ? '1.25rem' : '1.125rem',
                  color: 'var(--color-secondary)',
                }}
              >
                Tina's <strong>Community</strong> plan offers{' '}
                <strong>3 free users</strong> per project
              </p>
            </li>
            <li>
              <p
                style={{
                  fontSize: size === 'large' ? '1.25rem' : '1.125rem',
                  color: 'var(--color-secondary)',
                }}
              >
                Each additional user being billed at <strong>$15/month</strong>
              </p>
            </li>
            <li>
              <p
                style={{
                  fontSize: size === 'large' ? '1.25rem' : '1.125rem',
                  color: 'var(--color-secondary)',
                }}
              >
                Maximum of 10 users/project
              </p>
            </li>
          </ul>
          <Actions
            items={[
              {
                variant: '',
                label: cta,
                icon: 'arrowRight',
                url: '/docs/setup-overview/',
              },
            ]}
          />
        </div>
      </div>
      <style jsx>{`
        hr {
          border-top: none;
          border-right: none;
          border-left: none;
          border-image: initial;
          border-bottom: 5px dotted var(--color-seafoam-dark);
          width: 100%;
          max-width: 100%;
          flex: 1 1 auto;
          display: block;
          height: 0px;
          margin: 0px;
        }
      `}</style>
    </>
  )
}

export default PricingPage

/*
 ** DATA FETCHING -----------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  const { default: metadata } = await import('../content/siteConfig.json')

  const previewProps = await getJsonPreviewProps(
    'content/pages/pricing.json',
    preview,
    previewData
  )
  return { props: { ...previewProps.props, metadata } }
}
