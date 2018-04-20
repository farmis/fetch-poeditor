import fs from 'fs-extra'

export default async function (path, json) {
  await fs.ensureFile(path)
  return fs.writeJson(path, json)
}