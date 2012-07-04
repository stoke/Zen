Zen
===

The Riak way to enlightenment

[![Build Status](https://secure.travis-ci.org/yawnt/Zen.png?branch=master)](http://travis-ci.org/yawnt/Zen)

## Install

```
$ npm install zen.js
```

## API

####zen.use([url, options])

Sets Riak's url and optionally specifies protocol (http or protobuf)

```javascript
zen.use() // default to http://localhost:8098

zen.use('http://site.com:1234')

zen.use({protocol: 'http'}) 

zen.use('http://site.com:1234', {protocol: 'protobuf'})
```

#### zen.listBuckets()

Gets a list of buckets from the database

__WARNING:__ This function should not be used in production environment because it consumes a lot of memory

```javascript
zen.listBuckets(function(e, buckets) {
  console.log(buckets) // []
});
```

#### zen.getBucket(bucket, [headers], callback)

Gets properties for the specified bucket

```javascript
zen.getBucket('bucket', function(e, bucket) {
  console.log(bucket.props) // {name: 'bucket'.... }
});

zen.getBucket('bucket', {'Content-Type': 'application/json'}, function(err, bucket) {
  console.log(bucket.props) // {name: 'bucket'.... }
});
```

#### zen.setBucket(bucket, props, [headers], callback)

Sets properties for the specified bucket

```javascript
zen.setBucket('bucket', {'last_write_wins': true}, function(e) {
  console.log(e) // null
});

zen.setBucket(
  'bucket'
  , {'last_write_wins': true}
  , {'Content-Type': 'application/json'}
  , function(e) {
    console.log(e) // null
});
```

#### zen.store(bucket, [key], object, [options], [callback])

Stores an object in the database

```javascript
zen.store('bucket', 'key', {hey: 'hi'}, function(e) {
  console.log(e) // null
});

zen.store('bucket', {hey: 'hi'}, function(e) {
  console.log(e) // null
});

zen.store('bucket', 'key', {hey: 'hi'}, {
    'Content-Type': 'text/plain'
  },function(e) {
    console.log(e) // null
});
```
#### zen.fetch(bucket, key, [headers], callback)

Fetches an object from the database

```javascript
zen.fetch('bucket', 'key', {header: 'val'}, function(e, i) {
  console.log(i) // {key: 'val'}
});
```

#### zen.delete(bucket, key, [headers]], callback)

Deletes an object from the database

```javascript
zen.delete('bucket', 'key', {header: 'val'}, function(e) {
  console.log(e); // null
});
```

#### zen.ping(callback)

Checks if database is online

```javascript
zen.ping(function(e, online) {
  console.log(online) // true
});
```

#### zen.status(callback)

Returns Riak's performance and configuration datas

__WARNING:__ it requires ```riak_kv_stat``` to be enabled

```javascript
zen.status(function(e, stats) {
  console.log(stats) // {....}
});
```

#### zen.mapReduce(inputs, map, reduce, [headers], callback)

Performs a mapReduce operation

More info [here](http://wiki.basho.com/MapReduce.html)

```javascript
zen.mapReduce([['bucket1', 'key1'], ['bucket2', 'key2']], function(v) { ... }, function(v) { ... }, function(e, i) {
  console.log(i); // [...]
});
```

## Tests

Tests are written with Mocha

```
$ npm test
```

## License

__MIT__ (see ```LICENSE```)

## To Do

- Protobuf APIs

