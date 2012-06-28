var zen = require('../zen')
  , url = require('url')
  , uti = require('utile');

exports.use = function use(path) {
  path = url.parse(path || '');

  zen._proto = path.protocol || 'http:';
  zen._host  = path.hostname || '127.0.0.1';
  zen._port  = path.port     || '8098';
}

exports.getClientId = function getClientId() {
  return uti.randomString(10);
}