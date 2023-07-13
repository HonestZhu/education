import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/首页',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/校产管理/设备管理',
      name: 'property_equipment',
      component: () => import('../views/property/Equipment.vue')
    },
        {
      path: '/校产管理/实验室管理',
      name: 'property_laboratory',
      component: () => import('../views/property/Laboratory.vue')
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
