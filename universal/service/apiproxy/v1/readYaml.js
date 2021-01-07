var request = require('../../../util/requestHandle.js');
var baseConfig = require('../../../config/baseConfig.json');
var handleRes = require('../../../util/temp/v1/handleResUtil.js');
var uri = process.env.API_URL || baseConfig.aggregator;

var yamml=require('node-yaml');
var fs=require('fs');
var multipart = require('connect-multiparty');
var DIR = './uploadFiles/apiproxy';
var multipartMiddleware = multipart({uploadDir:DIR});
module.exports = function attachHandlers(router,io) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    //获取所有读取yaml文件信息
    router.post('/v1/readYaml',multipartMiddleware,
        function(req, res) {
        try {
            var yamlJson=yamml.readSync("../../../"+req.files.files.path);
            //读取完成后删除文件
            fs.unlinkSync("./"+req.files.files.path);
            res.send({"statusCode":200,"code":'000',"message":"success","data":yamlJson});
        }catch (e) {
            res.send({"statusCode":500,"code":'001',"message":"提交异常","data":e});
        }

        });

    // 给控件返回一个空文件
    router.get('/v1/yamlJson/demo',
        function (req, res) {
            try {
                res.send(
                    {
                        body: {},
                        obj:{},
                        header: {
                            "content-type": "application/json"
                        },
                        ok: true,
                        status: 200,
                        statusText: "OK",
                        text:"",
                        data: "",
                        url:"/v1/yamlJson/demo"
                    }
                );
            }catch (e) {
                res.send({"statusCode":500,"code":'001',"message":"一个要编辑的空文件","data":e});
            }

        });

};
