import React from 'react'
import { useCMS, useSubscribable } from 'tinacms'
import { Button } from '@tinacms/styles'
import { CreateContentMenu } from './CreateContent'
import styled from 'styled-components'

export const Toolbar = styled(({ ...styleProps }) => {
  const cms = useCMS()
  const status = cms.plugins.getType('toolbar:status')
  const git = cms.plugins.getType('toolbar:git')
  const actions = cms.plugins.getType('toolbar:form-actions')

  const forms = cms.forms
  const form = cms.forms.all().length ? cms.forms.all()[0] : null

  useSubscribable(forms)
  useSubscribable(status)
  useSubscribable(git)

  const hasToolbarStuff = git.all().length || status.all().length

  if (!hasToolbarStuff) {
    return null
  }
  return (
    <>
      <ToolbarPlaceholder />
      <div {...styleProps}>
        <Create>
          <CreateContentMenu />
        </Create>
        <Github>
          {git.all().length > 0 &&
            git.all().map((git: any) => <git.component key={git.name} />)}
        </Github>
        <Status>
          {status.all().length > 0 &&
            status
              .all()
              .map((status: any) => (
                <status.component key={status.name} {...status.props} />
              ))}
        </Status>
        <Actions>
          {form &&
            actions
              .all()
              .map((action: any) => <action.component key={action.name} />)}
        </Actions>
      </div>
    </>
  )
})`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 0.75rem;
  width: 100%;
  height: 62px;
  background-color: #f6f6f9;
  z-index: 10000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #edecf3;
  display: grid;
  grid-template-areas: 'create github status actions';
  grid-template-columns: auto 1fr auto auto;
  align-items: stretch;

  @media (max-width: 1029px) {
    label {
      display: none;
    }
  }
`

const Github = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  padding-right: 0.75rem;
  border-right: 1px solid white;
  box-shadow: inset -1px 0 0 #e1ddec;
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.01),
    transparent 3rem
  );

  > * {
    margin-bottom: 0;
    margin-left: 1rem;
  }

  > div {
    display: none;
  }

  label {
    margin-bottom: 0;
    white-space: nowrap;
  }

  @media (min-width: 1030px) {
    > div {
      display: block;
    }
  }
`

const Create = styled.div`
  grid-area: create;
  justify-self: start;
  display: flex;
  align-items: center;
`

const Status = styled.div`
  grid-area: status;
  justify-self: end;
  display: flex;
  align-items: center;

  > * {
    margin-bottom: 0;
    margin-left: 1rem;
  }

  label {
    margin-bottom: 0;
  }
`

const Actions = styled.div`
  grid-area: actions;
  justify-self: end;
  display: flex;
  align-items: center;

  ${Button} {
    margin-left: 0.75rem;
  }
`

const ToolbarPlaceholder = styled.div`
  position: relative;
  opacity: 0;
  display: block;
  width: 100%;
  height: 62px;
`
