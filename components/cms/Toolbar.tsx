import React from 'react'
import { useCMS, useSubscribable } from 'tinacms'

export const Toolbar = () => {
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
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        position: 'fixed',
        top: 0,
        padding: '1rem',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)',
      }}
    >
      <div>
        {tools.all().length > 0 &&
          tools.all().map((tool: any) => tool.component())}
      </div>
      <div>
        {status.all().length > 0 &&
          status.all().map((status: any) => status.component())}
      </div>
      <ul>
        {actions.all().length > 0 &&
          actions.all().map((action: any) => action.component())}
      </ul>
    </div>
  )
}
