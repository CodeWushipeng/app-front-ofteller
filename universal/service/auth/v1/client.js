var multiparty = require('multiparty');
var formidable = require("formidable");
var request = require("../../../util/requestHandle.js");
var baseConfig = require("../../../config/baseConfig.json");
var handleRes = require("../../../util/temp/v1/handleResUtil.js");
// var { group, dels } = require("../../../util/pemissionHandle.js");
var { logger } = require("../../../util/logger");
// var uri = process.env.API_URL || baseConfig.aggregator;
var oauthUri = process.env.ID_URL || baseConfig.oauth;
var application = process.env.APPLICATION || baseConfig.application;

module.exports = function attachHandlers(router, io) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  //根据当前用户token查找应用列表
  router.get("/user/clientList", function (req, res) {
    var id = encodeURI(req.params.id);
    var page = req.query.page;
    var limit = req.query.limit;
    var searchKey = req.query.searchKey ? req.query.searchKey : ""
    var options = {
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
      url: oauthUri + `/api-uaa/clients/list?page=${page}&limit=${limit}&searchKey=${searchKey}`,
      method: "GET",
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //添加应用
  router.post("/user/createClient", function (req, res) {
    var options = {
      url: oauthUri + "/api-uaa/clients/saveOrUpdate",
      method: "POST",
      json: true,
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
      body: req.body,
    };
    console.log(options);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //编辑应用
  router.post("/user/updateClient", function (req, res) {
    var tenantId = "webApp";
    var options = {
      url: oauthUri + `/api-uaa/clients/saveOrUpdate`,
      method: "POST",
      json: true,
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
      body: req.body,
    };
    console.log(options);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //删除应用
  router.get("/user/deleteClient", function (req, res) {
    var id = encodeURI(req.query.id);
    var tenantId = encodeURI(req.query.tenantId);
    var options = {
      url: oauthUri + `/api-uaa/clients/${id}`,
      method: "DELETE",
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }

    request(options, callback);
  });

  //获取所有client
  router.get("/user/allClients", function (req, res) {
    var options = {
      url: oauthUri + `/api-uaa/clients/all`,
      method: "GET",
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }

    request(options, callback);
  });
};
