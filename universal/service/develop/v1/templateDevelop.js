var request = require("../../../util/requestHandle.js");
var baseConfig = require("../../../config/baseConfig.json");
var handleRes = require("../../../util/temp/v1/handleResUtil.js");
var uri = "http://192.168.2.120:30104";
var WNToken = baseConfig.WNToken;

module.exports = function attachHandlers(router, io) {
  router.post("/template/*", function (req, res) {
    var options = {
      headers: {
        token: WNToken,
      },
      url: uri + req.url.replace("", ""),
      method: "POST",
      json: true,
      body: req.body,
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });
};
