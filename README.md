Zen
===

The Riak way to englightenment

## Install

```
$ npm install zen.js
```

__Note:__ this is an early-alpha release and it lacks all the main features (i just wanted to be sure no one was going to steal zen.js :P)
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
#### zen.fetch(bucket, key, [headers]], callback)

Fetches an object from the database

```javascript
zen.fetch('key', {header: 'val'}, function(e, i) {
  console.log(i) // {key: 'val'}
});
```


## Tests

Tests are written with Mocha

```
$ npm test
```

## To Do

- Protobuf APIs

