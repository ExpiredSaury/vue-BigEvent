import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      { path: 'home', component: () => import('@/views/home') },
      { path: 'user-info', component: () => import('@/views/user/userInfo.vue') },
      {
        path: 'user-avatar', // 必须用这个值
        component: () => import('@/views/user/userAvatar')
      },
      {
        path: 'user-pwd', // 必须用这个值
        component: () => import('@/views/user/userPwd')
      },
      {
        path: 'art-cate', // 文章分类
        component: () => import('@/views/article/artCate')
      },
      {
        path: 'art-list', // 文章列表
        component: () => import('@/views/article/artList')
      }
    ]
  },
  {
    path: '/reg',
    component: () => import('@/views/register')
    // webpack提供的import 函数来路由懒加载导入组件
    // 路由懒加载：就是i页面路由路径切换到/reg，才去加载对应组将代码
    // 好处就是：让首页加载的体积更小，打开更快
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})
const whiteList = ['/login', '/reg'] // 白名单，无需登录可以访问的路由地址
// 全局路由守卫
// 浏览器在第一次打开项目页面，会触发一次全局前置路由守卫函数
// 有token证明登录，无token就没有登录
// next()如果强制条状路由地址，会再次走路由守卫再次去匹配路由表
router.beforeEach((to, form, next) => {
  const token = store.state.token
  if (token) {
    if (!store.state.userInfo.username) {
      // 本地有token,采取请求用户的信息
      store.dispatch('getUserInfoActions')
    }
    next() // 路由放行
  } else {
    if (whiteList.includes(to.path)) {
      // 未登录，可以访问的路由地址，则放行（路由全局前置守卫不会再次触发，而是匹配路由表，让组件挂载）
      next()
    } else {
      next('/login')
    }
  }
})
export default router
