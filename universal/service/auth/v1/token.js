var multiparty = require('multiparty');
var formidable = require("formidable");
var request = require("../../../util/requestHandle.js");
var baseConfig = require("../../../config/baseConfig.json");
var handleRes = require("../../../util/temp/v1/handleResUtil.js");
// var { group, dels } = require("../../../util/pemissionHandle.js");
var { logger } = require("../../../util/logger");
var uri = process.env.API_URL || baseConfig.aggregator;
var oauthUri = process.env.ID_URL || baseConfig.oauth;
var application = process.env.APPLICATION || baseConfig.application;

module.exports = function attachHandlers(router, io) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  //根据当前用户token查找token列表
  router.get("/user/tokenList", function (req, res) {
    var id = encodeURI(req.params.id);
    var page = req.query.page;
    var limit = req.query.limit;
    var tenantId = req.query.tenantId ? req.query.tenantId : ""
    console.log(req.headers["x - token"]);
    var options = {
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
      url: oauthUri + `/api-uaa/tokens?page=${page}&limit=${limit}&tenantId=${tenantId}`,
      method: "GET",
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //删除token
  router.get("/user/deleteToken", function (req, res) {
    var token = encodeURI(req.query.token);
    var options = {
      url: oauthUri + `/api-uaa/oauth/remove/token?token=${token}`,
      method: "DELETE",
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }

    request(options, callback);
  });
};
