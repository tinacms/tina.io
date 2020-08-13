import { MarkdownCreatorPlugin } from 'utils/plugins'
import { slugify, fileToUrl } from '../utils'
import moment from 'moment'

export const ReleaseNotesCreatorPlugin = new MarkdownCreatorPlugin({
  label: 'New Release Notes',
  filename: form => {
    const slug = slugify(form.title)
    return `content/docs/releases/${slug}.md`
  },
  fields: [
    {
      name: 'title',
      component: 'text',
      label: 'Title',
      placeholder: 'My New Post',
    },
    {
      label: 'Date',
      name: 'date',
      component: 'date',
      description: 'The default will be today',
    },
    {
      label: 'Author',
      name: 'author',
      component: 'text',
      validate(name) {
        if (!name) return "Please enter the author's name."
      },
    },
  ],
  frontmatter: postInfo => ({
    title: postInfo.title,
    date: moment(postInfo.date ? postInfo.date : new Date()).format(),
    author: postInfo.author ? postInfo.author : `Jane Doe`,
  }),
  body: () => DEFAULT_RELEASE_NOTES_BODY,
  afterCreate: response => {
    let url = fileToUrl(response.content.path.split('content')[1], 'docs/releases')

    window.location.href = `/docs/releases/${url}`
  },
})
const DEFAULT_RELEASE_NOTES_BODY = `

* What is the core team's current objectives?
* What was accomplished in the last week?
* What's next for the core team?
* Link to any relevant projects

## Changes

### New Packages

### Features

### Bug Fixes

### Deprecations

## Contributors

Thanks to everyone for contributing!

| # Commits | Name |
| --- | --- |
| | |
| | |
| | |
| | |

## GitHub Milestones

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/1?closed=1) for all the details on this weeks release!
`
