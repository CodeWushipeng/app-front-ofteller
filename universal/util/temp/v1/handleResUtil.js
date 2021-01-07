const { log4js, logger } = require("../../logger");
var request = require('../../../util/requestHandle.js');
var baseConfig = require('../../../config/baseConfig.json');
var WNToken = baseConfig.WNToken;
var md5 = require('md5-node');

//统一处理接口返回信息
exports.handleRes = function handleRes(error, response, data, outForwardFun) {
    logger.info(data);
    if (error) {
        try {
            return { "statusCode": response.statusCode, "message": error };
        } catch (err) {
            return { "statusCode": "1", "message": "系统错误" };
        }
    } else {
        if (typeof data == "string") {
            if (data != "" && data != undefined) {
                data = JSON.parse(data)
            } else {
                data = { "message": error }
            }
        }
        if (response.statusCode == 200) {
            if(outForwardFun){
                let oldbody = data;
                var main = outForwardFun;
                const resCode = `function _execute(oldbody){  ${main}  return main(...arguments);}`;
                const exeCode = eval("(" + resCode + ")");
                data = exeCode(oldbody);
                console.log('out post：=============== ',data)
            }
            return data
        } else if (response.statusCode == 201) {
            return { "statusCode": response.statusCode, "data": data };
        } else if (response.statusCode == 204) {
            return { "statusCode": response.statusCode };
        } else {
            if (data.message) {
                data.message = error;
            }
            // return {"statusCode":response.statusCode,"message":data.message};
            return { "statusCode": response.statusCode, "message": data };
        }
    }
}

function objKeySort (obj){
    if(obj){
        var newkey = Object.keys(obj).sort();
        var newObj = {};//创建一个新的对象，用于存放排好序的键值对
        for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
            newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
        }
        return newObj;//返回排好序的新对象
    }else{
        return obj;
    }
}
