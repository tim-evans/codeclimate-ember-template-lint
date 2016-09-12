#!/usr/bin/env node

process.chdir('/code');

var Linter = require('ember-template-lint');
var walkSync = require('walk-sync');
var fs = require('fs');
var path = require('path');
var modulePrefix;

var linter = new Linter();
var dir = 'app';
try {
  fs.accessSync('addon', fs.F_OK);
  dir = 'addon';
  modulePrefix = require(process.cwd() + '/index').name;
} catch (e) {
  modulePrefix = require(process.cwd() + '/config/environment')('production').modulePrefix;
}

var engineConfig = fs.readFileSync('/config.json');
var includePaths = ['app/**/*'];
if (engineConfig.include_paths) {
  includePaths = engineConfig.include_paths;
}

var excludePaths = [];
if (engineConfig.exclude_paths) {
  excludePaths = engineConfig.exclude_paths;
}

var templateFiles = walkSync('./', { globs: includePaths, ignore: excludePaths }).filter(function (file) {
  return path.extname(file) === '.hbs';
});

var issues = [];
var SEVERITY = ['info', 'normal', 'critical'];

templateFiles.forEach(function (file) {
  var filePath = path.join(file);
  var contents = fs.readFileSync(filePath, { encoding: 'utf8' });
  var moduleId = path.join(modulePrefix, file).slice(0, -4);

  var errors = linter.verify({
    source: contents,
    moduleId: moduleId
  });

  errors.forEach(function (error) {
    console.log(error);
    issues.push({
      type: 'issue',
      check_name: error.rule,
      description: error.message.replace(/ beginning at L\d+:C\d+/g, ''),
      categories: ['Style'],
      severity: SEVERITY[error.severity - 1],
      location: {
        path: filePath,
        positions: {
          begin: {
            line: error.line,
            column: error.column
          },
          end: {
            line: error.line,
            column: error.column
          }
        }
      }
    });
  });
});

issues.forEach(function (issue) {
  console.log(JSON.stringify(issue) + '\0');
});
