var zen    = require('../')
  , assert = require('assert');

zen.use();

describe('zen', function() {
  describe('#listBuckets()', function() {
    it('should return a list of buckets', function(done) {
      zen.listBuckets(function(err, buckets) {
        buckets.should.be.an.instanceOf(Array);
        done();
      });
    });
  });

  describe('#store()', function() {
    it('should save object if `key` is passed', function(done) {
      zen.store('cestone', 'heyo', {lol: 'true'}, function(e,b) {
        assert.equal(null, e);
        done();
      });
    });
    it('should save object even if no `key` is passed', function(done) {
      zen.store('cestone', {lol: 'true'}, function(e,b) {
        assert.equal(null, e);
        done();
      });
    });
  });

  describe('#fetch()', function() {
    it('should fetch `object` from specified bucket', function(done) {
      zen.fetch('cestone', 'heyo', function(e, i) {
        assert.equal(i.lol, 'true');
        done();
      });
    });
  });

  describe('#delete()', function() {
    it('should delete an `object` if it exists', function(done) {
      zen.store('cestone', 'test', {test: true}, function(e, b) {
        assert.equal(null, e);
        zen.delete('cestone', 'test', function(e) {
          assert.equal(null, e);
          zen.fetch('cestone', 'test', function(e, b) {
            assert.equal(null, e);
            assert.equal(null, b);
            done();
          });
        });
      });
    });
  });

  describe('#getBucket()', function() {
    it('should return properties of a `bucket`', function(done) {
      zen.getBucket('cestone', function(err, props) {
        assert.equal(null, err);
        props.should.be.a('object');
        props.props.name.should.equal('cestone');
        done();
      });
    })
  });

  describe('#setBucket()', function() {
    it('should set properties for a `bucket`', function(done) {
      zen.setBucket('cestone', {'last_write_wins': 'false'}, function(e) {
        assert.equal(null, e);
        zen.getBucket('cestone', function(e, props) {
          props.props.last_write_wins.should.equal(false);
          done();
        });
      });
    });
  });

  describe('#ping()', function() {
    it('should check if db is online', function(done) {
      zen.ping(function(e, online) {
        assert.equal(null, e);
        online.should.equal(true);
        done();
      });
    });
  });

  /*describe('#status()', function() {
    it('should return stats from the database', function(done) {
      zen.status(function(e, stats) {
        assert.equal(null, e);
        stats.should.be.a('object');
        done();
      });
    });
  });*/

  describe('#mapReduce()', function() {
    it ('should map and reduce', function(done) {
      zen.store('cestone', 'test_mapReduce1', [1, 2, 3], function(e, b) {
        assert.equal(null, e);

        zen.store('cestone', 'test_mapReduce2', [4, 5, 6], function(e, b) {
          var map = function(v) { return [JSON.parse(v.values[0].data)]; },
              reduce = function(v) { return v[0].concat(v[1]); };
          
          assert.equal(null, e);
          zen.mapReduce([['cestone', 'test_mapReduce1'], ['cestone', 'test_mapReduce2']], map, reduce, function(e, b) {
            assert.equal(null, e);
            b.should.eql([1, 2, 3, 4, 5, 6]);
            done();
          });
        });
      });
    });
  });
});