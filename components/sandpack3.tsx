import React, { useState } from 'react'
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

const code = ({
  id,
  query,
  content,
  schema,
}) => `import TinaCMS, { TinaCMS as TCMS, Form, FormBuilder, LocalClient, TinaProvider, useGraphqlForms } from 'tinacms'
import React from 'react'
import './hidden'
import Page from './page'

${schema}
const content = \`${content}\`
const query = \`${query}\`

class MockClient extends LocalClient {
  async request(
    query: string,
    { variables }
  ) {
    return new Promise((resolve, reject) => {
    window.addEventListener('message', e => {
      if (e.data.type === 'custom') {
        console.log(e.data.message.data)
        resolve(e.data.message.data)
        // if(e.data.param === "${id}") {
        //   resolve(e.data.message.data)
        // }
      }
    })
    if (window) {
      window.parent.postMessage({type: 'custom', param: "runQuery", message: {query, content, schema}}, "*")
    }
    })
  }
}

const cms = new TCMS({
  enabled: true,
  sidebar: true,
})
cms.registerApi('tina', new MockClient())

const App = () => {
  return (
    <div style={{height: '100%', background: 'var(--tina-color-grey-1)'}}>
      <style>{\`
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
      <TinaProvider cms={cms}>
        <Page query={query} />
      </TinaProvider>
    </div>
  )
}

export default App
`

const request = async (schema, content, query) => {
  const res = await fetch(
    `/api/graphql?schema=${encodeURI(
      JSON.stringify(schema)
    )}&content=${encodeURI(content)}&query=${query}`
  )

  const json = await res.json()
  return json
}

const getIframe = ref => {
  if (ref?.clients) {
    if (Object.values(ref.clients)[0]) {
      console.log('meh', Object.values(ref.clients)[0].iframe)
      return Object.values(ref.clients)[0].iframe
    }
  }
}

export default function Page({ id, schema, query, content, Page }) {
  const ref = React.useRef()

  React.useLayoutEffect(() => {
    console.log(getIframe(ref.current))
  }, [ref.current])

  React.useEffect(() => {
    window.addEventListener('message', e => {
      if (e.data.type === 'custom') {
        if (e.data.param === 'runQuery') {
          request(
            e.data.message.schema,
            e.data.message.content,
            e.data.message.query
          )
            .then(res => {
              ref.current?.clients.contentWindow?.postMessage(
                { type: 'custom', param: id, message: res },
                '*'
              )
            })
            .catch(e => {
              console.log(e)
            })
        }
      }
    })
  }, [])

  return (
    <div id={id}>
      <SandpackProvider
        template="react"
        ref={ref}
        customSetup={{
          files: {
            '/App.js': {
              code: code({
                id,
                query: query,
                schema,
                content,
              }),
              hidden: true,
            },
            '/hidden.js': {
              code: hiddenCode,
              hidden: true,
            },
            '/.tina/schema.js': {
              code: schema,
              active: true,
            },
            '/posts/hello-world.md': {
              code: content,
            },
            '/query.gql': {
              code: query,
            },
            '/page.js': {
              code: Page,
            },
          },
          dependencies: {
            'styled-components': '^4.4.1',
            tinacms: 'beta',
          },
        }}
      >
        <SandpackLayout>
          {ref.current && (
            <Meh
              iframeRef={ref}
              id={id}
              schema={schema}
              query={query}
              content={content}
            />
          )}
          <SandpackCodeEditor
            showTabs={true}
            customStyle={{
              height: 450,
            }}
          />
          <SandpackPreview
            // ref={ref}
            // showNavigator={true}
            showRefreshButton={true}
            showOpenInCodeSandbox={false}
            customStyle={{
              height: 450,
            }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}

const Meh = ({ iframeRef, id, schema, query, content }) => {
  const { sandpack } = useSandpack()
  const { files, updateFile } = sandpack
  const [config, setConfig] = useState({ id, schema, query, content })
  const [pending, setPending] = React.useState(false)
  const [boundingRect, setBoundingRect] = React.useState(
    getIframe(iframeRef.current)
      .getBoundingClientRect()
      .toJSON()
  )

  React.useEffect(() => {
    setPending(true)
    setConfig(config => ({ ...config, schema: files['/.tina/schema.js'].code }))
  }, [files['/.tina/schema.js']?.code])

  React.useEffect(() => {
    setPending(true)
    setConfig(config => ({ ...config, query: files['/query.gql'].code }))
  }, [files['/query.gql']?.code])

  React.useEffect(() => {
    setPending(true)
    setConfig(config => ({
      ...config,
      content: files['/posts/hello-world.md'].code,
    }))
  }, [files['/posts/hello-world.md']?.code])

  React.useEffect(() => {
    if (!pending) {
      updateFile(`/App.js`, code(config))
    }
  }, [JSON.stringify(config), pending])

  // return null

  console.log(pending)
  return pending ? (
    <div
      style={{
        position: 'fixed',
        right: boundingRect.right,
        left: boundingRect.left,
        top: boundingRect.top,
        bottom: boundingRect.bottom,
        width: '100%',
        height: '100%',
        zIndex: 100,
        background: 'white',
      }}
    >
      <button onClick={() => setPending(false)} type="button">
        Reload
      </button>
    </div>
  ) : null
}
