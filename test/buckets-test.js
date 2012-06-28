var zen  = require('../');

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
});