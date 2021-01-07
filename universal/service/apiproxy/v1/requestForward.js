var request = require('../../../util/requestHandle.js');
//  var syncRequest = require('sync-request');
var handleRes = require('../../../util/temp/v1/handleResUtil.js');
var commonSocketUtil = require('../../../util/paraSynUtil/commonSocketUtil.js');
var baseConfig = require('../../../config/baseConfig.json');
var gatewayAddress = process.env.gatewayAddress //"http://192.168.2.120:32125";
var WNToken = baseConfig.WNToken;

//get 请求地址封装
function objToGetPara(param, key) {
    var paramStr = ""
    if(typeof(param)=='string' ||param instanceof String||param instanceof Number||param instanceof Boolean){
        paramStr+="&"+key+"="+encodeURIComponent(param);
    }else{
        Object.keys(param).forEach(function(i){
            var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
            paramStr+='&'+objToGetPara(param[k], k);
        })
    }
    return paramStr.substr(1);
}
//扩展函数请求解析
function toRequestForward(req, serveKey) {
    const promise =  new Promise((resolve,reject)=>{
        //获取请求转发扩展函数
        var paraObj = new Object()
        paraObj = Object.assign({}, { header: {...req.header,pageIndex:1} , body: { frontServiceName : serveKey } })
        var options = {
            headers: {
                token: WNToken
            },
            url: process.env.requestRorward,
            method: 'POST',
            json: true,
            body: paraObj
        };
        function callback(error, response, data) {
            handleRes.handleRes(error, response, data)
            console.log("扩展函数请求解析返回数据 ",data)
            if(data &&  data.header && data.header.rspCode == "SP000000"){
                if(data.body.length > 0){
                    try {
                        let oldbody = req;
                        let rs = null;
                        if(data.body && data.body[0].inForwardFun){
                            var main = data.body[0].inForwardFun;
                            const resCode = `function _execute(oldbody){  ${main}  return main(...arguments);}`;
                            console.log('resCode',resCode)
                            const exeCode = eval("(" + resCode + ")");
                            rs = exeCode(oldbody);
                            console.log('rs post：=============== ',rs)
                        }else{
                            rs = oldbody
                        }
                        rs.forwardTemp = data.body[0]
                        resolve(rs);
                    } catch (error) {
                        console.log('===inputConfigJs===',error)
                        throw new Error(error)
                        resolve("")
                    }
                }else{
                    resolve("")
                }
            }else{
                resolve("")
            }
        }

        request(options, callback);
    })
    return promise;
}

//to转发请求
function toRequestForwardEnd(toRequestForwardData ,reqForwardAnaly ,res){
    //to转发请求
    var url = reqForwardAnaly.paraSynAddress + toRequestForwardData.forwardTemp.targetServiceName
    const httpTypeOptions = { "1":"GET","2":"POST","3":"PUT", "4":"DELETE"}
    const httpTypeIndex=  toRequestForwardData.forwardTemp.httpType;
    const httpType = httpTypeOptions[httpTypeIndex] || 'httpType is error';

    var paraObj = new Object()
    let outForwardFun = toRequestForwardData.forwardTemp.outForwardFun
    delete toRequestForwardData.forwardTemp
    paraObj = toRequestForwardData
    var options = {
        headers: {
            token: WNToken
        },
        url: url,
        method: httpType,
        json: true,
        body: paraObj
    };
    function callback(error, response, data) {
        res.send(handleRes.handleRes(error, response, data ,outForwardFun));
    }
    request(options, callback);
}

async function doCall(req,res) {
    //地址解析   分系统（nacos配置）   接口（数据库扩展函数查询）
    var serveKey = ((req.url).split("requestForward/"))[1];
    if (serveKey) {
        let toRequestForwardData = await toRequestForward(req.body, serveKey)
        if (toRequestForwardData) {
            let reqForwardAnaly = commonSocketUtil.reqForwardAnaly(toRequestForwardData.forwardTemp.hostSystemId)
            if (reqForwardAnaly) {
                toRequestForwardEnd(toRequestForwardData, reqForwardAnaly, res)
            }else {
                res.send({"statusCode": "1", "message": "nacose没有匹配到主机数据"});
            }
        } else {
            res.send({"statusCode": "1", "message": "请求服务没有匹配到数据或服务异常"});
        }
    } else {
        res.send({"statusCode": "1", "message": "请求服务不能为空"});
    }
}


module.exports = function attachHandlers(router, io) {
    router.get('/requestForward/*',
        function (req, res) {
            var oldbody = req.query;
            var main = `function main(oldbody) {
                            var newbody = new Object() 
                            //newbody = Object.assign({}, { newbody : oldbody })
                            newbody.name = oldbody.sex
                            newbody.sex = oldbody.name
                            newbody.para = oldbody.para
                            newbody.para1 = oldbody.para1
                            return newbody
                        }`;
            const resCode = `function _execute(oldbody){  ${main}  return main(...arguments);}`;
            console.log('resCode',resCode)
            const exeCode = eval("(" + resCode + ")");
            console.log("req.query:"+oldbody)
            let rs = exeCode(oldbody);
            console.log('rs get：=============== ',rs)
            var url = "http://localhost:8082/api/mockComTest.js";
            var paras =  objToGetPara(rs);
            if(paras){
                url = url + "?" + paras;
            }
            var options =
                {
                    url: url,
                    method: 'GET'
                };
            function callback(error, response, data) {
                res.send(handleRes.handleRes(error, response, data));
            }
            request(options, callback);

        });
    router.post('/requestForward/*',
        function (req, res) {
            if(process.env.gatewayForward == true || process.env.gatewayForward == "true"){
                var options = {
                    headers: {
                        token: WNToken,
                    },
                    url: gatewayAddress + req.url.replace("/requestForward", ""),
                    method: 'POST',
                    json: true,
                    body: req.body,
                };
                function callback(error, response, data) {
                    res.send(handleRes.handleRes(error, response, data));
                }
                request(options, callback);
            }else{
                //临时
                doCall(req, res)
            }
        });
    router.put('/requestForward/*',
        function (req, res) {
            doCall(req, res)
        });
    router.delete('/requestForward/*',
        function (req, res) {
            doCall(req, res)
        });
};
