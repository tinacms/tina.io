import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { inlineJsonForm } from 'next-tinacms-json'

import Layout from '../components/layout/Layout'
import { colors, space, breakpoints } from '../components/styles/variables'
import { TeamsForm } from '../components/forms'

/**
 * TODOS:
 * Right now the bullet points are the same
 * color as the background so they're invisbile
 */

function TeamsPage(props) {
  const data = props.jsonFile
  return (
    <Layout page="teams">
      <Helmet>
        <meta property="og:title" content="TinaCMS - Teams" />
        <meta name="twitter:title" content="TinaCMS - Teams" />
      </Helmet>
      <BgColor />
      <Wrapper>
        <StyledInfoSection>
          <h2>{data.headline}</h2>
          <span id="dotted-line" />
          <StyledPoints>
            {data.supporting_points.map(item => (
              <li key={item.point.trim()}>
                <p>{item.point}</p>
              </li>
            ))}
          </StyledPoints>
        </StyledInfoSection>
        <StyledFormSection>
          <TeamsForm hubspotFormID={process.env.GATSBY_HUBSPOT_FORM_ID} />
        </StyledFormSection>
      </Wrapper>
    </Layout>
  )
}

const TeamsPageOptions = {
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

const EditableTeamsPage = inlineJsonForm(TeamsPage, TeamsPageOptions)

export default EditableTeamsPage

EditableTeamsPage.getInitialProps = async function() {
  const teamsData = await import('../content/pages/teams.json')
  return {
    jsonFile: {
      fileRelativePath: `content/pages/teams.json`,
      data: teamsData,
    },
  }
}

/*
 ** STYLES ----------------------------------------------------
 */

const BgColor = styled('aside')`
  background-color: ${colors.darkPurple};
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
`

const Wrapper = styled('div')`
  @media (min-width: ${breakpoints.lg}px) {
    max-width: 1150px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
`

const StyledInfoSection = styled('section')`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 38px ${space.smallMobile}px 20px ${space.smallMobile}px;
  span#dotted-line {
    display: block;
    width: 60px;
    height: 1px;
    border-bottom: 3px dotted ${colors.mintChocoChip};
    margin: 20px 0 32px 1px;
  }
  h2.coming-soon {
    display: none;
  }
  @media (min-width: ${breakpoints.lg}px) {
    padding: ${space.lrgDesktop}px ${space.smallDesktop}px 0
      ${space.smallDesktop}px;
    max-width: 560px;
    margin: 0 ${space.lrgDesktop}px 100px 0;
    h2.coming-soon {
      display: block;
    }
    ul {
      max-width: 500px;
    }
  }
`

const StyledPoints = styled('ul')`
  margin: 0;
  list-style: none;
  padding-left: 0;
  color: ${colors.white};
  li {
    position: relative;
    margin-bottom: ${space.smallMobile}px;
    padding-left: 2.5em;
    &:before {
      content: '↳';
      position: absolute;
      font-weight: bold;
      left: 2px;
      top: 0;
      font-size: 1.8em;
      line-height: 1.1;
      color: ${colors.hunterOrange};
    }
  }
  li:last-child {
    margin-bottom: ${space.smallDesktop}px;
  }
`

const StyledFormSection = styled('section')`
  background-color: ${colors.lightPurple};
  padding: 38px ${space.smallMobile}px;
  width: 100%;
  h5 {
    font-size: 18px;
    text-transform: uppercase;
    margin: 0 auto;
    width: max-content;
  }
  @media (min-width: ${breakpoints.lg}px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 72px 32px 100px 0;
    padding: unset;
    border-radius: 60px;
  }
`
