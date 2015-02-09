var dest = './dist';
var src = './src';
var tests = './tests';

module.exports = {
  jshint: {
    src: src + '/js/*.js',
    jshintrc: {
      'devel': true,
      'quotmark': 'single',
      'strict': true,
      'indent': 2,
      'curly': true,
    }
  },
  tests: {
    src: tests +'/js/*.js',
    options: {
      'verbose': true,
      'includeStackTrace': true
    }
  },
  production: { 
    src: src + '/js/*.js',
    dest: dest,
    destFile: 'tealium.js',
  }
};