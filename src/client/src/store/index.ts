import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-instance';

Vue.use(Vuex);
const tokenFromLocalStorage = localStorage.getItem('access_token');
axios.defaults.headers.common.Authorization = `Bearer ${tokenFromLocalStorage}`;

export default new Vuex.Store({
  state: {
    token: tokenFromLocalStorage || '',
    user: {},
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
  mutations: {
    setToken: (state, token: string) => {
      state.token = token;
    },
    setUser: (state, user: object) => {
      state.user = user;
    },
    removeToken: (state) => {
      state.token = '';
    },
  },
  actions: {
    setUser: async ({ commit }, { token, user }: { token: string; user: object }) => {
      localStorage.setItem('access_token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      commit('setToken', token);
      commit('setUser', user);
    },
    removeToken: async ({ commit }, token: string) => {
      localStorage.removeItem('access_token');
      axios.defaults.headers.common.Authorization = '';
      commit('removeToken', token);
    },
  },
});
