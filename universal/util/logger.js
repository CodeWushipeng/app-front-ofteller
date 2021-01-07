//配置log日志信息
var fs = require("fs");
var log4js = require('log4js');
var log4jsjson = require('../log4js.json');

//判断日志存储路径是否存在
var jsonexist = fs.existsSync(log4jsjson.appenders.dateFile.filename);
if (jsonexist) {
} else {
    log4jsjson.appenders.dateFile.filename = "./logs/log";
}


log4js.configure(log4jsjson);
var logger = log4js.getLogger('日志信息');


module.exports = {
    log4js,
    logger
};
