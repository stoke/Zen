var zen = require('../zen')
  , url = require('url');

exports.use = function use(path) {
  path = url.parse(path || '');

  zen._proto = path.protocol || 'http:';
  zen._host  = path.hostname || '127.0.0.1';
  zen._port  = path.port     || '8098';
}