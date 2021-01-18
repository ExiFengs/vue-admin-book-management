import { login1, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
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
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log('=================' + userInfo.readerAccount)
    return new Promise((resolve, reject) => {
      login1(userInfo)
        .then(response => {
          console.log('=================******' + response.token)
          // const { data } = response
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
          console.log(data.readerName + '读者信息')
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
          commit('SET_NAME', data.readerName)
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
