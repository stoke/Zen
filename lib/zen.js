var zen     = exports
  , common  = require('./zen/common')
  , utile   = require('utile');


zen.use         = common.use;
zen._id         = utile.randomString(10);
zen.__proto__   = require('./zen/engines/http');