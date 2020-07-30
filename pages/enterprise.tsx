import React from 'react'
import styled from 'styled-components'
import { BlockTemplate } from 'tinacms'
import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'

import { Layout, Wrapper, RichTextWrapper } from 'components/layout'
import { ArrowList } from 'components/ui'
import { TeamsForm } from 'components/forms'
import {
  InlineTextareaField,
  InlineBlocks,
  BlockTextarea,
  BlocksControls,
} from 'react-tinacms-inline'
import { InlineGithubForm } from 'components/layout/InlineGithubForm'
import { useGithubJsonForm } from 'react-tinacms-github'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'

const formOptions = {
  label: 'Teams',
  fields: [
    {
      label: 'Headline',
      name: 'headline',
      description: 'Enter the main headline here',
      component: 'textarea',
    },
    {
      label: 'Supporting Points',
      name: 'supporting_points',
      description: 'Edit the points here',
      component: 'group-list',
      itemProps: item => ({
        key: item.id,
        label: `${item.point.slice(0, 25)}...`,
      }),
      defaultItem: () => ({
        point: 'New Point',
        _template: 'point',
      }),
      fields: [
        {
          label: 'Point',
          name: 'point',
          component: 'textarea',
        },
      ],
    },
  ],
}

function TeamsPage(props) {
  // Adds Tina Form
  const [data, form] = useGithubJsonForm(props.file, formOptions)

  return (
    <InlineGithubForm form={form}>
      <TeamsLayout color={'secondary'}>
        <NextSeo
          title={data.title}
          description={data.description}
          openGraph={{
            title: data.title,
            description: data.description,
          }}
        />
        <TeamsSection>
          <Wrapper>
            <RichTextWrapper>
              <TeamsGrid>
                <TeamsContent>
                  <h2>
                    <InlineTextareaField name="headline" />
                  </h2>
                  <hr />
                  <ArrowList>
                    <InlineBlocks
                      name="supporting_points"
                      blocks={TEAMS_POINTS_BLOCKS}
                    />
                  </ArrowList>
                </TeamsContent>
                <TeamsFormWrapper>
                  <TeamsForm
                    hubspotFormID={process.env.HUBSPOT_TEAMS_FORM_ID}
                  />
                </TeamsFormWrapper>
              </TeamsGrid>
            </RichTextWrapper>
          </Wrapper>
        </TeamsSection>
      </TeamsLayout>
    </InlineGithubForm>
  )
}

export default TeamsPage

/*
 ** DATA FETCHING --------------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  return getJsonPreviewProps('content/pages/teams.json', preview, previewData)
}

/*
 ** TINA FORM CONFIG -------------------------------------------------
 */

/*
 ** BLOCKS CONFIG ------------------------------------------------------
 */

function SupportingPoint({ data, index }) {
  return (
    <BlocksControls index={index}>
      <li key={`supporting-point-${index}`}>
        <BlockTextarea name="point" />
      </li>
    </BlocksControls>
  )
}

const point_template: BlockTemplate = {
  label: 'Teams Point',
  defaultItem: { point: 'Something dope about TinaTeams 🤙' },
  fields: [],
}

const TEAMS_POINTS_BLOCKS = {
  point: {
    Component: SupportingPoint,
    template: point_template,
  },
}

/*
 ** STYLES --------------------------------------------------------------
 */

const TeamsLayout = styled(Layout)`
  min-height: 100%;
  background-color: var(--color-secondary-dark);
  color: white;
`

const TeamsSection = styled.section`
  flex: 1 0 auto;
  padding: 8rem 0 5rem 0;
  display: flex;
  flex-direction: column;

  ${Wrapper} {
    display: flex;
    flex: 1 0 auto;
  }
`

const TeamsGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  min-height: 100%;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    grid-gap: 4rem;
  }
`

const TeamsFormWrapper = styled.div`
  padding: 2rem;
  background-color: var(--color-secondary);
  border-radius: 3rem;

  @media (min-width: 800px) {
    padding: 2rem 5rem;
  }
`

const TeamsContent = styled.div`
  li {
    color: white;
    max-width: 30rem;
  }

  h2 {
    color: var(--color-seafoam-dark) !important;
  }

  hr {
    border-color: var(--color-seafoam-dark) !important;
  }
`
