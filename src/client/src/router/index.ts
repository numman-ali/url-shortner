import Vue from 'vue';
import VueRouter, { Route, RouteConfig, NavigationGuardNext } from 'vue-router';
import store from '../store';

const ifAuthenticated = async (to: Route, from: Route, next: NavigationGuardNext) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const ifNotAuthenticated = (to: Route, from: Route, next: NavigationGuardNext) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
