var zen  = require('../zen')
  , url  = require('url')
  , path = require('path');

exports.use = function use() {
  var args = [].slice.call(arguments)
    , opt  = args.pop()
    , uri  = args.pop();

  if(typeof opt === 'object' && opt.protocol) {
    zen.__proto__ = require(
      path.resolve(
        path.join('lib','zen','engines',opt.protocol)
      )
    );
  } else if(typeof opt === 'string') {
    uri = opt;
  }

  uri = url.parse(uri || '');

  zen._proto = uri.protocol || 'http:';
  zen._host  = uri.hostname || '127.0.0.1';
  zen._port  = uri.port     || '8098';
  zen._path  = zen._proto + '//' + zen._host + ':' + zen._port;
}