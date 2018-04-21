import languages from './languages'
import toFile from './toFile'
import singleJSON from './singleJSON'

/**
 * @param {Object} config - object for https://poeditor.com/docs/api#projects_export.
 * @param {String} config.api_token - POEditor API token.
 * @param {Number} config.id - ID of project.
 * @param {String} config.path - path to location for file saving
 */
export default async function ({
  api_token = process.env.POEDITOR,
  id,
  path
}) {
  // Fetch langugages
  const langs = await languages({ api_token, id })

  // Fetch and save translations
  const strings = langs.map(async language => {
    const json = await singleJSON({
      api_token,
      id,
      language
    })
    await toFile(`${path}/${id}/${language}.json`, json)
    return
  })
}