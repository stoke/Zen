var request = require('request')
  , engine  = exports
  , optimal = require('optimal')
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

engine.store = function store(/* bucket, [key], object, [options], callback */) {

  var args = optimal(arguments, 's:bucket, s:[key], o:object, o:[options], f:callback');

  if(args.options) {
    args.options['X-Riak-ClientId'] = headers['X-Riak-ClientId'];
  } else {
    args.options = headers;
  }

  if(args.key) {
    request.put({
      url: zen._path + '/buckets/' + args.bucket + '/keys/' + args.key
      , headers: args.options
      , json: true
      , body: args.object
    }, function(err, res, body) {

      args.callback && args.callback(err, body);

    });
  } else {
    request.post({
      url: zen._path + '/buckets/' + args.bucket + '/keys'
      , headers: args.options
      , json: true
      , body: args.object
    }, function(err, res, body) {

      args.callback && args.callback(err, body);

    });
  }
}

engine.fetch = function fetch(/* bucket, key, [headers], callback */) {
  var args = optimal(arguments, 's:bucket, s:key, o:[headers], f:callback'),
      successCodes = [200, 300, 304];

  request.get({
    url: zen._path + '/buckets/' + args.bucket + '/keys/' + args.key
    , headers: args.headers
  }, function(err, res, body) {
    if (!~successCodes.indexOf(res.statusCode))
      body = 'null';

    args.callback(err, JSON.parse(body));
  })
};

engine.delete = function(/* bucket, key, [headers], callback */) {
  var args = optimal(arguments, 's:bucket, s:key, o:[headers], f:callback');

  request.del({
    url: zen._path + '/buckets/' + args.bucket + '/keys/' + args.key,
    headers: args.headers
  }, function(err, res, body) {
    args.callback(err);
  });
}