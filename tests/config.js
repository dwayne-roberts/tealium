var src = './src';
var tests = './tests';

module.exports = {
  html: tests + '/html/events.tpl.html',
  features: {
    FetchExternalResources   : ['script'],
    ProcessExternalResources : ['script']
  }
};