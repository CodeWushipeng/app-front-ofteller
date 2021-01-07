var request = require('../../../util/requestHandle.js');
// var syncRequest = require('sync-request');
var handleRes = require('../../../util/temp/v1/handleResUtil.js');
var commonSocketUtil = require('../../../util/paraSynUtil/commonSocketUtil.js');
var baseConfig = require('../../../config/baseConfig.json');
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
                        var oldbody = req.body;
                        var rs = null;
                        if(data.body && data.body.length > 0 && data.body[0].forwardFun){
                            var main = data.body[0].forwardFun;
                            const resCode = `function _execute(oldbody){  ${main}  return main(...arguments);}`;
                            console.log('resCode',resCode)
                            const exeCode = eval("(" + resCode + ")");
                            rs = exeCode(oldbody);
                            console.log('rs post：=============== ',rs)
                        }else{
                            rs = oldbody
                        }
                        data.body.newbody = rs;
                        resolve(data);
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

    var url = reqForwardAnaly.paraSynAddress + toRequestForwardData.body[0].targetServiceName
    var httpType = toRequestForwardData.body[0].httpType == 2 ? "POST" : "GET"
    var paraObj = new Object()
    paraObj = Object.assign({}, { header: toRequestForwardData.header , body: toRequestForwardData.body.newbody })
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
        res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
}

module.exports = function attachHandlers(router, io) {
    router.get('/requestForward1/*',
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
    router.post('/requestForward1/*',
        function (req, res) {
            //地址解析   分系统（nacos配置）   接口（数据库扩展函数查询）
            var serveKey = ((req.url).split("requestForward/"))[1]
            if(serveKey){
                toRequestForward(req.body, serveKey ).then(toRequestForwardData => {
                    var reqForwardAnaly = "";
                    if(!toRequestForwardData){
                        res.send({ "statusCode": "1", "message": "请求服务没有匹配到数据或服务异常" });
                        return;
                    }else{
                        reqForwardAnaly = commonSocketUtil.reqForwardAnaly(toRequestForwardData.body[0].hostSystemId)
                        if(!reqForwardAnaly){
                            res.send({ "statusCode": "1", "message": "nacose没有匹配到主机数据" });
                            return;
                        }
                        toRequestForwardData.header = req.body.header
                    }
                    toRequestForwardEnd(toRequestForwardData ,reqForwardAnaly ,res )
                })
            }else{
                res.send({ "statusCode": "1", "message": "请求服务不能为空" });
            }

        });
};
