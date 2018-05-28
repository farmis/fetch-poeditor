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
  apple, APPLE, Apple
} = argv

const path = _
const getProject = p || project || Project || PROJECT || P || Projects || projects || PROJECTS
const getToken = t || token || TOKEN || Token
const isApple = apple || APPLE

if (!getToken) {
  throw Error('Give me token! -t')
}

if (!getProject) {
  throw Error('Give me project ID! -p')
}

if (!path) {
  throw Error('Give me path? default arg')
}

if (isApple) {
  console.log(getToken, getProject, isApple, path)
  projectToFiles({ path, id: getProject, api_token: getToken })
    .then(console.log)
    .catch(console.error)
}

// if (_ && p) {
//   projectToFiles({
//     path: _,
//     id: p,
//     api_token: t
//   })
//     .then(console.log)
//     .catch(console.error)
// }