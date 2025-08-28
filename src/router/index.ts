import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
  },
  // Social Media Routes
  {
    path: '/social/news',
    name: 'social-news',
    component: () => import('../views/social/News.vue'),
  },
  {
    path: '/social/instagram',
    name: 'social-instagram',
    component: () => import('../views/social/Instagram.vue'),
  },
  {
    path: '/social/youtube',
    name: 'social-youtube',
    component: () => import('../views/social/YouTube.vue'),
  },
  {
    path: '/social/facebook',
    name: 'social-facebook',
    component: () => import('../views/social/Facebook.vue'),
  },
  {
    path: '/social/tiktok',
    name: 'social-tiktok',
    component: () => import('../views/social/TikTok.vue'),
  },
  {
    path: '/social/twitter',
    name: 'social-twitter',
    component: () => import('../views/social/Twitter.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;