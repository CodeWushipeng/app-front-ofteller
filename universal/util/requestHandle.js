
//对reques统一处理
var request=require('request');
var dateFormat = require('./index');
var baseConfig = require('../config/baseConfig.json');
var WNToken = baseConfig.WNToken;
var md5 = require('md5-node');
var dateFormat = require('./index');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
module.exports =function requestHandle(options,callback) {
    console.log("-----------------------------------------")
    console.log("request options",options)

    //开启挡板
    if((process.env.openBaffle == true || process.env.openBaffle == "true") && options.url.indexOf("nacos/v1/cs/configs") == -1 && options.url.indexOf("/requestVitualhost/") == -1 ){
        var baffleBody = new Object()
        var urlServeTemp  = options.url ? options.url : (options.path ? options.path : "")
        urlServeTemp = (urlServeTemp.split("://"))[1]
        urlServeTemp = urlServeTemp.substring(urlServeTemp.indexOf("/"),urlServeTemp.length)
        baffleBody.body = new Object()
        baffleBody.body.targetServeName = urlServeTemp
        baffleBody.body.sendHashCode = (options.method == "POST") ? md5(JSON.stringify(objKeySort(options.body.body)))  : ""
        baffleBody.header = (options.body && options.body.header) ? options.body.header : commonJson

        var options = {
            headers: {
                "content-type": "application/json",
                token: WNToken
            },
            url: process.env.requestVitualhost + "/requestVitualhost/queryVirtualHost",
            method: 'POST',
            json: true,
            body: baffleBody
        };
        request(options, callback);
    }else{
        request(options,callback);
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

var commonJson = {
    //"gloSeqNo": "10A07"+ dateFormat("YYYYmmdd", new Date()) + (new Date()).getTime().toString().substr(-4,4),
    "gloSeqNo": "10A072020"+ (new Date()).getTime().toString().substr(-8,8),
    "reqSeqNo": dateFormat("YYYYmmddHHMMSS", new Date()) + (new Date()).getTime().toString().substr(-3,3),
    "reqTime": dateFormat("YYYYmmddHHMMSS", new Date()),
    "channel": "channel",
    "projectId": "subProjectId",
    "subProjectId": "subProjectId",
    "terminalCode": "terminalCode",
    "branchId": "966999",
    "serviceId": "serviceId",
    "serviceName": "test",
    "serviceGroupid": "serviceGroupid",
    "sourceSysId": "sourceSysId",
    "consumerId": "consumerId",
    "pageIndex": 0,
    "pageSize": 999,
    "mac": "mac",
    "keyId": "keyId",
    "extend": {
        "TranTeller": "99988999"
    },
    "userInfo": {
        "username": "123",
        "role": []
    },
}


