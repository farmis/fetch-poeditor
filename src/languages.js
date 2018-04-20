import fetch from 'isomorphic-fetch'
import FormData from 'isomorphic-form-data'

/**
 * @param {Object} config - object for https://poeditor.com/docs/api#projects_export.
 * @param {String} config.api_token - POEditor API token.
 * @param {Number} config.id - ID of project.
 */
async function languages({
  api_token = process.env.POEDITOR_API_TOKEN,
  id,
}) {
  /**
   * Body sculpting! ^_^
   */
  const formData = new FormData()
  formData.append('api_token', api_token)
  formData.append('id', id)

  /**
   * 
   */
  const response = await fetch('https://api.poeditor.com/v2/languages/list', {
    method: 'POST',
    body: formData
  })
  const json = await response.json()
  if (json.response.status === 'success') {
    return json.result.languages.map(
      current => current.code
    )
  } else {
    throw new Error(json.response.message)
  }
}

export default languages