var zen  = require('../zen')
  , url  = require('url')
  , util = require('utile')
  , path = require('path');

exports.use = function use(uri, options) {

  if(options && options.protocol) {
    zen._engine = require(
      path.resolve(
        path.join('lib','zen','engines',options.protocol)
      )
    );
  }

  uri = url.parse(uri || '');

  zen._proto = uri.protocol || 'http:';
  zen._host  = uri.hostname || '127.0.0.1';
  zen._port  = uri.port     || '8098';
}

exports.getClientId = function getClientId() {
  this._id = util.randomString(10);
}