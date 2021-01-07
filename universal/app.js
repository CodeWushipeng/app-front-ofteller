const express = require('express')
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");
var log4js = require("log4js");

var routes = require("./routes/routes.js");
var log4jsjson = require("./log4js.json");
var baseConfig = require("./config/baseConfig.json");
//预留
var expressSession = require("express-session");
var cookieParser = require("cookie-parser");

//初始化rest api接口

var nacosConfigCenterPara = require("./util/paraSynUtil/nacosUtil.js");



//配置log日志信息
//判断日志存储路径是否存在
var jsonexist = fs.existsSync(log4jsjson.appenders.dateFile.filename);
if (jsonexist) {
} else {
  log4jsjson.appenders.dateFile.filename = "./logs/log";
}
log4js.configure(log4jsjson);
var logger = log4js.getLogger("日志信息");
var httpServer;
//创建socket.io
createHttpSocket = function createHttpSocket(httpsocket) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  httpsocket.post("/v1/websocket/:publisher", function (req, res) {
    io.sockets.emit(req.params.publisher, req.body);
    res.send({ code: "000", success: "成功" });
  });
};


//创建express服务
createServer = function createServer() {
  var server = express();
  // 设置模板位置
  // server.set("views", path.join(__dirname, "views"));
  // server.set("view engine", "pug");
  //创建socket.io
  httpServer = require("http").Server(server);
  var io = require("socket.io")(httpServer);
  createHttpSocket(router);
  // 服务端监听连接状态：io的connection事件表示客户端与服务端成功建立连接，它接收一个回调函数，回调函数会接收一个socket参数。
  io.on("connection", (socket) => {
    //console.log('=================建立连接==============');
    socket.emit("serverMessage", "与服务器建立连接");
    // 监听断开连接状态：socket的disconnect事件表示客户端与服务端断开连接
    socket.on("disconnect", () => {
      //console.log('=================断开连接==============');
    });
  });
  // 设置获取请求信息为json格式
  server.use(bodyParser.json({ limit: 1024 * 1024 * 10 }));
  server.use(
    bodyParser.urlencoded({
      extended: true,
      limit: 1024 * 1024 * 10, // 前端最大可提交数据限
    })
  );

  //设置静态文件位置
  server.use(express.static(path.join(__dirname, "public")));

  //设置日志级别
  server.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));

  server.use(function (req, res, next) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    //允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, GET, POST, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    router(req, res, next);
  });


  // 错误处理中间件
  server.use(function (err, req, res, next) {
    console.log(err.status);
    logger.error(
      "请求的url为：" + req.url + "，错误处理中间捕获异常",
      err.message
    );
    res.send({
      statusCode: err.code || 500,
      code: "100000000000000",
      message: "内部错误,请稍后重试",
    });
  });

  routes.attachHandlers(router, io);
  return server;
};
// var server = createServer();
var port = Number(process.env.PORT || baseConfig.port);

startListen = function (url) {
  console.log("动态服务接口地址：", url)
  if (url) {
    // process.env.OAUTH_URL = url.oauth_url;
    // process.env.AUTH_URL = url.auth_url;
    // process.env.MINIO_URL = url.minio_url;
    // console.log("动态服务环境变量OAUTH_URL：", process.env.OAUTH_URL)
    // console.log("动态服务环境变量AUTH_URL：", process.env.AUTH_URL)
    // console.log("动态服务环境变量MINIO_URL：", process.env.MINIO_URL)
  }
  var server = createServer();
  httpServer.listen(port, function () {
    logger.info("启动端口:" + port);
  });
}

nacosConfigCenterPara(router, startListen)

//对抛出异常统一处理
process.on("uncaughtException", function (err) {
  logger.error("Error: %s", err.message);
});

