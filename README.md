Zen
===

The Riak way to englightenment

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

## To Do

- Protobuf APIs

