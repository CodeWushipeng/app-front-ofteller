const defaultSettings = require("@/settings.js");
const urlPrefix = defaultSettings.debugStatus == true ? "/requestForward" : "login";
import request from "@/utils/request";
// Certificate

// 验证方式查询
export function queryTellerVerifyWays(data){
  return request({
    url: urlPrefix + "/queryTellerVerifyWays",
    method: "post",
    data
  });
}
// 查询柜员信息
export function queryUserByIdExt(data){
  return request({
    url: urlPrefix + "/queryUserByIdExt",
    method: "post",
    data
  });
}
// 根据机构号查询法人信息
export function queryLegalPersonByOrgIdExt(data) {
  return request({
    url: urlPrefix + "/queryLegalPersonByOrgIdExt",
    method: "post",
    data
  });
}

//柜员登录
export function fetchlogin(data) {
  return request({
    url: urlPrefix + "/tellerLogin",
    method: "post",
    data
  });
}

// 查询机构详细信息
export function queryOrgInfo(){
  return request({
    url: urlPrefix + "/queryOrgById",
    method: "post",
    data
  });
}

//柜员信息详情
export function queryTellerInfo(data) {
  return request({
    url: urlPrefix + "/queryUserByIdExt",
    method: "post",
    data
  });
}

// 柜员签到（修改柜员状态）
export function modifyTeller(data){
  return request({
    url: urlPrefix + "/modifyTeller",
    method: "post",
    data
  });
}


//柜员修改密码
export function fetchemployeeChangePassword(data) {
  return request({
    url: urlPrefix + "/modifyPwd",
    method: "post",
    data
  });
}

//查询机构详细信息
export function fetchqueryPartyDetailedInfo(data) {
  return request({
    url: urlPrefix + "/queryPartyDetailedInfo",
    method: "post",
    data
  });
}

//柜员登出
export function fetchlogout(data) {
  return request({
    url: urlPrefix + "/logout",
    method: "post",
    data
  });
}