const defaultSettings = require("@/settings.js");
const urlPrefix = defaultSettings.debugStatus == true ? "/requestForward" : "";
import request from "@/utils/request";

//菜单管理

//获取菜单列表
export function fetchMenuList(data) {
  return request({
    url: urlPrefix + '/menuDevelop/qryMenus',
    method: 'post',
    data
  })
}

//获取所有父级菜单列表
// export function fechAllPranteMenus(query) {
//   return request({
//     url: urlPrefix + '/allPranteMenus',
//     method: 'get',
//     params: query
//   })
// }

//创建菜单
export function createMenu(data) {
  return request({
    url: urlPrefix + '/insertMenu',
    method: 'post',
    data
  })
}

//修改菜单
export function updateMenu(data) {
  return request({
    url: urlPrefix + '/alterMenu',
    method: 'post',
    data
  })
}

//删除菜单
export function deleteMenu(data) {
  return request({
    url: urlPrefix + '/deleteMenu',
    method: 'post',
    data
  })
}
