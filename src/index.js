#!/usr/bin/env node
import singleJSON from './singleJSON'
import languages from './languages'
import toFile from './toFile'
import projectToFiles from './projectToFiles'

export {
  singleJSON,
  languages,
  toFile,
  projectToFiles
}

const argv = require('minimist')(process.argv.slice(2))
const {
  _,
  p, project, Project, PROJECT, P, Projects, projects, PROJECTS,
  t, token, TOKEN, Token,
  percentage, PERCENTAGE, Percentage, per,
  apple, APPLE, Apple
} = argv

const path = _ || process.env.FETCH_POEDITOR_PATH
const id = p || project || Project || PROJECT || P || Projects || projects || PROJECTS || process.env.FETCH_POEDITOR_PROJECT
const api_token = t || token || TOKEN || Token || process.env.FETCH_POEDITOR_TOKEN
const isPercentage = percentage || PERCENTAGE || Percentage || per || process.env.FETCH_POEDITOR_PERCENTAGE
const isApple = apple || APPLE || Apple || process.env.FETCH_POEDITOR_APPLE

if (!api_token) {
  throw Error('Give me token! -t')
}

if (!id) {
  throw Error('Give me project ID! -p')
}

if (!path) {
  throw Error('Give me path? default arg')
}

languages({
  api_token,
  id,
  percentage: isPercentage
})
  .then(langs => projectToFiles({
    path,
    id,
    api_token,
    langs,
    ...(isApple && { type: 'apple_strings' })
  }))
  .then(console.log)
  .catch(console.error)


// if (_ && p) {
//   projectToFiles({
//     path: _,
//     id: p,
//     api_token: t
//   })
//     .then(console.log)
//     .catch(console.error)
// }
