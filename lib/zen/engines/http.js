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

engine.getBucket = function getBucket(/* bucket, [headers], callback */) {
  var args = optimal(arguments, 's:bucket, o:[headers], f:callback');

  if(args.headers) {
    args.headers['X-Riak-ClientId'] = headers['X-Riak-ClientId']
  } else {
    args.headers = headers;
  }

  request.get({
    url: zen._path + '/buckets/' + args.bucket + '/props'
    , headers: args.headers
  }, function(err, res, body) {
    args.callback(err, JSON.parse(body));
  })
}

engine.setBucket = function setBucket(/* bucket, props, [headers], callback */) {
  var args = optimal(arguments, 's:bucket, o:props, o:[headers], f:callback');

  if(args.headers) {
    args.headers['X-Riak-ClientId'] = headers['X-Riak-ClientId']
  } else {
    args.headers = headers;
  }

  request.put({
    url: zen._path + '/buckets/' + args.bucket + '/props'
    , json: true
    , body: {props: args.props}
    , headers: args.headers
  }, function(err, res, body) {
    args.callback(err);
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
}

engine.delete = function (/* bucket, key, [headers], callback */) {
  var args = optimal(arguments, 's:bucket, s:key, o:[headers], f:callback');

  request.del({
    url: zen._path + '/buckets/' + args.bucket + '/keys/' + args.key,
    headers: args.headers
  }, function(err, res, body) {
    args.callback(err);
  });
}

engine.ping = function ping(callback) {
  request.get(zen._path + '/ping', function(e, res, body) {
    callback(e, res.statusCode === 200);
  });
}

engine.status = function status(/* [headers], callback */) {
  var args = optimal(arguments, 'o:[headers], f:callback');

  if(args.headers) {
    args.headers['X-Riak-ClientId'] = headers['X-Riak-ClientId'];
  } else {
    args.headers = headers;
  }

  request.get({
    url: zen._path + '/stats'
    , headers: args.headers
  }, function(e, res, body) {
    if(res.statusCode === 404) {
      e = new Error('riak_kv_stat not enabled');
    }
    
    args.callback(e, JSON.parse(body || null));
  });
}

engine.mapReduce = function(inputs, map, reduce, heads, callback) {
  var json = {inputs: inputs, query: []}, query;

  if (typeof heads === 'function')
    callback = heads;

  if (map) {
    query = {};
    query.map = {};
    query.map.language = 'javascript';
    query.map.source = map.toString();
    json.query.push(query);
  }

  if (reduce) {
    query = {};
    query.reduce = {};
    query.reduce.language = 'javascript';
    query.reduce.source = reduce.toString();
    json.query.push(query);
  }

  request.post({
    url: zen._path + '/mapred',
    headers: heads,
    json: true,
    body: JSON.stringify(json)
  }, function(e, res, body) {
    callback(e, body);
  });
}