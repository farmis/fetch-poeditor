import fetch from 'isomorphic-fetch'
import FormData from 'isomorphic-form-data'

/**
 * @param {Object} config - object for https://poeditor.com/docs/api#projects_export.
 * @param {String} config.api_token - POEditor API token.
 * @param {Number} config.id - ID of project.
 */
async function languages({
  api_token = process.env.POEDITOR,
  id,
  percentage = 0
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
    const res = json.result.languages
      .filter(current => current.percentage > percentage)
      .map(current => current.code)
      
    console.log(`Languages with more than ${percentage}% translation: ${res.join(', ')}`)
    return res
  } else {
    throw new Error(json.response.message)
  }
}

export default languages