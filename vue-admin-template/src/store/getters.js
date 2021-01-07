import privateViewMain from "./modules/privateViewMain";

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  commonPara: state => state.nodesys.commonPara,
  userPara: state => state.nodesys.userPara,

  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  iframes: state => state.permission.iframes,
  iframePrivateView: state => state.privateViewMain.iframePrivateView,
}
export default getters
