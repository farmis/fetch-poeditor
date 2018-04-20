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
const { _, p, t } = argv
if (_ && p) {
  projectToFiles({
    path: _,
    id: p,
    api_token: t
  })
    .then(console.log)
    .catch(console.error)
}