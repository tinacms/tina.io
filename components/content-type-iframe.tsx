import React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

const print = (code: string) => {
  const string = `${code}

defineSchema({
  collections: [{
    label: 'Some Collection',
    name: 'someCollection',
    format: 'json',
    path: 'some-path',
    fields: [
      field
    ],
  }]
})
  `

  return string
}

const defineSchema = obj => {
  return obj
}

export function ContentTypeIframe({
  code,
  code2 = '',
  code3 = '',
}: {
  code: string
  code2?: string
  code3?: string
}) {
  const [value, setValue] = React.useState(JSON.stringify(eval(code), null, 2))
  const [play, setPlay] = React.useState(false)
  const [content, setContent] = React.useState(code2)
  const [query, setQuery] = React.useState(code3)
  const [schema, setSchema] = React.useState(
    JSON.stringify(eval(code), null, 2)
  )

  // console.log(
  //   `/iframe/form-builder?schema=${encodeURI(schema)}&content=${encodeURI(
  //     code2
  //   )}`
  // )

  React.useEffect(() => {
    if (play) {
      setSchema(value)
      setPlay(false)
    }
  }, [play])

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          background: '#2e303a',
          fontFamily: 'monospace',
          width: '50%',
          fontSize: '16px',
          height: '100vh',
        }}
      >
        <LiveProvider scope={defineSchema} code={code}>
          <LiveEditor
            onChange={v => {
              try {
                const schema = eval(print(v))
                setValue(JSON.stringify(schema))
              } catch (e) {}
            }}
          />
        </LiveProvider>
        <LiveProvider scope={defineSchema} code={code2}>
          <LiveEditor
            onChange={v => {
              setContent(v)
            }}
          />
        </LiveProvider>
        <LiveProvider scope={defineSchema} code={code3}>
          <LiveEditor
            onChange={v => {
              setQuery(v)
            }}
          />
        </LiveProvider>
        <div style={{ position: 'fixed', bottom: '16px', left: '12px' }}>
          <button type="button" onClick={() => setPlay(true)}>
            Refresh
          </button>
        </div>
      </div>
      <iframe
        style={{ height: '100vh', width: '50%' }}
        src={`/iframe/form-builder?schema=${encodeURI(
          schema
        )}&content=${encodeURI(code2)}&query=${encodeURI(query)}`}
      />
    </div>
  )
}
