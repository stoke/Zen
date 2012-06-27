var vows   = require('vows')
  , assert = require('assert')
  , zen    = require('../');

vows
  .describe('lib/zen/common.js')
  .addBatch({
    'empty url': {
      topic: zen.use()
      , 'should point to http://localhost:8098': function() {
        assert.equal(zen._host, '127.0.0.1');
        assert.equal(zen._port, 8098);
        assert.equal(zen._proto, 'http');
      }
    }
  })
  .export(module)