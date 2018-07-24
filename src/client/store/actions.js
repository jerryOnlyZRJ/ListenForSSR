import request from "axios"

const actions = {
  setUser: ({
    commit
  }, username) => {
    commit('SET_USER', username)
  }
}

export default actions