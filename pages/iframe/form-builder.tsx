// @ts-nocheck
import TinaCMS, { FormBuilder, Form, useGraphqlForms } from 'tinacms-beta'
import React from 'react'
import { useRouter } from 'next/router'

const query = `{
  getDocumentFields
}`
const queryString = `{
  getDocumentFields
}`

const Inner = (query?: string, children) => {
  console.log(query)
  const [data, isLoading] = useGraphqlForms({
    query: gql => gql(query.query),
    variables: {},
  })

  if (isLoading) {
    return <div />
  }

  return <pre>{JSON.stringify(data)}</pre>
}

const request = async (schema, content, query) => {
  const res = await fetch(
    `/api/graphql?schema=${encodeURI(schema)}&content=${encodeURI(
      content
    )}&query=${query}`
  )

  // if (res.status !== 200) {
  //   throw new Error(`Unable to complete request, ${res.statusText}`)
  // }

  const json = await res.json()
  return json
}

export default function Page() {
  const router = useRouter()
  // console.log(router.query)
  const [res, setRes] = React.useState(null)
  React.useEffect(() => {
    console.log('rerun')
    const meh = async () => {
      const res = await request(
        router.query.schema,
        router.query.content,
        router.query.query
      )
      setRes(res)
    }

    meh()
  }, [router.query.schema])

  if (!res || !res.data) {
    return <div>Loading...</div>
  }

  const form = new Form({
    onSubmit: () => {},
    id: 'meh',
    label: 'Some Document',
    fields: res.data.getDocumentFields.someCollection.fields,
  })
  return (
    <>
      <style>
        {`
          button[aria-label="toggles cms sidebar"]  {
            display: none;
          }
          html {
            background: var(--tina-color-grey-1)
          }
          body {
            height: 100%;
          }
          .form-body {
            height: 400px;
          }
        `}
      </style>
      <TinaCMS>
        {() => (
          <>
            <Inner query={router.query.query} />
            <FormBuilder hideFooter={true} form={form} />
            {/* <div style={{ height: '200px' }} /> */}
          </>
        )}
      </TinaCMS>
    </>
  )
}
