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
  path = 'Strings',
  type,
  langs = ['en'],
  isApple = false
}) {
  // Fetch and save translations
  await langs.forEach(async language => {
    const json = await singleJSON({
      api_token,
      id,
      language,
      type
    })
    let fileuri = ''
    switch (type) {
      case 'apple_strings':
        fileuri = `${path}/${id}/${language}.lproj/Localizable.strings`
        break
      default:
        fileuri = `${path}/${id}/${language}.json`
    }
    await toFile(fileuri, json)
    console.log('Created => ' + fileuri)

  })
  return `Doing! Not gonna tel you when done...`
}