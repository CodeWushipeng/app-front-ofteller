var  mockUser = require ('../../../mock/userMock.json')

const state = {
  commonPara:"",
  userPara:""
}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  setCommonPara: (state, compara) => {
    state.commonPara = compara
    window.commonPara = compara
  },
  setUserPara: (state, userPara) => {
    state.userPara = userPara ? userPara : JSON.stringify(mockUser)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  commonPara({ commit },temp) {
    commit('setCommonPara', temp)
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

