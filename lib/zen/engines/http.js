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
    , opt      = args.pop()
    , key      = args.shift()
    , obj      = args.shift(); 


    if(typeof callback !== 'function') opt = callback;

    if(typeof key !== 'string') {
      object = key;
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
      }, function(err, res, body) {
        if(callback) callback(err, body);
      });
    } else {
      request.post({
        url: zen._path + '/buckets/' + bucket + '/keys'
        , headers: opt
        , json: true
      }, function(err, res, body) {
        if(callback) callback(err, body);
      });
    }
}