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

const hiddenCode = `
import schema from '.tina/schema'


if (window) {
  window.parent.postMessage({type: 'custom', param: "schema", message: schema}, "*")
}

// console.log(schema)
`

const code = `import TinaCMS from 'tinacms'
import Page from './page'

// Ideally replace these with root file
import './hidden'
const Component = Page
const pageProps = {query: ''}

const App = () => {
  return (
    <TinaCMS
      isLocalClient={true}
      query={\`
      query GetPostDocument($relativePath: String!) {
        getPostDocument(relativePath: $relativePath) {
          data {
            title
            body
          }
        }
      }
    \`}
      variables={{
        relativePath: "hello-world.md"
      }}
      cmsCallback={cms => {
        cms.enable()
        cms.sidebar.isOpen = true
        cms.sidebar.position = 'displace'
      }}
      {...pageProps}
    >
      {(livePageProps) => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
`

const code3 = `import React from 'react'
import TinaCMS from 'tinacms'
import './hidden'
import Page from './page'

export default function App() {
  React.useEffect(() => {
    // console.log(schema)
    if (window) {
      window.parent.postMessage({type: 'custom', message: 'Get it'}, "*")
    }
  }, [])

  return(<TinaCMS
    branch="main"
    isLocalClient={true}
    cmsCallback={cms => {
      cms.enable()
      cms.sidebar.isOpen = true
      cms.sidebar.position = 'displace'
    }}
    query={\`{\ngetDocumentFields\n}\`}
  >
    {() => <Page />}
  </TinaCMS>)
}`

export default function Page() {
  const [config, setConfig] = React.useState({
    query: '',
    schema: '',
    content: '',
  })
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

  React.useEffect(() => {
    console.log(config)
  }, [JSON.stringify(config)])

  return (
    <>
      <SandpackProvider
        template="react"
        customSetup={{
          files: {
            '/App.js': code,
            '/hello-world.md': `---
title: Hello, World
---`,
            '/hidden.js': {
              hidden: true,
              code: hiddenCode,
            },
            '/page.js': `import { getStaticPropsForTina, useGraphqlForms } from 'tinacms'

const query = \`
query GetPostDocument($relativePath: String!) {
  getPostDocument(relativePath: $relativePath) {
    data {
      title
      body
    }
  }
}
\`

export default function Page() {
  // const [data, isLoading] = useGraphqlForms({query: gql => gql(query), variables: {}})
  // if(isLoading) {
  //   return <div>Loading...</div>
  // }
  return <div>Inner page</div>
}

import { staticRequest } from 'tinacms'

const getStaticProps = async () => {
  const query = \`
      query GetPostDocument($relativePath: String!) {
        getPostDocument(relativePath: $relativePath) {
          data {
            title
            body
          }
        }
      }
    \`
  const variables = {
    relativePath: 'hello-world.md',
  }

  let data = {}
  try {
    data = await staticRequest({
      query,
      variables,
    })
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      query,
      variables,
      data,
      //myOtherProp: 'some-other-data',
    },
  }
}
            `,
            '/.tina/schema.js': `const schema = ${JSON.stringify(
              schema,
              null,
              2
            )}\nexport default schema`,
          },
          dependencies: {
            'styled-components': '^4.4.1',
            tinacms: 'beta',
          },
        }}
      >
        <SandpackLayout>
          <Meh />
          <SandpackCodeEditor
            customStyle={{
              height: 500,
            }}
          />
          <SandpackPreview
            // showNavigator={true}
            showRefreshButton={true}
            showOpenInCodeSandbox={false}
            customStyle={{
              height: 500,
            }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </>
  )
}

const Meh = () => {
  const { sandpack } = useSandpack()
  const { files } = sandpack
  const content = files['/hello-world.md']
  if (content && typeof window !== 'undefined') {
    window.parent.postMessage(
      { type: 'custom', param: 'content', message: content.code },
      '*'
    )
  }
  return null
}

const schema = {
  collections: [
    {
      label: 'Some Collection',
      name: 'someCollection',
      format: 'json',
      path: 'some-path',
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
        },
      ],
    },
  ],
}
