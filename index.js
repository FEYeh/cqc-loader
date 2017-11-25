
/* eslint-disable */
var loaderUtils = require("loader-utils");
var assign = require("object-assign");
require('console-custom')

var CodeQualityChecker = require('cqc');
var codeQualityChecker = new CodeQualityChecker();

function checkCQC(file, options) {
  return codeQualityChecker.check([file], {
    ext: '.js',
    ignorePath: '.gitignore',
    ignorePattern: 'static/',

    jscpdMinLines: 5,
    jspcdMinTokens: 70,
    complexityMax: (options && options.complexity) || 10,

    disableBase: false,
    disableSloc: false,
    disableJscpd: true,
    disableComplexity: false,

    format: undefined,
    verbose: true,
    thresholdJscpd: 3,
    thresholdComplexity: (options && options.complexity) || 10,
  });
}

function printCqcOutput(cqcResult, fileName, webpack) {
  var complexity = cqcResult.complexity
  var details = complexity.details
  if (details && details.length > 0) {
    // console.custom.warning('WARNING in ' + details[0].filepath);
    let reportOutput = ''
    const detail = details[0].details[0]
    reportOutput += `message: ${detail.message}`
    reportOutput += `\nseverity: ${detail.severity}`
    reportOutput += `\nstart-line: ${detail.line} end-line: ${detail.endLine}`
    webpack.emitFile(details[0].filepath, reportOutput)
    webpack.emitWarning(reportOutput)
  } else {
    // console.custom.success('SUCCESS in ' + fileName);
  }
}

/**
 * webpack loader
 *
 * @param {String|Buffer} input JavaScript string
 * @param {Object} map input source map
 * @return {void}
 */

module.exports = function (source) {
  this.cacheable && this.cacheable();

  var globalOptions = this.options.babel || {};
  var loaderOptions = loaderUtils.parseQuery(this.query);
  var userOptions = assign({}, globalOptions, loaderOptions);

  const result = checkCQC(this.resourcePath, userOptions);
  printCqcOutput(result, this.resourcePath, this)

  this.callback(null, source);
};

module.exports.raw = true;