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

const query = `{
  getDocumentFields
}`

export default async function feedback(req, res) {
  if(!req.query.schema) {
    res.status(200).json({ name: 'John Doe' })
  } else {
    try {
      console.log(req.query)
      const schema = JSON.parse(req.query.schema)
      const database = await createDatabase({
        bridge: new InMemoryBridge('', req.query.content),
        store: new InMemoryStore('')
      })
      await indexDB({ database, config: schema })
      const result = await resolve({
        database,
        query: req.query.query,
        // query,
        variables: {}
      })
      console.log(result)
      res.status(200).json(result)
    } catch(e) {
      console.log(e)
      res.status(200).json({ name: 'John Doe' })

    }
  }
}

export class InMemoryBridge {
  public rootPath: string
  private mockFileSystem: { [filepath: string]: string } | undefined
  private content: string
  constructor(rootPath: string, content: string) {
    this.rootPath = rootPath
    this.mockFileSystem = mockFileSystem(content)
    this.content= content
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

const mockFileSystem = (content: string) => ( {
  'posts/hello-world.md': content,
})

