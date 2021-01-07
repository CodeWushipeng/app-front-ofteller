import { asyncRoutes, constantRoutes } from '@/router'
import { fetchMenuList} from '@/api/auth/menu'
import { arry2Tree } from '@/utils/index'
import Layout from '@/layout'
import vue from 'vue'
import {RES_OK} from '@/api/config'

function bus() {
  return new vue();
}

/**
 * 数组转换vue格式routers
 * @param {arry} data
 */
export function getVUERouters(data) {
  var vueRouters = [];
  let layout = Layout
  if (data && data.length>0){
    data.map(menu => {
      let component = menu.assUrl
      let routerObj = {
        path: menu.menuPath,
        name: menu.menuName.replace(/\//g, ''),
        meta: { title: menu.menuName, icon: menu.menuCssIcon},
        hidden: menu.menuHidden == '2' ? false : true
      }
      if (menu.assUrl.toLowerCase() === "layout"){
        routerObj.component = layout
      }else{
        if (component.indexOf("?") !== -1){
          let index = component.lastIndexOf("?")
          // let iframeInf = {
          //   id: menu.menuPath.replace(/\//g, ''),
          //   src: component.substring(index + 1, component.length)
          // }
          // store.dispatch('permission/setIframeInf', iframeInf)
          component = component.substring(0,index)
        }
        routerObj.component = (resolve, reject ) => {
          require([`@/views/${component}`], resolve).then(
            function(){
              console.log(`${component}加载成功`)
            },
            function(err){
              if (err.code ==="MODULE_NOT_FOUND"){
                require([`@/views/404`], resolve)
              }
            }
          )}
      }
      if (menu.subMenus && menu.subMenus.length>0 ){
        let parentPath = menu.menuPath.indexOf("/") === 0 ? menu.menuPath : '/' + menu.menuPath
        let curPath = menu.subMenus[0].menuPath.indexOf("/") === 0 ? menu.subMenus[0].menuPath : '/' + menu.subMenus[0].menuPath
        routerObj.redirect = parentPath + curPath
        routerObj.children = getVUERouters(menu.subMenus);
      }
      vueRouters.push(routerObj)
    })
  }
  console.log(vueRouters);
  return vueRouters
}


const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_IFRAMES: (state, iframeInf) => {
    if (state.iframes && state.iframes.length > 0){
      state.iframes.push(iframeInf)
    }else{
      state.iframes = [];
      state.iframes.push(iframeInf)
    }
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {

      if(true){
        // 访问权限数据
        // debugger
        const listQuery = {
          tenantId: 'temp',
          searchValue: undefined
        }
        fetchMenuList(listQuery).then(response => {
          console.log('fetchMenuList response',response);
          const {rspCode,menus} = response;
          if(rspCode === RES_OK){
            const mymenus = arry2Tree(menus, "-1", "menuCode", "parentMenuCode",'subMenus');
            console.log('----menus:',menus)
            console.log('----mymenus:',mymenus)
            let accessedRoutes1 = getVUERouters(mymenus);
            // console.log('accessedRoutes1',accessedRoutes1)
            commit('SET_ROUTES', accessedRoutes1);
            resolve(accessedRoutes1)
          }else{
            bus().$notifyError("没有查询到菜单权限信息")
            resolve([])
          }
        }).catch(error => {
          reject(error)
        })
      }else {
        // 测试
        commit('SET_ROUTES', asyncRoutes);
        resolve(asyncRoutes)
      }

    })
  },
  setIframeInf({ commit }, iframeInf) {
    commit('SET_IFRAMES', iframeInf)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
