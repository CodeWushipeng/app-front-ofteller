var request = require('../requestHandle.js');
var ws = require("nodejs-websocket");
var schedule = require('node-schedule');
var confProperties = require('../../resources/conf.properties');
var commonSocketUtil = require('./commonSocketUtil.js');
//import {NacosConfigClient} from 'nacos';   // ts
const NacosConfigClient = require('nacos').NacosConfigClient; // js
const NacosNamingClient = require('nacos').NacosNamingClient;

//websocket server  test commint
process.env.NODE_ENV ? "" : process.env.NODE_ENV = "development";
//console.log("===============",process.env.NODE_ENV)
commonSocketUtil.websocket(confProperties[process.env.NODE_ENV].websoket.port);

function nacosQeqForward(configClient){
    const promise = new Promise((resolve,reject) => {
        configClient.subscribe({
            dataId: 'ocsp-web-sample-commitfun-dev',
            group: 'WEB_PC',
        }, content => {
            console.log("nacos配置中心返回请求转发: " , JSON.stringify(content));
            var nacosConfigCenterParaObj = JSON.parse(content);
            Object.keys(nacosConfigCenterParaObj).forEach(function(key){
                var systemList = nacosConfigCenterParaObj[key];
                process.env.nacosReqForward = JSON.stringify(systemList)
            });
            resolve()
        });
    })
    return promise
}

function nacosGlobalPara(configClient){
    const promise = new Promise((resolve,reject) => {
        configClient.subscribe({
            dataId: 'ocsp-web-sample-globalpara-dev',
            group: 'WEB_PC',
        }, content => {
            console.log("nacos配置中心返回全局变量: " , JSON.stringify(content));
            var nacosConfigCenterParaObj = JSON.parse(content);
            Object.keys(nacosConfigCenterParaObj).forEach(function(key){
                var globalParaList = nacosConfigCenterParaObj[key];
                process.env[key] = nacosConfigCenterParaObj[key]
                console.log('全局变量：' + key + " = ", nacosConfigCenterParaObj[key])
            });
            resolve()
        });
    })
    return promise
}

//
function nacosCommonPara(router,configClient){
    const promise = new Promise((resolve,reject) => {
        configClient.subscribe({
            dataId: 'ocsp-web-form-dev',
            group: 'WEB_PC',
        }, content => {
            console.log("nacos配置中心返回公共参数: ", JSON.stringify(content));
            process.env.nacosConfigPara = content;
            var nacosConfigCenterParaObj = JSON.parse(content);
            //配置中心参数解析
            //系统
            Object.keys(nacosConfigCenterParaObj).forEach(function (key) {
                var systemList = nacosConfigCenterParaObj[key];
                for (var systemKey in systemList) {
                    var systemObj = systemList[systemKey];
                    var serverAddressList = systemObj.serverAddress;
                    for (var serverAddressKey in serverAddressList) {
                        var serverAddressObj = serverAddressList[serverAddressKey];
                        var paraSynAddress = commonSocketUtil.httpAddressPackage(serverAddressObj);
                        //是否需要同步数据
                        if (serverAddressObj.httpres && serverAddressObj.httpres == true && serverAddressObj.purposeId) {
                            //首次同步
                            commonSocketUtil.paraSynRes(paraSynAddress, serverAddressObj.purposeId, serverAddressObj.websocketsent)
                            if (serverAddressObj.sysupdatetime) {
                                //开启定时同步
                                commonSocketUtil.secondSend(serverAddressObj.sysupdatetime, paraSynAddress, serverAddressObj.purposeId, serverAddressObj.websocketsent)
                            }
                        } else if (serverAddressObj.websocketsent && serverAddressObj.websocketsent == true) {
                            commonSocketUtil.websocketsent(serverAddressObj, paraSynAddress)
                        }
                        //是否需要解析通讯数据
                        if (serverAddressObj.analysis && serverAddressObj.analysis == true && serverAddressObj.varname) {
                            process.env[serverAddressObj.varname] = paraSynAddress
                            router[serverAddressObj.varname] = paraSynAddress
                        }
                    }
                }
            });
            /*console.log("========================================================")
            console.log('flowDevelop', router.flowDevelop)
            console.log('formDevelop', router.formDevelop)
            console.log('menuDevelop', router.menuDevelop)
            console.log('requestRorward', router.requestRorward)
            console.log('route', router.routevalue)
            console.log('projectSubManage', router.projectSubManage)
            console.log('gatewayAddress', router.gatewayAddress)
            console.log("========================================================")*/
            resolve()
        });
    })
    return promise
}
//注册
async function nacosServiceDiscovery(){
    const logger = console;

    const client = new NacosNamingClient({
        logger,
        serverList: '192.168.2.179:31440', // replace to real nacos serverList
        namespace: 'public',
    });
    await client.ready();

    const serviceName = 'ocsp-form-business,ocsp-gateway-admin-business';

// registry instance
    await client.registerInstance(serviceName, {
        ip: '1.1.1.1',
        port: 8080,
    });
    await client.registerInstance(serviceName, {
        ip: '2.2.2.2',
        port: 8080,
    });

// subscribe instance
    client.subscribe(serviceName, hosts => {
        console.log(hosts);
    });

// deregister instance
    /*await client.deregisterInstance(serviceName, {
        ip: '1.1.1.1',
        port: 8080,
    });*/
}

//配置
function nacosConfigService(){
    const promise = new Promise((resolve,reject) => {
        // for direct mode
        const configClient = new NacosConfigClient({
            serverAddr: '192.168.2.179:30138',
        });
        resolve(configClient)
    })
    return promise
}

module.exports =
    async function nacosConfigCenterPara(router,cb) {
        //await nacosServiceDiscovery();
        const configClient = await nacosConfigService();
        await nacosGlobalPara(configClient);
        await nacosCommonPara(router,configClient);
        await nacosQeqForward(configClient);
        await cb()
    }

//配置中心
//nacosConfigCenterPara();











