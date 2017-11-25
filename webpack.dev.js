const path = require('path');
const glob = require('glob');

const entries = glob
.sync(path.join(__dirname, './test', '/**'))
.filter(folder => {
  if (/\.jsx?$/.test(folder)) return true;
  return false;
})
console.log('entries', entries)
module.exports = {
  entry: entries,
  output: {
    filename: 'test.bundle.js'
  },
  resolveLoader: {
    alias: {
      'cqc-loader': path.join(__dirname, 'index')
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // loader: 'cqc-loader?complexity=6',
        loader: 'cqc-loader',
        exclude: /(node_modules)/,
        query: {
          complexity: 6
        }
      }
    ]
  }
};