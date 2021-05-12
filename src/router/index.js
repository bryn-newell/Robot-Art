import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
  },
  {
    path: '/robots',
    name: 'Robots',
    component: () => import(/* webpackChunkName: "about" */ '../views/Robots.vue'),
  },
  {
    path: '/results',
    name: 'Results',
    component: () => import(/* webpackChunkName: "about" */ '../views/Results.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
