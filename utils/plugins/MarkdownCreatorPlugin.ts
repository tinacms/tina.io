import { toMarkdownString } from 'next-tinacms-markdown'
import { CMS, Field, AddContentPlugin } from 'tinacms'
import { saveContent } from '../../open-authoring/github/api'
import { getCachedFormData, setCachedFormData } from '../formCache'
import { GithubOptions } from '../github/useGithubForm'
import { FORM_ERROR } from 'final-form'

type MaybePromise<T> = Promise<T> | T

interface AnyField extends Field {
  [key: string]: any
}

interface CreateMarkdownButtonOptions<FormShape, FrontmatterShape> {
  label: string
  fields: AnyField[]
  filename(form: FormShape): MaybePromise<string>
  frontmatter?(form: FormShape): MaybePromise<FrontmatterShape>
  body?(form: FormShape): MaybePromise<string>
  githubOptions: GithubOptions
  isEditMode: boolean
  afterCreate?(response: any): void
}

const MISSING_FILENAME_MESSAGE =
  'createMarkdownButton must be given `filename(form): string`'
const MISSING_FIELDS_MESSAGE =
  'createMarkdownButton must be given `fields: Field[]` with at least 1 item'

/**
 *
 * @deprecated in favour of calling `CreateMarkdownPlugin` class directly.
 */
export function createMarkdownButton<FormShape = any, FrontmatterShape = any>(
  options: CreateMarkdownButtonOptions<FormShape, FrontmatterShape>
): AddContentPlugin<FormShape> {
  return new MarkdownCreatorPlugin<FormShape, FrontmatterShape>(options)
}

export class MarkdownCreatorPlugin<FormShape = any, FrontmatterShape = any>
  implements AddContentPlugin<FormShape> {
  __type: 'content-creator' = 'content-creator'
  name: AddContentPlugin<FormShape>['name']
  fields: AddContentPlugin<FormShape>['fields']

  afterCreate: (response: any) => void

  // Markdown Specific
  filename: (form: FormShape) => MaybePromise<string>
  frontmatter: (form: FormShape) => MaybePromise<FrontmatterShape>
  body: (form: any) => MaybePromise<string>

  githubOptions: GithubOptions
  isEditMode: boolean

  constructor(
    options: CreateMarkdownButtonOptions<FormShape, FrontmatterShape>
  ) {
    if (!options.filename) {
      console.error(MISSING_FILENAME_MESSAGE)
      throw new Error(MISSING_FILENAME_MESSAGE)
    }

    if (!options.fields || options.fields.length === 0) {
      console.error(MISSING_FIELDS_MESSAGE)
      throw new Error(MISSING_FIELDS_MESSAGE)
    }

    this.name = options.label
    this.fields = options.fields
    this.filename = options.filename
    this.frontmatter = options.frontmatter || (() => ({} as FrontmatterShape))
    this.body = options.body || (() => '')
    this.githubOptions = options.githubOptions
    this.afterCreate = options.afterCreate || null
  }

  async onSubmit(form: FormShape, cms: CMS) {
    const fileRelativePath = await this.filename(form)
    const frontmatter = await this.frontmatter(form)
    const markdownBody = await this.body(form)

    saveContent(
      this.githubOptions.forkFullName,
      this.githubOptions.branch,
      fileRelativePath,
      this.githubOptions.accessToken,
      getCachedFormData(fileRelativePath).sha,
      toMarkdownString({
        fileRelativePath,
        frontmatter,
        markdownBody,
      }),
      'Update from TinaCMS'
    ).then(response => {
      setCachedFormData(fileRelativePath, {
        sha: response.data.content.sha,
      })
      if (this.afterCreate) {
        this.afterCreate(response)
      }
    }).catch(e => {
      if (e.response.status == 404) {
        return { [FORM_ERROR]: 'A special error message' }
      }   
    })
  }
}
