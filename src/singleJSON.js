import fetch from 'isomorphic-fetch'
import FormData from 'isomorphic-form-data'

/**
 * @param {Object} config - object for https://poeditor.com/docs/api#projects_export.
 * @param {String} config.api_token - POEditor API token.
 * @param {Number} config.id - ID of project.
 * @param {String} config.language - The code of language.
 * @param {('po'|'pot'|'mo'|'xls'|'csv'|'resw'|'resx'|'android_strings'|'apple_strings'|'xliff'|'properties'|'key_value_json'|'json'|'xmb'|'xtb')} config.type - File format.
 * @param {(String[]|'translated'|'untranslated'|'fuzzy'|'not_fuzzy'|'automatic'|'not_automatic'|'proofread'|'not_proofread')} [config.filters] - Filter results  (only available when Proofreading is set to "Yes" in Project Settings).
 * @param {(String|String[])} [config.tags] - Filter results by tags.
 */
async function singleJSON({
  api_token = process.env.POEDITOR,
  id,
  language = 'en',
  type = 'key_value_json',
  filters = ['translated', 'proofread'],
  tags
}) {
  /**
   * TODO check args
   */

  /**
   * Body sculpting! ^_^
   */
  const formData = new FormData()
  formData.append('api_token', api_token)
  formData.append('id', id)
  formData.append('language', language)
  formData.append('type', type)
  if (filters) {
    switch (filters.constructor.name) {
      case 'Array':
        filters.forEach(filter =>
          formData.append('filters[]', filter)
        )
        break;
      case 'String': formData.append('filters', filters)
    }
  }
  if (tags) {
    switch (tags.constructor.name) {
      case 'Array':
        tags.forEach(tag =>
          formData.append('tags[]', tag)
        )
        break;
      case 'String': formData.append('tags', tags)
    }
  }

  /**
   * Let's ask for URL to our lovely data :3
   *  Why don't they simply return data? idk
   */
  const response = await fetch('https://api.poeditor.com/v2/projects/export', {
    method: 'POST',
    body: formData
  })
  const json = await response.json()
  const { url } = json.result
  if (!url) throw new Error(`We didn't get URL from PO :S`)

  /**
   * Fetch Strings ❤️
   */
  const res = await fetch(url)
  const strings = await res.json()
  return strings
}

export default singleJSON