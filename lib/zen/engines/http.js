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

engine.store = function store(/* bucket, [key], object, [options], [callback] */) {
  var args     = [].slice.call(arguments)
    , bucket   = args.shift()
    , callback = args.pop()
    , key      = args.shift()
    , obj      = args.shift() 
    , opt      = args.shift();

    if(typeof callback !== 'function') opt = callback;

    if(typeof key !== 'string') {
      opt = obj;
      obj = key;
      key = '';
    }

    if(opt) {
      opt['X-Riak-ClientId'] = headers['X-Riak-ClientId'];
    } else {
      opt = headers;
    }

    if(key) {
      request.put({
        url: zen._path + '/buckets/' + bucket + '/keys/' + key
        , headers: opt
        , json: true
        , body: obj
      }, function(err, res, body) {
        if(callback) callback(err, body);
      });
    } else {
      request.post({
        url: zen._path + '/buckets/' + bucket + '/keys'
        , headers: opt
        , json: true
        , body: obj
      }, function(err, res, body) {
        if(callback) callback(err, body);
      });
    }
}

engine.fetch = function fetch(/* bucket, key, headers, callback */) {
  var args     = [].slice.call(arguments)
    , bucket   = args.shift()
    , key      = args.shift()
    , callback = args.pop()
    , headers  = args.shift();

  request.get({
    url: zen._path + '/buckets/' + bucket + '/keys/' + key
    , headers: headers
  }, function(err, res, body) {
    callback(err, JSON.parse(body));
  })
}