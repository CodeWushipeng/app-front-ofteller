const defaultSettings = require('@/settings.js')
const urlPrefix = defaultSettings.debugStatus == true ? "/requestForward" : '/order';
import request from "@/utils/request";

// 销售订单
export function processOrderPFExt(data) {
  return request({
    url: urlPrefix + '/processOrderPFExt',
    method: 'post',
    data
  });
}

// 查询订单列表
export function queryOrderList(data) {
  return request({
    url: urlPrefix + '/queryOrderList',
    method: 'post',
    data
  });
}

// 查询订单详情
export function queryOrderBasicInfo(data) {
  return request({
    url: urlPrefix + '/queryOrderBasicInfo',
    method: 'post',
    data
  })
}

// 查询支付工具
export function searchPaymentMethod(data) {
  return request({
    url: urlPrefix + '/searchPaymentMethod',
    method: 'post',
    data
  })
}

// 利率试算
export function CalRate(data) {
  return request({
    url: urlPrefix + '/CalRate',
    method: 'post',
    data
  })
}

// 费用试算
export function CalFee(data) {
  return request({
    url: urlPrefix + '/CalFee',
    method: 'post',
    data
  })
}


