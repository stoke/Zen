var zen  = require('../');

describe('zen', function() {
  describe('#use()', function() {
    it('should point to http://127.0.0.1:8098 if `undefined` is passed', function() {
      zen.use();
      
      zen._proto.should.equal('http:');
      zen._host.should.equal('127.0.0.1');
      zen._port.should.equal('8098')
    });
    it('should point to http://localhost:8098 is `localhost` is passed', function() {
      zen.use('http://localhost');

      zen._proto.should.equal('http:');
      zen._host.should.equal('localhost');
      zen._port.should.equal('8098')
    });
    it('should point to ftp://foobar:1234 if `ftp://foobar:1234` is passed', function() {
      zen.use('ftp://foobar:1234');

      zen._proto.should.equal('ftp:');
      zen._host.should.equal('foobar');
      zen._port.should.equal('1234')     
    });
  })

  describe('#getClientId()', function() {
    it('should wrap utile.randomString()', function() {
      zen.getClientId().should.be.a('string');
    });
  });
});