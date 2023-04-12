import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TeleAdminView from '@/views/TeleAdminView.vue';
import OrgAdminView from '@/views/OrgAdminView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/tele-admin',
    name: 'tele-admin',
    component: TeleAdminView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/org-admin',
    name: 'org-admin',
    component: OrgAdminView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
