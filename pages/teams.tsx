import React from 'react'
import styled from 'styled-components'
import { useLocalJsonForm } from 'next-tinacms-json'
import { InlineForm, InlineBlocks, BlocksControls } from 'react-tinacms-inline'
import { BlockTemplate } from 'tinacms'
import { NextSeo } from 'next-seo'

import { Layout, Wrapper, RichTextWrapper } from '../components/layout'
import { ArrowList } from '../components/ui'
import { TeamsForm } from '../components/forms'
import {
  EditToggle,
  DiscardButton,
  InlineTextareaField,
  BlockTextArea,
  InlineControls,
} from '../components/ui/inline'

export default function TeamsPage(props) {
  // Adds Tina Form
  const [data, form] = useLocalJsonForm(props.jsonFile, formOptions)

  return (
    <InlineForm form={form}>
      <TeamsLayout page="teams" color={'secondary'}>
        <NextSeo
          title={data.title}
          description={data.description}
          openGraph={{
            title: data.title,
            description: data.description,
          }}
        />
        <TeamsSection>
          {/*
           *** Inline controls shouldn't render
           *** until we're ready for Inline release
           */}
          {/*
            <InlineControls>
            <EditToggle />
            <DiscardButton />
            </InlineControls>
          */}
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
    </InlineForm>
  )
}

/*
 ** DATA FETCHING --------------------------------------------------
 */

export async function unstable_getStaticProps() {
  const teamsData = await import('../content/pages/teams.json')
  return {
    props: {
      jsonFile: {
        fileRelativePath: `content/pages/teams.json`,
        data: teamsData.default,
      },
    },
  }
}

/*
 ** TINA FORM CONFIG -------------------------------------------------
 */

const formOptions = {
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

/*
 ** BLOCKS CONFIG ------------------------------------------------------
 */

function SupportingPoint({ data, index }) {
  return (
    <BlocksControls index={index}>
      <li key={data.point.slice(0, 8)}>
        <BlockTextArea name="point" />
      </li>
    </BlocksControls>
  )
}

const point_template: BlockTemplate = {
  type: 'point',
  label: 'Teams Point',
  defaultItem: { point: 'Something dope about TinaTeams 🤙' },
  key: undefined,
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
