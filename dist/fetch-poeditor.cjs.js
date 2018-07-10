#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fetch = _interopDefault(require('isomorphic-fetch'));
var FormData = _interopDefault(require('isomorphic-form-data'));
var fs = _interopDefault(require('fs-extra'));

/**
 * @param {Object} config - object for https://poeditor.com/docs/api#projects_export.
 * @param {String} config.api_token - POEditor API token.
 * @param {Number} config.id - ID of project.
 * @param {String} config.language - The code of language.
 * @param {('po'|'pot'|'mo'|'xls'|'csv'|'resw'|'resx'|'android_strings'|'apple_strings'|'xliff'|'properties'|'key_value_json'|'json'|'xmb'|'xtb')} config.type - File format.
 * @param {(String[]|'translated'|'untranslated'|'fuzzy'|'not_fuzzy'|'automatic'|'not_automatic'|'proofread'|'not_proofread')} [config.filters] - Filter results  (only available when Proofreading is set to "Yes" in Project Settings).
 * @param {(String|String[])} [config.tags] - Filter results by tags.
 */

function singleJSON(_ref) {
  return new Promise(function ($return, $error) {
    var _ref$api_token, api_token, id, _ref$language, language, _ref$type, type, _ref$filters, filters, tags, formData, response, json, url, res;

    _ref$api_token = _ref.api_token, api_token = _ref$api_token === void 0 ? process.env.POEDITOR : _ref$api_token, id = _ref.id, _ref$language = _ref.language, language = _ref$language === void 0 ? 'en' : _ref$language, _ref$type = _ref.type, type = _ref$type === void 0 ? 'key_value_json' : _ref$type, _ref$filters = _ref.filters, filters = _ref$filters === void 0 ? ['translated', 'proofread'] : _ref$filters, tags = _ref.tags;
    formData = new FormData();
    formData.append('api_token', api_token);
    formData.append('id', id);
    formData.append('language', language);
    formData.append('type', type);

    if (filters) {
      switch (filters.constructor.name) {
        case 'Array':
          filters.forEach(function (filter) {
            return formData.append('filters[]', filter);
          });
          break;

        case 'String':
          formData.append('filters', filters);
      }
    }

    if (tags) {
      switch (tags.constructor.name) {
        case 'Array':
          tags.forEach(function (tag) {
            return formData.append('tags[]', tag);
          });
          break;

        case 'String':
          formData.append('tags', tags);
      }
    }
    /**
     * Let's ask for URL to our lovely data :3
     *  Why don't they simply return data? idk
     */


    return Promise.resolve(fetch('https://api.poeditor.com/v2/projects/export', {
      method: 'POST',
      body: formData
    })).then(function ($await_1) {
      try {
        response = $await_1;
        return Promise.resolve(response.json()).then(function ($await_2) {
          try {
            json = $await_2;
            url = json.result.url;
            if (!url) return $error(new Error("We didn't get URL from PO :S"));
            /**
             * Fetch Strings ❤️
             */

            return Promise.resolve(fetch(url)).then(function ($await_3) {
              try {
                res = $await_3;

                switch (type) {
                  case 'apple_strings':
                    return $return(res.text());

                  default:
                    return $return(res.json());
                }

                return $return();
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }, $error);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}

/**
 * @param {Object} config - object for https://poeditor.com/docs/api#projects_export.
 * @param {String} config.api_token - POEditor API token.
 * @param {Number} config.id - ID of project.
 */

function languages(_ref) {
  return new Promise(function ($return, $error) {
    var _ref$api_token, api_token, id, _ref$percentage, percentage, formData, response, json, res;

    _ref$api_token = _ref.api_token, api_token = _ref$api_token === void 0 ? process.env.POEDITOR : _ref$api_token, id = _ref.id, _ref$percentage = _ref.percentage, percentage = _ref$percentage === void 0 ? 0 : _ref$percentage;
    formData = new FormData();
    formData.append('api_token', api_token);
    formData.append('id', id);
    /**
     * 
     */

    return Promise.resolve(fetch('https://api.poeditor.com/v2/languages/list', {
      method: 'POST',
      body: formData
    })).then(function ($await_1) {
      try {
        response = $await_1;
        return Promise.resolve(response.json()).then(function ($await_2) {
          try {
            json = $await_2;

            if (json.response.status === 'success') {
              res = json.result.languages.filter(function (current) {
                return current.percentage > percentage;
              }).map(function (current) {
                return current.code;
              });
              console.log("Languages with more than ".concat(percentage, "% translation: ").concat(res.join(', ')));
              return $return(res);
            } else {
              return $error(new Error(json.response.message));
            }

            return $return();
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}

function toFile (path, json) {
  return new Promise(function ($return, $error) {
    if (path && json) {
      return Promise.resolve(fs.ensureFile(path)).then(function ($await_2) {
        try {
          if (json.constructor === Object) {
            return $return(fs.outputJson(path, json));
          } else {
            return $return(fs.outputFile(path, json));
          }

          return $If_1.call(this);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }

    function $If_1() {
      return $return();
    }

    return $If_1.call(this);
  });
}

/**
 * @param {Object} config - object for https://poeditor.com/docs/api#projects_export.
 * @param {String} config.api_token - POEditor API token.
 * @param {Number} config.id - ID of project.
 * @param {String} config.path - path to location for file saving
 */

function projectToFiles (_ref) {
  return new Promise(function ($return, $error) {
    var _ref$api_token, api_token, id, _ref$path, path, type, _ref$langs, langs, _ref$isApple, isApple;

    _ref$api_token = _ref.api_token, api_token = _ref$api_token === void 0 ? process.env.POEDITOR : _ref$api_token, id = _ref.id, _ref$path = _ref.path, path = _ref$path === void 0 ? 'Strings' : _ref$path, type = _ref.type, _ref$langs = _ref.langs, langs = _ref$langs === void 0 ? ['en'] : _ref$langs, _ref$isApple = _ref.isApple, isApple = _ref$isApple === void 0 ? false : _ref$isApple;
    console.log(type); // Fetch and save translations

    return Promise.resolve(langs.forEach(function (language) {
      return new Promise(function ($return, $error) {
        var json, fileuri;
        return Promise.resolve(singleJSON({
          api_token: api_token,
          id: id,
          language: language,
          type: type
        })).then(function ($await_1) {
          try {
            json = $await_1;
            fileuri = '';

            switch (type) {
              case 'apple_strings':
                fileuri = "".concat(path, "/").concat(id, "/").concat(language, ".lproj/Localizable.strings");
                break;

              default:
                fileuri = "".concat(path, "/").concat(id, "/").concat(language, ".json");
            }

            return Promise.resolve(toFile(fileuri, json)).then(function ($await_2) {
              try {
                console.log('Created => ' + fileuri);
                return $return();
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }, $error);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      });
    })).then(function ($await_3) {
      try {
        return $return("Doing! Not gonna tel you when done...");
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}

var argv = require('minimist')(process.argv.slice(2));

var _ = argv._,
    p = argv.p,
    project = argv.project,
    Project = argv.Project,
    PROJECT = argv.PROJECT,
    P = argv.P,
    Projects = argv.Projects,
    projects = argv.projects,
    PROJECTS = argv.PROJECTS,
    t = argv.t,
    token = argv.token,
    TOKEN = argv.TOKEN,
    Token = argv.Token,
    percentage = argv.percentage,
    PERCENTAGE = argv.PERCENTAGE,
    Percentage = argv.Percentage,
    per = argv.per,
    apple = argv.apple,
    APPLE = argv.APPLE,
    Apple = argv.Apple;
var path = _;
var id = p || project || Project || PROJECT || P || Projects || projects || PROJECTS;
var api_token = t || token || TOKEN || Token;
var isPercentage = percentage || PERCENTAGE || Percentage || per;
var isApple = apple || APPLE || Apple;

if (!api_token) {
  throw Error('Give me token! -t');
}

if (!id) {
  throw Error('Give me project ID! -p');
}

if (!path) {
  throw Error('Give me path? default arg');
}

languages({
  api_token: api_token,
  id: id,
  percentage: isPercentage
}).then(function (langs) {
  return projectToFiles(Object.assign({
    path: path,
    id: id,
    api_token: api_token,
    langs: langs
  }, isApple && {
    type: 'apple_strings'
  }));
}).then(console.log).catch(console.error); // if (_ && p) {
//   projectToFiles({
//     path: _,
//     id: p,
//     api_token: t
//   })
//     .then(console.log)
//     .catch(console.error)
// }

exports.singleJSON = singleJSON;
exports.languages = languages;
exports.toFile = toFile;
exports.projectToFiles = projectToFiles;
