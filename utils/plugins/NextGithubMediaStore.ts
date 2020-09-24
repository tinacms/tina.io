import path from 'path'
import { GithubMediaStore } from 'react-tinacms-github'

export class NextGithubMediaStore extends GithubMediaStore {
  previewSrc(fieldValue) {
    return super.previewSrc(path.join('public', fieldValue))
  }

  list(options) {
    return super
      .list({
        ...options,
        directory: path.join('public', options.directory || ''),
      })
      .then(list => {
        return {
          ...list,
          items: normalizeMediaItems(list.items),
        }
      })
  }

  persist(files) {
    return super
      .persist(
        files.map(file => {
          return {
            ...file,
            directory: path.join('public', file.directory),
          }
        })
      )
      .then(normalizeMediaItems)
  }

  delete(media) {
    return super.delete({
      ...media,
      directory: path.join('public', media.directory),
    })
  }
}

function normalizeMediaItems(items) {
  return items.map(item => {
    return {
      ...item,
      directory: item.directory.replace('public', ''),
      id: item.id.replace('public', ''),
    }
  })
}
