import fs from 'fs-extra'

export default async function (path, json) {
  if (path && json) {
    await fs.ensureFile(path)

    if (json.constructor === Object) {
      return fs.outputJson(path, json)
    } else {
      return fs.outputFile(path, json)
    }
  }
}