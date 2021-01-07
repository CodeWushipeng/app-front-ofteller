const defaultSettings = require("@/settings.js");
const urlPrefix =
  defaultSettings.debugStatus == true ? "/requestForward" : "distinguish";
import request from "@/utils/request";

// 识别类型
function queryDiscernType (data){
  return request({
    url: urlPrefix + "/selectPartyDiscernType",
    data,
    method: "post"
  });
}

// 用户识别
function queryDiscernInfo(data) {
  return request({
    url: urlPrefix + "/selectPartyDiscernInfo",
    data,
    method: "post"
  });
}

// 提交识别
function referDiscernInfo(data) {
  return request({
    url: urlPrefix + "/selectPersonCustDiscernInfo",
    data,
    method: "post"
  });
}

// 客户信息
function queryClientInfo(data) {
  return request({
    url: urlPrefix + "/selectPersonCust",
    data,
    method: "post"
  });
}

// 客户信息-维护
function updateClientInfo(data) {
  return request({
    url: urlPrefix + "/updatePersonCust",
    data,
    method: "post"
  });
}

// 个人税收居民身份信息 
function queryClientBasicInfo(data) {
  return request({
    url: urlPrefix + "/selectPersonCustBasicInfo",
    data,
    method: "post"
  });
}

// 个人税收居民身份信息-维护
function updateClientBasicInfo(data) {
  return request({
    url: urlPrefix + "/updatePerCustBasicInfo",
    data,
    method: "post"
  });
}

// 客户家庭信息
function queryClientFamilyInfo(data) {
  return request({
    url: urlPrefix + "/selectCustFamilyInfo",
    data,
    method: "post"
  });
}

// 客户偏好信息
function queryClientPreference(data) {
  return request({
    url: urlPrefix + "/selectCustProductPreference",
    data,
    method: "post"
  });
}

// 家庭关系人基础信息
function queryClientFamilyMemberInfoList(data) {
  return request({
    url: urlPrefix + "/selectCustFamilyMemberInfoList",
    data,
    method: "post"
  });
}

// 家庭关系人基础信息-新增
function addClientFamilyMemberInfo(data) {
  return request({
    url: urlPrefix + "/addCustFamilyMemberInfo",
    data,
    method: "post"
  });
}

// 家庭关系人基础信息-更新
function updateClientFamilyMemberInfo(data) {
  return request({
    url: urlPrefix + "/updateCustFamilyMemberInfo",
    data,
    method: "post"
  });
}

// 工作单位信息
function queryClientResumeInformation(data) {
  return request({
    url: urlPrefix + "/selectCustResumeInformation",
    data,
    method: "post"
  });
}

// 客户其他信息
function queryClientContactInfo(data) {
  return request({
    url: urlPrefix + "/selectCustContactIinformation",
    data,
    method: "post"
  });
}

// 账户列表
function queryClientAccountList(data) {
  return request({
    url: urlPrefix + "/selectCustAccountList",
    data,
    method: "post"
  });
}


export {
  queryDiscernType,
  queryDiscernInfo,
  referDiscernInfo,
  queryClientInfo,
  updateClientInfo,
  queryClientBasicInfo,
  updateClientBasicInfo,
  queryClientFamilyInfo,
  queryClientPreference,
  queryClientFamilyMemberInfoList,
  addClientFamilyMemberInfo,
  updateClientFamilyMemberInfo,
  queryClientResumeInformation,
  queryClientContactInfo,
  queryClientAccountList
};