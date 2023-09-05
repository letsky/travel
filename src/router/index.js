// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/index/Index.vue')
  },
  {
    path: '/group/:groupId',
    component: () => import('@/layouts/group/Index.vue')
  },
  {
    path: '/group/:groupId/preview',
    component: () => import('@/layouts/group/Preview.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
