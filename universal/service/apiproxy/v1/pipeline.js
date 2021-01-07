var request = require('../../../util/requestHandle.js');
var baseConfig = require('../../../config/baseConfig.json');
var handleRes = require('../../../util/temp/v1/handleResUtil.js');
var uri = process.env.API_URL || baseConfig.aggregator;

module.exports = function attachHandlers(router, io) {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    //nacos配置中心配置公共参数       
    router.post('/v1/comconfig/update',
        function (req, res) {
            console.log("修改内容：" , req.query)


            process.env.commonPara = req.query.updatemess;
            res.send({
                "statusCode": 200,
                "message": 'update is ok',
            })
        });
    //demo
    router.get('/v1/demo',
        function (req, res) {
            var query = req.query;
            res.send({
                "statusCode": 200,
                "message": 'it is ok',
            })
        });
    //获取所有package
    router.get('/v1/endpoint/list',
        function (req, res) {
            var query = req.query;
            var cursor = query.cursor;
            var count = query.count;
            var pattern = query.pattern;
            var url;
            if(pattern){
                // 搜索(限制最多返回50条)
                url = `/packages?pattern=${'*'+pattern+'*'}&count=50`;
            }else{
                // 列表
                url = `/packages?cursor=${cursor}&count=${count}`
            }

            var options =
                {
                    url: uri + url,
                    method: 'GET'
                };
            function callback(error, response, data) {
                res.send(handleRes.handleRes(error, response, data));

            }
            request(options, callback);

        });

    //创建pipeLine(提交conditions)
    router.post('/v1/pipeLine/create/:id',
        function (req, res) {
            var ename = encodeURI(req.params.id);
            var options =
                {
                    url: uri + `/endpoints/${ename}/conditions`,
                    method: 'POST',
                    json: true,
                    body: req.body
                };
            console.log(options.url);
            function callback(error, response, data) {
                res.send(handleRes.handleRes(error, response, data));
            }

            request(options, callback);
        });

    //修改单个pipeLine
    router.put('/v1/pipeLine/update/:id',
        function (req, res) {
            var ename = encodeURI(req.params.id);
            var cname = encodeURI(req.body.cname);
            var options =
                {
                    url: uri + `/endpoints/${ename}/conditions/${cname}`,
                    method: 'PUT',
                    json: true,
                    body: req.body
                };

            function callback(error, response, data) {
                res.send(handleRes.handleRes(error, response, data));
            }

            request(options, callback);
        });

    //删除指定pipeLine
    router.delete('/v1/pipeLine/delete',
        function(req, res) {
            var ename = encodeURI(req.query.ename);
            var cname = encodeURI(req.query.cname);
            var id=encodeURI(req.params.id);
            var options =
                {
                    url: uri + `/endpoints/${ename}/conditions/${cname}`,
                    method: 'DELETE'
                };
            function callback(error, response, data) {
                res.send(handleRes.handleRes(error, response, data));
            }

            request(options, callback);

        });
};
