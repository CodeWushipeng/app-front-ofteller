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

export function queryTemplete(data) {
  return request({
    url: urlPrefix + '/template/render',
    method: 'post',
    data
  })
}
