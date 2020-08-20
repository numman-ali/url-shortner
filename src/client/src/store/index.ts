import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-instance';

Vue.use(Vuex);
const tokenFromLocalStorage = localStorage.getItem('access_token');
axios.defaults.headers.common.Authorization = `Bearer ${tokenFromLocalStorage}`;

export default new Vuex.Store({
  state: {
    token: tokenFromLocalStorage || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    setToken: (state, token: string) => {
      state.token = token;
    },
    removeToken: (state) => {
      state.token = '';
    },
  },
  actions: {
    setToken: async ({ commit }, token: string) => {
      localStorage.setItem('access_token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      commit('setToken', token);
    },
    removeToken: async ({ commit }, token: string) => {
      localStorage.removeItem('access_token');
      axios.defaults.headers.common.Authorization = '';
      commit('removeToken', token);
    },
  },
});
