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
});