import request from '@/utils/request'

// registerAPI(this.from)
// registerAPI(
//   { // 表单的数据对象
//     username: '',
//     password: '',
//     repassword: ''
//   }
// )
// 形参obj的值会调用时传来的对象
// obj ={username:'值',password:'值',repassword:'值'}
// 左侧想要对象结构赋值（语法👇）
// { username:username变量名, password:变量名, repassword:变量名 }={username:'',password:'',repassword:''}
// 函数传参的obj就改成了对象结构接收传入的数据对象
// { username:username, password:password, repassword:repassword }
// key是传入的对象key匹配，value是变量名，用于接收外面传入的值
// ES6规定，key和value同名的时候，可以简写(key既是key也是value变量名）

/**
 * 注册接口
 * @param {*} param0 { username:用户名, password:密码, repassword:确认密码 }
 * @returns Promise对象
 */
export const registerAPI = ({ username, password, repassword }) => {
  return request({

    url: '/api/reg',
    method: 'POST',
    data: {
      // axios传参params,data
      // params的对象参数名和值，axios源码会把参数和值，拼接成url?后面给后台（query查询字符串）
      // data的对象参数和值，axios源码会把参数和值，拼接在请求体里（body参数）
      username,
      password,
      repassword
    }
  })
}
/**
 * 登录接口
 * @param {*} param0 {username:用户名,password:密码}
 * @returns Promise对象
 */
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
/**
 * 获取用户信息
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
    // method默认就是get请求

  })
}
/**
 * 获取侧边栏数据
 */
export const getMenuListAPI = () => {
  return request({
    url: '/my/menus'

  })
}

/**
 * 更新基本资料
 */
export const updateUserInfoAPI = ({ id, username, nickname, email, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}

/**
 * 更新头像
 */
export const updateAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}
/**
 * 更新-用户密码
 * @param {*} param0 { old_pwd: 旧密码, new_pwd: 新密码, re_pwd: 新密码确认 }
 * @returns Promise对象
 */
export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}
