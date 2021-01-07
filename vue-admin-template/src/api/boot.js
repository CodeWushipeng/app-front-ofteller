const defaultSettings = require("@/settings.js");
const urlPrefix = defaultSettings.debugStatus == true ? "/requestForward" : "";
import request from "@/utils/request";

// 根据机构查对应facility
export function findFacilityFromPartyId(data) {
  return request({
    url: urlPrefix+"/findFacilityFromPartyId",
    data,
    method: "post"
  });
}

// 尾箱限额
export function setTillLimit(data) {
  return request({
    url: urlPrefix+"/setTillLimit",
    data,
    method: "post"
  });
}

// 查询柜员尾箱
export function queryTellerBox(data) {
  return request({
    url: urlPrefix+"/queryTellerBox",
    data,
    method: "post"
  });
}

// 尾箱限额查询
export function queryTillLimit(data) {
  return request({
    url: urlPrefix+"/queryTillLimit",
    data,
    method: "post"
  });
}

// 尾箱限额删除
export function deleteTillLimit(data) {
  return request({
    url: urlPrefix+"/deleteTillLimit",
    data,
    method: "post"
  });
}

// 根据柜员号查尾箱号
export function getTillNoByTeller(data) {
  return request({
    url: urlPrefix+"/getTillNoByTeller",
    data,
    method: "post"
  });
}

// 通过上级机构查询所有下级机构
export function getAllChildPartyId(data) {
  return request({
    url: urlPrefix+"/getAllChildPartyId",
    data,
    method: "post"
  });
}

// 尾箱生成
export function createTill(data) {
  return request({
    url: urlPrefix+"/createTill",
    data,
    method: "post"
  });
}

// 尾箱维护
export function processTill(data) {
  return request({
    url: urlPrefix+"/processTill",
    data,
    method: "post"
  });
}
// 尾箱状态修改
export function updateTillstatus(data) {
  return request({
    url: urlPrefix+"/updateTillstatus",
    data,
    method: "post"
  });
}
// 尾箱修改
export function updateTill(data) {
  return request({
    url: urlPrefix+"/updateTill",
    data,
    method: "post"
  });
}
// 创建柜员尾箱
export function createTillBase(data) {
  return request({
    url: urlPrefix+"/createTillBase",
    data,
    method: "post"
  });
}
// 尾箱领用
export function issueTill(data) {
  return request({
    url: urlPrefix+"/boot/issueTill",
    data,
    method: "post"
  });
}
// 凭证尾箱库存查询
export function queryTillForOrgNO(data) {
  return request({
    url: urlPrefix+"/boot/queryTillForOrgNO",
    data,
    method: "post"
  });
}

// 尾箱凭证库存明细查询
export function queryTillVchrListDetail(data) {
  return request({
    url: urlPrefix+"/queryTillVchrListDetail",
    data,
    method: "post"
  });
}
// 凭证尾箱数量查询
export function queryTillVchrNum(data) {
  return request({
    url: urlPrefix+"/queryTillVchrNum",
    data,
    method: "post"
  });
}
// 现金尾箱库存查询
export function queryTillCashNum(data) {
  return request({
    url: urlPrefix+"/queryTillCashNum",
    data,
    method: "post"
  });
}
// 尾箱删除
export function deleteTill(data) {
  return request({
    url: urlPrefix+"/deleteTill",
    data,
    method: "post"
  });
}
// 现金碰库
export function checkCashStock(data) {
  return request({
    url: urlPrefix+"/checkCashStock",
    data,
    method: "post"
  });
}
// 凭证碰库 查库
export function checkVoucherStock(data) {
  return request({
    url: urlPrefix+"/checkVoucherStock",
    data,
    method: "post"
  });
}
// 凭证碰库 碰库
export function checkVoucherStocks(data) {
  return request({
    url: urlPrefix+"/checkVoucherStocks",
    data,
    method: "post"
  });
}
// 假币碰库
export function checkFalseCoinStock(data) {
  return request({
    url: urlPrefix+"/checkFalseCoinStock",
    data,
    method: "post"
  });
}
// 券别明细保存
export function createDenominDetailed(data) {
  return request({
    url: urlPrefix+"/createDenominDetailed",
    data,
    method: "post"
  });
}
// 尾箱碰库
export function checkTillStock(data) {
  return request({
    url: urlPrefix+"/checkTillStock",
    data,
    method: "post"
  });
}
// 尾箱删除
export function testfive(data) {
  return request({
    url: urlPrefix+"/testfive",
    data,
    method: "post"
  });
}
// 尾箱查库
export function chkTill(data) {
  return request({
    url: urlPrefix+"/boot/chkTill",
    data,
    method: "post"
  });
}
// 查询查库记录
export function queryChkTill(data) {
  return request({
    url: urlPrefix+"/queryChkTill",
    data,
    method: "post"
  });
}
// 查询查库明细
export function queryChkTillDetail(data) {
  return request({
    url: urlPrefix+"/queryChkTillDetail",
    data,
    method: "post"
  });
}
// 创建凭证碰库明细记录
export function creatVchrTillRecordDetail(data) {
  return request({
    url: urlPrefix+"/creatVchrTillRecordDetail",
    data,
    method: "post"
  });
}
// 创建现金碰库明细记录
export function creatCashTillRecordDetail(data) {
  return request({
    url: urlPrefix+"/creatCashTillRecordDetail",
    data,
    method: "post"
  });
}
// 创建碰库记录和明细
export function creatTillRordAndDetail(data) {
  return request({
    url: urlPrefix+"/creatTillRordAndDetail",
    data,
    method: "post"
  });
}
// 创建碰库记录
export function creatTillRecord(data) {
  return request({
    url: urlPrefix+"/creatTillRecord",
    data,
    method: "post"
  });
}
// 查询有效碰库记录
export function queryEffectTillRecord(data) {
  return request({
    url: urlPrefix+"/queryEffectTillRecord",
    data,
    method: "post"
  });
}
// 尾箱移交
export function turnOverTill(data) {
  return request({
    url: urlPrefix+"/turnOverTill",
    data,
    method: "post"
  });
}
// 柜员签退检查
export function logoutCheckForTeller(data) {
  return request({
    url: urlPrefix+"/logoutCheckForTeller",
    data,
    method: "post"
  });
}
// 机构签退检查
export function logoutCheckForBranch(data) {
  return request({
    url: urlPrefix+"/logoutCheckForBranch",
    data,
    method: "post"
  });
}
// 柜员签退限额检查
export function limitSearch(data) {
  return request({
    url: urlPrefix+"/limitSearch",
    data,
    method: "post"
  });
}
// 机构金库尾箱余额检查报警
export function limitOrgTill(data) {
  return request({
    url: urlPrefix+"/limitOrgTill",
    data,
    method: "post"
  });
}
// 查询柜员姓名
export function queryTelName(data) {
  return request({
    url: urlPrefix+"/queryTelName",
    data,
    method: "post"
  });
}
// 查询尾箱类型与标志
export function queryTillType(data) {
  return request({
    url: urlPrefix+"/queryTillType",
    data,
    method: "post"
  });
}
// 自助设备关联尾箱
export function equipmentRelevanceTill(data) {
  return request({
    url: urlPrefix+"/equipmentRelevanceTill",
    data,
    method: "post"
  });
}
// 机构状态变更
export function orgStatusUpdate(data) {
  return request({
    url: urlPrefix+"/orgStatusUpdate",
    data,
    method: "post"
  });
}
// 自助设备取消尾箱关联
export function equipmentTillRelease(data) {
  return request({
    url: urlPrefix+"/equipmentTillRelease",
    data,
    method: "post"
  });
}
// 查询尾箱分配/上缴明细
export function queryIssueTill(data) {
  return request({
    url: urlPrefix+"/queryIssueTill",
    data,
    method: "post"
  });
}
// 登记尾箱分配/上缴明细
export function insertFacilityItem(data) {
  return request({
    url: urlPrefix+"/insertFacilityItem",
    data,
    method: "post"
  });
}

// 查询凭证种类枚举值
export function getEnumsByEnumTypeId(data) {
  return request({
    url: urlPrefix+"/getEnumsByEnumTypeId",
    data,
    method: "post"
  });
}
