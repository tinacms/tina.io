import glob from 'glob'

export const getLocalFiles = function(match): Promise<any[]> {
  return new Promise((resolve, reject) => {
    glob(match, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}
