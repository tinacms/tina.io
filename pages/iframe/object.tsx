import Sandpack from '../../components/sandpack'

const _app = `import React from 'react'
import { useCMS, GroupListFieldPlugin } from 'tinacms'

const App = () => {
  const cms = useCMS()

  React.useEffect(() => {
    console.log(cms)
    cms.fields.add({
      ...GroupListFieldPlugin,
      name: 'vendors',
      Component: (props) => {
        const field = {
          ...props.field,
          itemProps: (item) => {
            return {
              label: item.label,
              url: item.url,
              key: item.label,
            }
          },
        }
        return (
          <GroupListFieldPlugin.Component
            {...props}
            field={field}
          />
        )
      },
    })
  },[])

  return <div>Hi</div>
}

export default App
`

const schema = `const schema = {
  collections: [
    {
      label: 'Some Colltion',
      name: 'someCollection',
      format: 'json',
      path: 'some-path',
      fields: [
        {
          type: 'object',
          name: 'seo',
          label: 'SEO',
          fields: [{
            type: 'string',
            name: 'title',
            label: 'Title',
          }, {
            type: 'string',
            name: 'description',
            label: 'Description',
          }]
        }
      ],
    },
  ],
}

export default schema`

export default function Page() {
  return <Sandpack schema={schema} extra={{ '/_app.js': _app }} />
}
