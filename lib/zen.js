var request = require('request')
  , zen     = exports
  , common  = require('./zen/common');


zen._request    = request;
zen.use         = common.use;
zen.getClientId = common.getClientId