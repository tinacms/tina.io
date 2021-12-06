import { buildASTSchema, print } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import { createDatabase, resolve, indexDB, MemoryStore } from '@tinacms/graphql'
import type { TinaCloudSchema} from '@tinacms/graphql'
class InMemoryStore extends MemoryStore {
  public supportsSeeding() {
    return true
  }
  public supportsIndexing() {
    return false
  }
}


export default async function feedback(req, res) {
  const database = await createDatabase({
    bridge: new InMemoryBridge(''),
    store: new InMemoryStore('')
  })
  await indexDB({ database, config })
  return graphqlHTTP({
    schema: buildASTSchema(await database.getGraphQLSchema()),
    customExecuteFn: async args => {
      const query = print(args.document)

      const result = await resolve({
        database,
        query,
        variables: args.variableValues,
      })
      return result
    },
    graphiql: true,
  })(req, res)
}

export class InMemoryBridge {
  public rootPath: string
  private mockFileSystem: { [filepath: string]: string } | undefined
  constructor(rootPath: string) {
    this.rootPath = rootPath
    this.mockFileSystem = mockFileSystem
  }
  public glob = async (pattern: string) => {
    return Object.keys(this.mockFileSystem).filter(key =>
      key.startsWith(pattern)
    )
  }
  public get = async (filepath: string) => {
    const mockData = await this.getMockData()
    const value = mockData[filepath]
    if (!value) {
      throw new Error(`Unable to find record for ${filepath}`)
    }
    return value
  }
  public put = async (filepath: string, data: string) => {
    const mockData = await this.getMockData()
    this.mockFileSystem = { ...mockData, [filepath]: data }
  }

  public getMockData = async () => {
    return this.mockFileSystem
  }
  public async putConfig(filepath: string, data: string) {
    await this.put(filepath, data)
  }
  public supportsBuilding() {
    return true
  }
}

const mockFileSystem = {
  'content/posts/voteForPedro.json': JSON.stringify({
    title: "Vote For Pedro",
    category: "politics",
    author:  "content/authors/napolean.json",
    body: `
## Hello, world!

This is some text

<Cta heading="Welcome"/>
`
  }),
  'content/authors/napolean.json': JSON.stringify({
    name: 'Napolean'
  }),
}

const config: TinaCloudSchema = {
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      format: "json",
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Category',
          name: 'category',
        },
        {
          type: 'reference',
          label: 'Author',
          name: 'author',
          collections: ['author'],
        },
        {
          type: 'rich-text',
          label: 'Body',
          name: 'body',
          isBody: true,
          templates: [
            {
              name: "Cta",
              label: "Call to Action",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading"
                },
              ]
            }
          ]
        },
      ],
    },
    {
      label: 'Authors',
      name: 'author',
      format: "json",
      path: 'content/authors',
      fields: [
        {
          type: 'string',
          label: 'Name',
          name: 'name',
        },
        {
          type: 'string',
          label: 'Avatar',
          name: 'avatar',
        },
      ],
    },
  ],
}

