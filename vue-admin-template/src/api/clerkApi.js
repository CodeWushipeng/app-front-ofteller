const defaultSettings = require("@/settings.js");
const urlPrefix = defaultSettings.debugStatus == true ? "/requestForward" : "";
import request from "@/utils/request";

// 领用柜员密码验证
function tellerLogin(data) {
  return request({
    url: urlPrefix + "/tellerLogin",
    data,
    method: "post"
  });
}

// 尾箱编号验证
function queryTellerByOrgAndTillNo(data) {
  return request({
    url: urlPrefix + "/queryTellerByOrgAndTillNo",
    data,
    method: "post"
  });
}

// 凭证种类查询
function getEnumsByEnumTypeId(data) {
  return request({
    url: urlPrefix + "/getEnumsByEnumTypeId",
    data,
    method: "post"
  });
}

// 凭证尾箱查询
function queryTellerBox(data) {
  return request({
    url: urlPrefix + "/queryTellerBox",
    data,
    method: "post"
  });
}

// 机构签到
function modifyOrgOperatingStatusExt(data) {
  return request({
    url: urlPrefix + "/modifyOrgOperatingStatusExt",
    data,
    method: "post"
  });
}

// 机构签退-平衡检查
function logoutCheckForBranch(data) {
  return request({
    url: urlPrefix + "/logoutCheckForBranch",
    data,
    method: "post"
  });
}

// 机构签退-签退
// function modifyOrgOperatingStatusExt(data) {
//   return request({
//     url: urlPrefix + "/modifyOrgOperatingStatusExt",
//     data,
//     method: "post"
//   });
// }

// 查询主管下属柜员
function queryUserListByOrgIdExt(data) {
  return request({
    url: urlPrefix + "/queryUserListByOrgIdExt",
    data,
    method: "post"
  });
}

// 柜员签到签退
function modifyUserSignStatusEx(data) {
  return request({
    url: urlPrefix + "/modifyUserSignStatusEx",
    data,
    method: "post"
  });
}

// 日终尾箱碰库-查尾箱编号
// function queryTellerBox(data) {
//   return request({
//     url: urlPrefix + "/queryTellerBox",
//     data,
//     method: "post"
//   });
// }

// 日终尾箱碰库-尾箱碰库
function checkTillStock(data) {
  return request({
    url: urlPrefix + "/checkTillStock",
    data,
    method: "post"
  });
}

// 日终尾箱上缴
function issueTill(data) {
  return request({
    url: urlPrefix + "/issueTill",
    data,
    method: "post"
  });
}

// 流水勾兑-总勾兑
function autoCheckServiceSerialNumber(data) {
  return request({
    url: urlPrefix + "/autoCheckServiceSerialNumber",
    data,
    method: "post"
  });
}

// 流水勾兑-交易明细
function findServiceSerialNumber(data) {
  return request({
    url: urlPrefix + "/findServiceSerialNumber",
    data,
    method: "post"
  });
}

// 流水勾兑-勾兑明细
function setSerialNumberMatchStatus(data) {
  return request({
    url: urlPrefix + "/setSerialNumberMatchStatus",
    data,
    method: "post"
  });
}


export {
  tellerLogin,
  queryTellerByOrgAndTillNo,
  getEnumsByEnumTypeId,
  queryTellerBox,
  modifyOrgOperatingStatusExt,
  logoutCheckForBranch,
  queryUserListByOrgIdExt,
  modifyUserSignStatusEx,
  checkTillStock,
  issueTill,
  autoCheckServiceSerialNumber,
  findServiceSerialNumber,
  setSerialNumberMatchStatus
};