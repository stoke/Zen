var request = require('request')
  , zen     = exports
  , common  = require('./zen/common');


zen._request = request;
zen.connect  = common.connect;