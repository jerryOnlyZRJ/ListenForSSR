import Vue from "vue";
import Vuex from "vuex";
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const defaultState = {
  username: '',
  title: ''
}

const inBrowser = typeof window !== "undefined";
Vue.use(Vuex);
let state = (inBrowser && window.__INITIAL_STATE__) || defaultState;

export function createStore() {
  const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters
  });
  return store;
}