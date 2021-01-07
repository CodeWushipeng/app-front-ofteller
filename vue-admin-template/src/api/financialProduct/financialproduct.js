const defaultSettings = require('@/settings.js')
const urlPrefix = defaultSettings.debugStatus == true ? "/requestForward" : '';
import request from "@/utils/request";

// 查询产品
export function queryCatalogTreeForChannelOrg(data) {
  return request({
    url: urlPrefix + '/queryCatalogTreeForChannelOrg',
    method: 'post',
    data
  });
}

export function queryProdListForCategory(data) {
  return request({
    url: urlPrefix + '/queryProdListForCategory',
    method: 'post',
    data
  })
}

export function getAvailableProduct(data) {
  return request({
    url: urlPrefix + '/getAvailableProduct',
    method: 'post',
    data
  })
}
