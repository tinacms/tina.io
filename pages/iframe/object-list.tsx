import Sandpack from '../../components/sandpack'

const _app = `import React from 'react'
import { useCMS, GroupListFieldPlugin } from 'tinacms'

const App = () => {
  const cms = useCMS()

  React.useMemo(() => cms.fields.add({
    ...GroupListFieldPlugin,
    name: 'customObjectList',
    Component: (props) => {
      const field = {
        ...props.field,
        itemProps: (item) => {
          return {
            label: item.platform,
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
  }), [cms])

  return <div>Hi</div>
}

export default App

`

const schema = `const schema = {
  collections: [
    {
      label: 'Author',
      name: 'someCollection',
      path: 'authors',
      fields: [
        {
          type: 'object',
          name: 'socialMedia',
          label: 'Social Media',
          list: true,
          // ui: {
          //   component: "customObjectList"
          // },
          fields: [
            {
              type: 'string',
              name: 'platform',
              label: 'Platform',
              options: ['Twitter', 'Instagram']
            },
            {
              type: 'string',
              name: 'handle',
              label: 'Title',
            },
          ]
        }
      ],
    },
  ],
}

export default schema`

export default function Page() {
  return <Sandpack schema={schema} extra={{ '/_app.js': _app }} />
}
