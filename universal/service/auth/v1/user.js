// var multiparty = require('multiparty');
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
  //登录页面请求验证码
  router.get("/user/logincode", function (req, res) {
    var id = encodeURI(req.query.uid);
    var url = oauthUri + '/api-uaa/validata/code/' + id;
    if (req.query.t) {
      url += `?t=${req.query.t}`;
    }
    console.log(url);
    var options = {
      url: url,
      method: "GET",
    };

    function callback(error, response, data) {
      if (data) {
        data = JSON.stringify({
          url: options.url
        })
      }
      if (response.body) {
        response.body = data;
      }
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //登录获取token
  router.post("/user/login", function (req, res) {
    var options = {
      url: oauthUri + "/api-uaa/oauth/user/token",
      method: "POST",
      json: true,
      type: "form",
      headers: { "Authorization": "Basic " + new Buffer("webApp:webApp").toString('base64') },
      body: req.body,
    };
    console.log(options);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //获取当前用户详情
  router.get("/user/userDetail", function (req, res) {
    console.log(req.headers["x - token"]);
    var options = {
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
      url: oauthUri + `/api-user/users/current`,
      method: "GET",
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //根据当前用户token查找用户列表
  router.get("/user/userlist", function (req, res) {
    var page = req.query.page;
    var limit = req.query.limit;
    var searchKey = req.query.searchKey ? req.query.searchKey : ""
    var searchValue = req.query.searchValue ? req.query.searchValue : ""
    console.log(req.headers["x - token"]);
    var options = {
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
      url: oauthUri + `/api-user/users?page=${page}&limit=${limit}&searchValue=${searchValue}&searchKey=${searchKey}`,
      method: "GET",
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });


  // "http://qms-dap-gateway.service.sd/api-uaa/oauth/remove/token?redirect_uri=http://qloud-dap-admin.service.sd/login.html&access_token=033d3c7d-441f-48ce-89d2-fbc8c2a7daba"

  //logout退出
  router.get("/user/logout", function (req, res) {
    // var options = {
    //   headers: { "Authorization": "Bearer " + req.headers["x-token"] },
    //   url: oauthUri + `/api-uaa/oauth/remove/token?access_token=${req.headers["x-token"]}`,
    //   method: "GET",
    // };
    var options = {
      url: oauthUri + '/api-uaa/validata/code/',
      method: "GET",
    };

    function callback(error, response, data) {
      response.statusCode = 200;
      if (data) {
        data = JSON.stringify({
          url: options.url
        })
      }
      if (response.body) {
        response.body = data;
      }
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //获取所有权限
  router.get("/user/allRoles", function (req, res) {
    var options = {
      url: oauthUri + `/api-user/allRoles`,
      method: "GET",
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //创建用户
  router.post("/user/createUser", function (req, res) {
    var options = {
      url: oauthUri + "/api-user/users/saveOrUpdate",
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

  //编辑用户
  router.post("/user/updateUser", function (req, res) {
    var options = {
      url: oauthUri + "/api-user/users/saveOrUpdate",
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

  //删除用户
  router.get("/user/deleteUser", function (req, res) {
    var id = encodeURI(req.query.id);
    var options = {
      url: oauthUri + `/api-user/users/${id}`,
      method: "DELETE",
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }

    request(options, callback);
  });

  //重置用户密码
  router.get("/user/resetPasword", function (req, res) {
    var id = encodeURI(req.query.id);
    var options = {
      url: oauthUri + `/api-user/users/${id}/password`,
      method: "PUT",
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }

    request(options, callback);
  });

  //修改用户密码
  router.post("/user/updatePws", function (req, res) {
    var id = encodeURI(req.query.id);
    var options = {
      url: oauthUri + `/api-user/users/password`,
      method: "PUT",
      headers: { "Authorization": "Bearer " + req.headers["x-token"], "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }

    request(options, callback);
  });

  //修改用户状态
  router.get("/user/updateEnabled", function (req, res) {
    var id = req.query.id;
    var enabled = req.query.enabled;
    var options = {
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
      url: oauthUri + `/api-user/users/updateEnabled?id=${id}&enabled=${enabled}`,
      method: "GET",
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //获取用户菜单
  router.get("/user/currentMenus", function (req, res) {
    var options = {
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },
      url: oauthUri + `/api-user/menus/current`,
      method: "GET",
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

};
