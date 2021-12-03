// @ts-nocheck
import React from 'react'
import {
  Sandpack,
  SandpackProvider,
  useSandpack,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react'
import TinaCMS, { FormBuilder, Form, useGraphqlForms } from 'tinacms-beta'

const hiddenCode = `
import schema from '.tina/schema'

if (window) {
  window.parent.postMessage({type: 'custom', param: "schema", message: schema}, "*")
}
`

const _app = `import React from 'react'
import { useCMS, TextFieldPlugin } from 'tinacms'

const App = () => {

  const cms = useCMS()

  React.useEffect(() => {
    console.log(cms)
  },[])

  return <div>Hi</div>
}

export default App
`

const code = extra => `import TinaCMS, { Form, FormBuilder } from 'tinacms'
import Page from './_app'

// Ideally replace these with root file
import './hidden'
const pageProps = {query: ''}

const App = () => {

  const form = new Form({
    onSubmit: () => {},
    id: 'meh',
    label: 'Some Document',
    fields: ${extra}
  })

  return (
    <div style={{height: '100%', background: 'var(--tina-color-grey-1)'}}>
    <style>
    {\`
      button[aria-label="toggles cms sidebar"]  {
        display: none;
      }
      html {
        background: var(--tina-color-grey-1)
        box-sizing: border-box;
        height: 100%;
      }
      * {
        box-sizing: border-box;
      }
      #root {
        height: 100%;
      }
      body {
        height: 100%;
        margin: 0;
        box-sizing: inherit;
      }
      .form-body {
        height: 400px;
      }
    \`}
  </style>
    <TinaCMS
      isLocalClient={true}
    >
      {() => <><FormBuilder hideFooter={true} form={form} /><div hidden><Page /></div></>}
    </TinaCMS>
    </div>
  )
}

export default App
`

export default function Page({ schema, extra }) {
  const [config, setConfig] = React.useState({
    query: '',
    schema: '',
    content: '',
  })
  const [form, setForm] = React.useState([])
  const [pending, setPending] = React.useState(true)
  React.useEffect(() => {
    window.addEventListener('message', e => {
      if (e.data.type === 'custom') {
        if (e.data.param === 'schema') {
          setConfig(config => {
            return {
              ...config,
              schema: e.data.message,
            }
          })
        }
        if (e.data.param === 'content') {
          setConfig(config => {
            return {
              ...config,
              content: e.data.message,
            }
          })
        }
      }
    })
  }, [])

  const request = async (schema, content, query) => {
    const res = await fetch(
      `/api/graphql?schema=${encodeURI(
        JSON.stringify(schema)
      )}&content=${encodeURI(content)}&query=${query}`
    )

    const json = await res.json()
    return json
  }

  React.useEffect(() => {
    if (config.schema && config.schema.collections) {
      request(config.schema, '', '')
        .then(res => {
          setForm(res.data.getDocumentFields.someCollection.fields)
          setPending(false)
        })
        .catch(e => {
          console.log(e)
          setPending(true)
        })
    }
  }, [JSON.stringify(config)])

  return (
    <>
      <SandpackProvider
        template="react"
        customSetup={{
          files: {
            '/App.js': {
              code: code(`[]`),
              hidden: true, // hidden doesn't work for this file
            },
            '/hidden.js': {
              code: hiddenCode,
              hidden: true,
            },
            '/.tina/schema.js': {
              code: schema,
              active: true,
            },
            ...extra,
            // '/_app.js': {
            //   code: _app,
            // },
          },
          dependencies: {
            'styled-components': '^4.4.1',
            tinacms: 'beta',
          },
        }}
      >
        <SandpackLayout>
          <Meh appCode={form} pending={pending} />
          <SandpackCodeEditor
            showTabs={true}
            customStyle={{
              height: 450,
            }}
          />
          <SandpackPreview
            // showNavigator={true}
            showRefreshButton={true}
            viewportSize={100}
            showOpenInCodeSandbox={false}
            customStyle={{
              height: 450,
            }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </>
  )
}

const Meh = ({ appCode, pending }) => {
  const { sandpack } = useSandpack()
  const { files, updateFile } = sandpack

  React.useEffect(() => {
    if (!pending) {
      updateFile('/App.js', code(JSON.stringify(appCode)))
    }
  }, [JSON.stringify(appCode), pending])

  const content = files['/hello-world.md']
  if (content && typeof window !== 'undefined') {
    window.parent.postMessage(
      { type: 'custom', param: 'content', message: content.code },
      '*'
    )
  }
  return null
}
