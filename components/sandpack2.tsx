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

const code = (
  extra,
  again
) => `import TinaCMS, { Form, FormBuilder } from 'tinacms'
import Page from './_app'

// Ideally replace these with root file
import './hidden'
const pageProps = {query: ''}

const App = () => {

  // const form = new Form({
  //   onSubmit: () => {},
  //   id: 'meh',
  //   label: 'Some Document',
  //   fields: ${extra}
  // })

  return (
    <div style={{height: '100%', background: 'var(--tina-color-grey-1)'}}>
    <style>
    {\`
      // button[aria-label="toggles cms sidebar"]  {
      //   display: none;
      // }
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
      data={${extra.data ? JSON.stringify(extra.data) : '{}'}}
      query={\`${extra.query ? extra.query : ''}\`}
      // variables={${JSON.stringify(extra.variables)}}
    >
      {() => <><Page /></>}
    </TinaCMS>
    </div>
  )
}

export default App
`

export default function Page({ schema, extra }) {
  const [errors, setErrors] = React.useState('')
  const [data, setData] = React.useState()
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
    if (config.schema && config.schema.collections && config.query) {
      console.log(config)
      request(config.schema, config.content, config.query)
        .then(res => {
          console.log(res)
          setData(res.data)
          // setForm(res.data.getDocumentFields.someCollection.fields)
          setPending(false)
        })
        .catch(e => {
          console.log(e)
          setErrors(e.errors?.join('\n'))
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
              code: code(`[]`, {}),
              // hidden: true, // hidden doesn't work for this file
            },
            '/hidden.js': {
              code: hiddenCode,
              hidden: true,
            },
            '/.tina/schema.js': {
              code: schema,
              active: true,
            },
            '/query.gql': {
              code: `query GetPost {
  getPostDocument(relativePath: "hello-world.md") {
    data {
      title
    }
  }
}`,
            },
            '/posts/hello-world.md': {
              code: `---
title: Hello, World!
---`,
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
          <Meh
            appCode={form}
            data={data}
            pending={pending}
            config={config}
            onQueryChange={query => {
              setConfig(config => ({ ...config, query }))
            }}
            onContentChange={content => {
              setConfig(config => ({ ...config, content }))
            }}
          />
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

const Meh = ({
  appCode,
  data,
  pending,
  config,
  onQueryChange,
  onContentChange,
}) => {
  const { sandpack } = useSandpack()
  const { files, updateFile } = sandpack

  React.useEffect(() => {
    // console.log(files['/query.gql'].code)
    onQueryChange(files['/query.gql'].code)
  }, [files['/query.gql']?.code])

  React.useEffect(() => {
    // console.log(files['/posts/hello-world.md'].code)
    onContentChange(files['/posts/hello-world.md'].code)
  }, [files['/posts/hello-world.md']?.code])

  React.useEffect(() => {
    if (!pending) {
      updateFile(
        '/App.js',
        code(JSON.stringify(appCode), { data, query: config.query })
      )
    }
  }, [JSON.stringify(appCode), pending, JSON.stringify(data), config.query])

  const content = files['/hello-world.md']
  if (content && typeof window !== 'undefined') {
    window.parent.postMessage(
      { type: 'custom', param: 'content', message: content.code },
      '*'
    )
  }
  return null
}
