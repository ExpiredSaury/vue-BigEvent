import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
// 创建一个自定的axios方法(比原axios多了个基地址)
// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})
// 定义请求拦截器
myAxios.interceptors.request.use(function (config) {
  // 为请求头挂载 Authorization 字段
  config.headers.Authorization = store.state.token
  // config配置对象（要请求后台的参数都在这个对象上）
  // 在请求前会触发一次，这个return 交给axios源码内，根据配置项发起请求

  // 在发起时要统一携带请求头Authorization和token值
  // 判断，登录和注册页面，vuex里无token，而且登录接口和注册接口也不需要携带token（其他页面需要——）
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }

  return config
}, function (error) {
  // 请求发起前端代码，如果有异常报错，会直接进入这里
  // 返回一个拒绝状态的Promise对象（axios留在原地的Promise对象状态就为失败结果为error变量值
  // 此函数类似于catch函数()里的return
  // 口诀：return 非Promise对象值，会作为陈工的结果，返回给下一个Promise对象（axios留在原地）
  // Promise.reject()原地留下一个新的Promise对象(状体为失败)
  return Promise.reject(error)
})

// 定义响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 响应状态码为 2xx 时触发成功的回调，形参中的 response 是“成功的结果”
  return response
}, function (error) {
  // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”
  if (error.response.status === 401) {
    // 无效的 token
    // 把 Vuex 中的 token 重置为空，并跳转到登录页面
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})
    router.push('/login')
    Message.error('用户身份已过期~~')
  }
  // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”
  return Promise.reject(error)
})
// 导出自定义的axios方法, 供外面调用传参发请求
export default myAxios
