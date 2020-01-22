const {
  singleJSON,
  languages,
  projectToFiles
} = require('../dist/fetch-poeditor.cjs.js')
console.error(process.env.POEDITOR)
const api_token = process.env.POEDITOR
const id = '108369'

test('singleJSON', () => {
  expect.assertions(1)

  return singleJSON({
    api_token,
    id,
    language: 'lt',
    // type: 'key_value_json',
    // filters: ['translated', 'proofread'],
    // tags
  })
    .then(data => {
      expect(data)
        .toHaveProperty('Cherries', 'Vyšnios')
    })
})

test('languages', () => {
  expect.assertions(1)

  return languages({
    api_token,
    id
  })
    .then(data => {
      expect(data)
        .toContain('en')
    })
})

test('projectToFiles', () => {
  expect.assertions(1)

  return projectToFiles({
    api_token,
    id,
    path: './ddd'
  })
    .then(data => {
      expect(data)
        .toBeUndefined()
    })
})