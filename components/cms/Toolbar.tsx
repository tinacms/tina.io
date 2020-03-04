import React from 'react'
import { useCMS, useSubscribable, FieldMeta } from 'tinacms'
import { Button } from '@tinacms/styles'
import { CreateContentMenu } from './CreateContent'
import styled from 'styled-components'

export const Toolbar = styled(({ ...styleProps }) => {
  const cms = useCMS()
  const tools = cms.plugins.findOrCreateMap('toolbar:tool')
  const status = cms.plugins.findOrCreateMap('toolbar:status')
  const actions = cms.plugins.findOrCreateMap('toolbar:form-actions')

  useSubscribable(tools)
  useSubscribable(status)
  useSubscribable(actions)

  const hasToolbarStuff =
    tools.all().length + status.all().length + actions.all().length > 0
  if (!hasToolbarStuff) {
    return null
  }
  return (
    <>
      <ToolbarPlaceholder />
      <div {...styleProps}>
        <CreateContentMenu />
        <Github>
          {status.all().length > 0 &&
            status.all().map((status: any) => status.component())}
          {tools.all().length > 0 &&
            tools.all().map((tool: any) => tool.component())}
        </Github>
        <Actions>
          {actions.all().length > 0 &&
            actions.all().map((action: any) => action.component())}
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
  display: grid;
  grid-template-areas: 'create github actions';
  align-items: center;
`

const Github = styled.div`
  display: flex;

  > * {
    margin-bottom: 0;
  }

  label {
    margin-bottom: 0;
  }
`

const Actions = styled.div`
  grid-area: actions;
  justify-self: end;
  display: flex;

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
