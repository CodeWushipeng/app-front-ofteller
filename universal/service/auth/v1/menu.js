// var multiparty = require('multiparty');
// var formidable = require("formidable");
var request = require("../../../util/requestHandle.js");
var baseConfig = require("../../../config/baseConfig.json");
var handleRes = require("../../../util/temp/v1/handleResUtil.js");
// var { group, dels } = require("../../../util/pemissionHandle.js");
// var { logger } = require("../../../util/logger");
// var uri = process.env.API_URL || baseConfig.aggregator;
var oauthUri = process.env.ID_URL || baseConfig.oauth;
// var application = process.env.APPLICATION || baseConfig.application;

var commonJson = {
    "antiWeightSeqNo": "irure",
    "gloSeqNo": "irure sit officia pariatur ut",
    "pageIndex": 39025562,
    "pageSize": 3715035,
    "projectId": "veniam in elit commodo eiusmod",
    "reqSeqNo": "magna aute dolor adipisicing",
    "reqTime": "in eiusmod ea laborum qui",
    "serviceGroupid": "do eu mollit dolore",
    "serviceId": "consequat",
    "serviceName": "et ullamco ut eu",
    "subProjectId": "laborum velit ea non enim",
}

var headerQuery = {
  "userInfo": {
    "role": [
      "elit",
      "elit consectetur aliqua"
    ],
    "username": "nostrud sunt exercitation qui"
  }
}
var headerDelete = {
    "userInfo": {
        "role": [
            "pariatur",
            "dolor et",
            "dolore incididunt nisi consequat non",
            "pariatur in",
            "eu occaecat"
        ],
        "username": "adipisicing velit Duis reprehenderit ullamco"
    }
}
var headerCreate =  {
    "userInfo": {
        "role": [
            "eu non enim est in",
            "aliquip",
            "consequat"
        ],
        "username": "cupidatat Lorem"
    }
}
var headerUpdate = {
    "userInfo": {
        "role": [
            "exercitation irure magna labore",
            "commodo dolor tempor magna velit"
        ],
        "username": "commodo incididunt enim velit ut"
    }
}

var headerQuery = Object.assign(headerQuery,commonJson)
var headerCreate = Object.assign(headerCreate,commonJson)
var headerUpdate = Object.assign(headerUpdate,commonJson)
var headerDelete = Object.assign(headerDelete,commonJson)

module.exports = function attachHandlers(router, io) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  //根据当前用户token查找菜单列表
  router.post("/menus/findAlls", function (req, res) {
    let tenantId = req.body.tenantId;
    var options = {
      url: oauthUri + `/menuDevelop/qryMenus`,
      method: "POST",
      json: true,
      body: {
          header:headerQuery
      },
    };
    // console.log('tenantId',tenantId)
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });



  //创建菜单
  router.post("/menus/createMenu", function (req, res) {
    var options = {
      url: oauthUri + `/menuDevelop/insertMenu`,
      method: "POST",
      json: true,
      body: {
          body:{
              ...req.body
          },
          header:headerCreate
      },
    };
    console.log(options);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //修改菜单
  router.post("/menus/updateMenu", function (req, res) {
    let tenantId = req.body.tenantId;
    var options = {
      url: oauthUri + `/menuDevelop/alterMenu`,
      method: "POST",
      json: true,
      body: {
          body:{
              ...req.body
          },
          header:headerUpdate
      },
    };
    console.log(options);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  //删除菜单
    router.post("/menus/deleteMenu", function (req, res) {
        let menuCode = req.body.menuCode;
        let id = req.body.id;
        var options = {
            url: oauthUri + `/menuDevelop/deleteMenu`,
            method: "POST",
            json: true,
            body: {
                body:{
                    ...req.body
                },
                header:headerDelete
            },
        };
        console.log('options','==============');
        console.log('req.body.data',req.body.data);
        function callback(error, response, data) {
            console.log(data);
            res.send(handleRes.handleRes(error, response, data));
        }
        request(options, callback);
    });
};


