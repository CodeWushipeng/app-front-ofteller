const defaultSettings = require("@/settings.js");
const urlPrefix = defaultSettings.debugStatus == true ? "/requestForward" : "";
import request from "@/utils/request";

//创建个人客户信息
export function fetchCreatePersonCust(data) {
  return request({
    url: urlPrefix + "/createPersonCust",
    method: "post",
    data
  });
}

// //创建个人客户基础信息
// export function addPerCustBasicInfo(data) {
//   return request({
//     url: urlPrefix + "/addPerCustBasicInfo",
//     method: "post",
//     data
//   });
// }

//修改个人客户信息
export function fetchUpdatePersonCust(data) {
  return request({
    url: urlPrefix + "/updatePersonCust",
    method: "post",
    data
  });
}

//查询个人客户基础信息
export function fetchSelectPersonCustBasicInfo(data) {
  return request({
    url: urlPrefix + "/selectPersonCustBasicInfo",
    method: "post",
    data
  });
}
//查询客户信息
export function selectPersonCustInfo(data) {
  return request({
    url: "/customer/selectPersonCust",
    method: "post",
    data
  });
}
// 查询客户证件
export function fetchSelectCustCertificateInfo(data) {
  return request({
    url: urlPrefix + "/selectCustCertificateInfo",
    method: "post",
    data
  });
}
// 查询客户交易信息列表
export function selectPartyFinAccountTransList(data) {
  return request({
    url: urlPrefix + "/selectPartyFinAccountTransList",
    method: "post",
    data
  });
}
// 查询客户账户信息列表
export function selectCustAccountList(data) {
  return request({
    url: urlPrefix + "/selectCustAccountList",
    method: "post",
    data
  });
}
// 查询客户产品
export function selectProductPartyRoleList(data) {
  return request({
    url: urlPrefix + "/selectProductPartyRoleList",
    method: "post",
    data
  });
}
// // 查询客户账户信息详情
// export function selectCustAccount(data) {
//   return request({
//     url: urlPrefix + "/selectCustAccount",
//     method: "post",
//     data
//   });
// }

// 账户综合查询账户综合信息二级选项卡接口
export function selectPartyFinAccountList(data) {
  return request({
    url: urlPrefix + "/selectPartyFinAccountList",
    method: "post",
    data
  });
}

// 个人客户识别
export function fetchSelectPersonCustDiscernInfo(data) {
  return request({
    url: urlPrefix + "/selectPersonCustDiscernInfo",
    method: "post",
    data
  });
}

//客户证件信息查询
export function fetchCheckCertificateIsExistAccout(data) {
  return request({
    url: urlPrefix + "/selectCustCertificateListByCondition",
    method: "post",
    data
  });
}

//查询客户家庭基本信息
export function fetchSelectCustFamilyInfo(data) {
  return request({
    url: urlPrefix + "/selectCustFamilyInfo",
    method: "post",
    data
  });
}

//新增客户家庭基本信息
export function fetchAddCustFamilyInfo(data) {
  return request({
    url: urlPrefix + "/addCustFamilyInfo",
    method: "post",
    data
  });
}

//修改客户家庭基本信息
export function fetchUpdateCustFamilyInfo(data) {
  return request({
    url: urlPrefix + "/updateCustFamilyInfo",
    method: "post",
    data
  });
}

//查询联系方式信息
export function fetchSelectCustContactIinformation(data) {
  return request({
    url: urlPrefix + "/selectCustContactIinformation",
    method: "post",
    data
  });
}

//查询联系地址信息列表
export function fetchSelectCustAddressList(data) {
  return request({
    url: urlPrefix + "/selectCustAddressList",
    method: "post",
    data
  });
}

//查询工作单位信息
export function fetchSelectCustResumeInformation(data) {
  return request({
    url: urlPrefix + "/selectCustResumeInformation",
    method: "post",
    data
  });
}
//查询签约信息
export function fetchQueryBpPerCompreAgreementInfo(data) {
  return request({
    url: urlPrefix + "/queryBpPerCompreAgreementInfo",
    method: "post",
    data
  });
}
// 查询产品签约信息列表
// export function fetchSelectBpAgreementResumeList(data) {
//   return request({
//     url: urlPrefix + "/selectBpAgreementResumeList",
//     method: "post",
//     data
//   });
// }
// 产品签约新增
export function fetchCreateBpPerCompreAgreementInfo(data) {
  return request({
    url: urlPrefix + "/createBpPerCompreAgreementInfo",
    method: "post",
    data
  });
}
// 对私签约修改
export function fetchUpdateBpPerCompreAgreementInfo(data) {
  return request({
    url: urlPrefix + "/updateBpPerCompreAgreementInfo",
    method: "post",
    data
  });
}

// 对私签约解约
export function fetchCancelBpPerCompreAgreementInfo(data) {
  return request({
    url: urlPrefix + "/cancelBpPerCompreAgreementInfo",
    method: "post",
    data
  });
}

// //创建企业客户
// export function fetchOpenPartyGroupCust(data) {
//   return request({
//     url: urlPrefix + '/openPartyGroupCust',
//     method: 'post',
//     data
//   })
// }

// 对公签约登记
export function fetchCreateBpGroupCompreAgreementInfo(data) {
  return request({
    url: urlPrefix + "/createBpGroupCompreAgreementInfo",
    method: "post",
    data
  });
}
// 对公签约修改
export function fetchUpdateBpGroupCompreAgreementInfo(data) {
  return request({
    url: urlPrefix + "/updateBpGroupCompreAgreementInfo",
    method: "post",
    data
  });
}
// 对公签约查询
export function fetchQueryBpGroupCompreAgreementInfo(data) {
  return request({
    url: urlPrefix + "/queryBpGroupCompreAgreementInfo",
    method: "post",
    data
  });
}
// 对公签约解约
export function fetchCancelBpGroupCompreAgreementInfo(data) {
  return request({
    url: urlPrefix + "/cancelBpGroupCompreAgreementInfo",
    method: "post",
    data
  });
}

//修改企业客户
export function fetchUpdatePartyGroupCust(data) {
  return request({
    url: urlPrefix + "/updatePartyGroupCust",
    method: "post",
    data
  });
}

//查询企业客户基本信息
export function fetchSelectPartyGroupCust(data) {
  return request({
    url: urlPrefix + "/selectPartyGroupCust",
    method: "post",
    data
  });
}

//企业客户识别
export function fetchSelectCompCustDiscernInfo(data) {
  return request({
    url: urlPrefix + "/selectCompCustDiscernInfo",
    method: "post",
    data
  });
}
