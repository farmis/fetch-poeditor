const {
  singleJSON,
  languages,
  projectToFiles
} = require('../dist/fetch-poeditor.cjs.js')

test('singleJSON', () => {
  expect.assertions(1)

  return singleJSON({
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
  })
    .then(data => {
      expect(data)
        .toContain('en')
    })
})

test('projectToFiles', () => {
  expect.assertions(1)

  return projectToFiles({
    path: './ddd'
  })
    .then(data => {
      expect(data)
        .toBeUndefined()
    })
})