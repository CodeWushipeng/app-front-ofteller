var request = require('../../../util/requestHandle.js');
var baseConfig = require('../../../config/baseConfig.json');
var handleRes = require('../../../util/temp/v1/handleResUtil.js');
var uri = 'http://productcenter-storeoperation-dit.csftgroup.com';
var WNToken = baseConfig.WNToken;

module.exports = function attachHandlers(router, io) {
  router.post('/http/jsonService/*', function (req, res) {
    var options = {
      headers: {
        token: WNToken,
      },
      url: uri + req.url.replace('/http/jsonService', ''),
      method: 'POST',
      json: true,
      body: req.body,
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });
};
