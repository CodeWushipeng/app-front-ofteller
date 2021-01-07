var request = require('../requestHandle.js');
var ws = require("nodejs-websocket");
var schedule = require('node-schedule');
var connSocketSer;
var waitSentSocketContent = {};

//计时器
function secondSend(systime,url,purposeId,websocketsent) {
    var systimeValue ;
    var systimeType ;
    if(systime.indexOf("-") > -1){
        var systimeArr = systime.split("-")
        systimeValue = parseFloat(systimeArr[0])
        systimeType = systimeArr[1]
    }
    var rule1  = new schedule.RecurrenceRule();
    var times1 = [];
    for (i = 0; i <= 60; i += systimeValue) {
        times1.push(i)
    }
    //秒second  分minute   时hour
    if(systimeType == "s"){
        rule1.second  = times1
    } else if(systimeType == "m"){
        rule1.minute  = times1
    } else if(systimeType == "h"){
        rule1.hour  = times1
    } else {
        console.log("同步更新时间值未定义或不规范")
        return
    }
    console.log("计时器启动: 时间:" + times1 + " 时间类型:" + systimeType + " 地址"+ url);
    schedule.scheduleJob(rule1, function(){
        console.log(new Date().getSeconds());
        paraSynRes(url,purposeId,websocketsent);
    });

}

//参数同步
function paraSynRes(url,purposeId,websocketsent) {
    var comparaSynOptions =
        {
            url: url,
            method: 'GET',
        };
    function comparaSynCallback(error, response, data) {
        console.log("同步的参数: " + url + " "+ purposeId, data);
        if(data){
            var commonParaObj = process.env.commonPara ? JSON.parse(process.env.commonPara) : {};
            commonParaObj[purposeId] = data;
            process.env.commonPara = JSON.stringify(commonParaObj)
            //console.log("公共数据区: " + process.env.commonPara);
            if(websocketsent && websocketsent == true){
                if(connSocketSer){
                    connSocketSer.sendText(data)
                }else{
                    waitSentSocketContent[purposeId] = data
                    console.log("websocket 未连接")
                }
            }
        }
    }
    request(comparaSynOptions, comparaSynCallback);
}

//websocketsent
function websocketsent(websocketsentContent,paraSynAddress) {
    //是否需要解析数据
    if(websocketsentContent.analysis && websocketsentContent.analysis == true && websocketsentContent.varname){
        websocketsentContent.analysisContent = paraSynAddress;
    }
    //推送
    if(connSocketSer){
        connSocketSer.sendText(JSON.stringify(websocketsentContent))
    }else{
        waitSentSocketContent[websocketsentContent.purposeId] = JSON.stringify(websocketsentContent)
        console.log("websocket 未连接")
    }
}

//websocket server
function websocket(port) {
    var server = ws.createServer(function(connSocket){
        connSocketSer = connSocket;
        connSocket.on("text", function (str) {
            console.log("收到的vue请求信息:"+str)
            if(str == "ping"){
                connSocket.sendText("pong")
                return
            }
            //公共区域node不修改，java后台可修改      用户区域不放node,在vue
            var sendTextTemp = "";
            if(process.env.commonPara){
                var commonParaObj = JSON.parse(process.env.commonPara);
                if(commonParaObj[str]){
                    sendTextTemp = JSON.stringify(commonParaObj[str]);
                }else{
                    sendTextTemp = process.env.commonPara;
                }
            }
            sendTextTemp ?  connSocket.sendText(sendTextTemp) : ""
        })
        connSocket.on("close", function (code, reason) {
            console.log("关闭连接")
        });
        connSocket.on("error", function (code, reason) {
            console.log("异常关闭")
        });
        console.log("WebSocket建立完毕")
        //判断是否有待发送内容
        for(let key in waitSentSocketContent){
            connSocket.sendText(waitSentSocketContent[key])
        }
        waitSentSocketContent = {}
        return connSocket;
    }).listen(port)
    //console.log("==============",port)
}

function httpRequest(url) {
    if(!url){
        console.log("请求url不能为空")
        return
    }
    var options =
        {
            url: url,
            method: 'GET',
        };
    function callback(error, response, data) {
        try {
            console.log(data)
            return data;
        } catch (error) {
            console.log(error)
        }
    }
    request(options, callback);
}

//http-url封装
function httpAddressPackage (urlObj){
    var httpAddressPackageUrl = urlObj.httpType + "://" + urlObj.url;
    httpAddressPackageUrl += urlObj.port ? (":" + urlObj.port) : ""
    if(urlObj.serverName){
        httpAddressPackageUrl += urlObj.serverName
    }
    return httpAddressPackageUrl;
};

//请求转发数据解析
function reqForwardAnaly (hostSystemId){
    var nacosReqForwardStr = process.env.nacosReqForward;
    if(!nacosReqForwardStr){
        console.log("=== 请求转发地址没有配置 ===")
        return ""
    }
    var serverAddressList = JSON.parse(nacosReqForwardStr)
    if(serverAddressList && serverAddressList.length > 0){
        for (var serverAddressKey in serverAddressList){
            var serverAddressObj = serverAddressList[serverAddressKey];
            if(serverAddressObj.hostSystemId == hostSystemId){
                var returnObj = {};
                returnObj.paraSynAddress = httpAddressPackage(serverAddressObj);
                returnObj.hostSystemId = serverAddressObj.hostSystemId;
                return returnObj;
            }
        }
        console.log("=== 以下转发请求未配置： === " + hostSystemId)
        return "";
    }else{
        console.log("=== 请求转发地址没有配置 ===")
        return ""
    }
};
module.exports =  {
    httpAddressPackage,httpRequest,websocket,paraSynRes,secondSend,websocketsent,reqForwardAnaly
};
