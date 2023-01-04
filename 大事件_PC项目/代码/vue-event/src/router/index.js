import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home', // 默认显示首页的二级路由
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'user-info', // 这里必须叫user-info, 因为侧边栏导航切换的是它
        component: () => import('@/views/user/userInfo')
      },
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
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

// 无需验证token的页面
const whiteList = ['/login', '/reg']

router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 如果有token, 证明已登录
    if (!store.state.userInfo.username) {
      // 有token但是没有用户信息, 才去请求用户信息保存到vuex里
      // 调用actions里方法请求数据
      store.dispatch('initUserInfo')
      // 下次切换页面vuex里有用户信息数据就不会重复请求用户信息
    }
    next() // 路由放行
  } else {
    // 如果无token
    // 如果去的是白名单页面, 则放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 如果其他页面请强制拦截并跳转到登录页面
      next('/login')
    }
  }
})

export default router
