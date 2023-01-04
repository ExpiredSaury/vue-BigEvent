import request from '@/utils/request'

// 导出接口方法
export const registerAPI = () => {
  // 这里先用这个接口测试下, 如果url以http开头会忽略baseURL, axios直接请求此地址
  return request({
    // 原地是一个Promise对象，内部包含了ajax请求
    // return 这个Promise对象到逻辑界面，丢到那边对Promise对象提取结果
    url: '/api/reg',
    method: 'POST',
    data: {
      username: 'lidongxu123',
      password: '111111',
      repassword: '111111'
    }
  })
}
