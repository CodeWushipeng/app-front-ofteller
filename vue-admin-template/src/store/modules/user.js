import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    info:{}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_INFO: (state, info) => {
    state.info = info;
  }
};


const tokens = {
  admin: {
    token: 'admin-token'
    // token: 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiJ6aGFuZ3NhbiIsInJvbGUiOlsiYWRtaW4iLCJ1c2VyIl0sImlzcyI6IkdlbnQuTmkiLCJleHAiOjE1OTIzNTkxMDQsImlhdCI6MTU5MjM1ODUwNH0.W5AMeFUY_rBK9D8Tj7jDuZfney4kTxpma0VbH7LGklZMsSalLOl8XuOLEHxwEMjLs5cl0rOv242K4jzSqF0UeNNTv3NE8q0bb25WtgXQv-9CjkbOFdJgW4o3i8lb-ZGGp9WJpPsvw-d69VNTlXtXGJThzEs9MZQdD8TuT5rz47Y'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}


const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      console.log('login',username, password)
      /*login({ username: username.trim(), password: password }).then(response => {
        console.log('response',response)
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })*/
      const token = tokens['admin']
      const response = {
        statusCode: 200,
        data: token,
        author: "vincent"
      }
      const { data } = response
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
     /* getInfo(state.token).then(response => {
        const { data } = response
        let roles = ['admin']
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES', roles)
        // resolve(data)
        resolve(roles)
      }).catch(error => {
        reject(error)
      })*/

      const info = users['admin-token']
      const response = {
        statusCode: 200,
        data: info
      }

      const { data } = response
      let roles = ['admin']
      if (!data) {
        reject('Verification failed, please Login again.')
      }
      const { name, avatar } = data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_ROLES', roles)
      // resolve(data)
      resolve(roles)

    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      /*logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })*/

      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

