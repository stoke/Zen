var request = require('request')
  , engine  = exports
  , zen     = require('../../zen')
  , headers = {'X-Riak-ClientId': zen._id}

engine._protocol = 'http';

engine.listBuckets = function listBuckets(callback) {
  request.get({
    url: zen._path + '/buckets?buckets=true'
    , headers: headers
  }, function(err, res, body) {
    callback(err, JSON.parse(body).buckets);
  });
}