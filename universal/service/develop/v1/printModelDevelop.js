var request = require("../../../util/requestHandle.js");
var request1 = require("request");
var baseConfig = require("../../../config/baseConfig.json");
var handleRes = require("../../../util/temp/v1/handleResUtil.js");
var uri = process.env.API_URL || baseConfig.printModelDevelop;
var WNToken = baseConfig.WNToken;

module.exports = function attachHandlers(router, io) {
  router.post("/printModelDevelop/print/file/render/mock", function (req, res) {
    var options = {
      headers: {
        token: WNToken,
      },
      url: uri + req.url.replace("/printModelDevelop", ""),
      method: "POST",
      json: true,
      body: req.body,
    };

    request1(options)
      .on("error", (error) => {
        let data = { statusCode: error.name, message: error.message };
        res.send(data);
      })
      .on("response", function (response) {
        this.pipe(res);
      });
  });
  router.post("/printModelDevelop/*", function (req, res) {
    var options = {
      headers: {
        token: WNToken,
      },
      url: uri + req.url.replace("/printModelDevelop", ""),
      method: "POST",
      json: true,
      body: req.body,
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  router.delete("/printModelDevelop/*", function (req, res) {
    var options = {
      headers: {
        token: WNToken,
      },
      url: uri + req.url.replace("/printModelDevelop", ""),
      method: "DELETE",
      json: true,
      body: req.body,
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }

    request(options, callback);
  });
  router.put("/printModelDevelop/*", function (req, res) {
    var options = {
      headers: {
        token: WNToken,
      },
      url: uri + req.url.replace("/printModelDevelop", ""),
      method: "PUT",
      json: true,
      body: req.body,
    };
    function callback(error, response, data) {
      res.send(handleRes.handleRes(error, response, data));
    }

    request(options, callback);
  });
};
