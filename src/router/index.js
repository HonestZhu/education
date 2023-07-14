import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   redirect: '/登录'
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('../views/student/Student.vue')
    },
    {
      path: '/student/handbook',
      name: 'student_handbook',
      component: () => import('../views/student/Handbook.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('../views/Teacher.vue')
    },
    {
      path: '/property/equipment',
      name: 'property_equipment',
      component: () => import('../views/property/Equipment.vue')
    },
    {
      path: '/property/laboratory',
      name: 'property_laboratory',
      component: () => import('../views/property/Laboratory.vue')
    }
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

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')

  // const isAuthenticated = token // 假设用户已经登录
  let isAuthenticated = true
  if (to.path !== '/login' && !token) {
    next({
      path: '/login',
      query: { redirect: '/home' } // 保存用户原来想要访问的路径，以便在登录后重定向回去
    })
  } 
  if (to.path == '/login' && token) {
    next({path: '/home'})
  }
  else {
    next()
  }
})


export default router
