import { login1, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    id: '',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log('%c [ userInfo ]', 'font-size:13px; background:pink; color:#bf2c9f;', userInfo)
    return new Promise((resolve, reject) => {
      //此时登陆的角色为读者
      // if(userInfo.roleId == 1){
      login1(userInfo)
        .then(response => {
          console.log('====******' + response.token)
          commit('SET_TOKEN', response.token)
          setToken(response.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    console.log('这是 token ：：：：' + state.token)
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const data = response.reader
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          const avatar = 'https://raw.githubusercontent.com/FsXI/FsXI/master/Developer.gif'
          commit('SET_NAME', data.readerName)
          commit('SET_ID', data.readerId)
          commit('SET_AVATAR', avatar)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
