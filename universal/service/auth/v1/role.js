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

  //根据当前用户token查找角色列表
  router.get("/user/rolelist", function (req, res) {
    var id = encodeURI(req.params.id);
    var page = req.query.page;
    var limit = req.query.limit;
    var searchKey = req.query.searchKey ? req.query.searchKey : ""
    var searchValue = req.query.searchValue ? req.query.searchValue : ""
    console.log(req.headers["x - token"]);
    var options = {
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
      url: oauthUri + `/api-user/roles?page=${page}&limit=${limit}&searchValue=${searchValue}&searchKey=${searchKey}`,
      method: "GET",
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //获取所有权限
  // router.get("/user/allRoles", function (req, res) {
  //   var options = {
  //     url: oauthUri + `/api-user/allRoles`,
  //     method: "GET",
  //     headers: { "Authorization": "Bearer " + req.headers["x-token"] },
  //   };
  //   function callback(error, response, data) {
  //     res.send(handleRes.handleRes(error, response, data));
  //   }
  //   request(options, callback);
  // });

  //创建角色
  router.post("/user/createRole", function (req, res) {
    var options = {
      url: oauthUri + "/api-user/roles/saveOrUpdate?tenantId=webApp",
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

  //编辑角色
  router.post("/user/updateRole", function (req, res) {
    var tenantId = "webApp";
    var options = {
      url: oauthUri + `/api-user/roles/saveOrUpdate?tenantId=${tenantId}`,
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

  //删除角色
  router.get("/user/deleteRole", function (req, res) {
    var id = encodeURI(req.query.id);
    var tenantId = encodeURI(req.query.tenantId);
    var options = {
      url: oauthUri + `/api-user/roles/${id}?tenantId=webApp`,
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

  //获取角色对应菜单
  router.get("/user/menus", function (req, res) {
    var id = encodeURI(req.query.id);
    var options = {
      url: oauthUri + `/api-user/menus/${id}/menus?tenantId=webApp`,
      method: "GET",
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }

    request(options, callback);
  });

  //角色对应菜单
  router.post("/user/menus/granted", function (req, res) {
    var id = encodeURI(req.query.id);
    var tenantId = "webApp";
    var options = {
      url: oauthUri + `/api-user/menus/granted?tenantId=${tenantId}`,
      method: "POST",
      headers: { "Authorization": "Bearer " + req.headers["x-token"], "content-type": "application/json" },
      json: true,
      body: req.body,
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }

    request(options, callback);
  });
};
