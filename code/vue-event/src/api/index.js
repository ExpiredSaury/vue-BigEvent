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
/**
 * 获取-文章分类
 * @returns Promise对象
 */
export const getArtCateListAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}
/**
 * 增加-文章分类
 * @param {*} param0 { cate_name: 文章分类名字, cate_alias: 文章分类别名 }
 * @returns Promise对象
 */
export const addArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}
/**
 * 更新-文章分类
 * @param {*} param0 { id: 文章分类id, cate_name: 文章分类名字, cate_alias: 文章分类别名 }
 * @returns Promise对象
 */
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}
/**
 * 删除-文章分类
 * @param {*} id 要删除的-文章分类id
 * @returns Promise对象
 */
export const delArtCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}
/**
 * 发布文章
 * @param {*} fd 表单对象
 * @returns Promise对象
 */
export const uploadArticleAPI = (fd) => {
  return request({
    url: '/my/article/add',
    method: 'POST',
    data: fd // 参数要的是表单对象, 不能写普通对象, axios内部会判断, 如果是表单对象, 传递的请求体会设置Content-Type: form-data与后端对应
  })
}
/**
 * 获取文章列表
 * @param {*} param0 { pagenum: 当前页码数, pagesize: 当前页条数, cate_id: 文章分类id, state: 文章状态 }
 * @returns Promise对象
 */
export const getArticleListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}
/**
 * 获取-文章详情
 * @param {*} id 文章id
 * @returns Promise对象
 */
export const getArticleDetailAPI = (id) => {
  return request({
    url: '/my/article/info',
    params: {
      id
    }
  })
}
/**
 * 删除文章
 * @param {*} id  文章id
 * @returns Promise对象
 */
export const delArticleAPI = (id) => {
  return request({
    url: '/my/article/info',
    method: 'DELETE',
    params: {
      id
    }
  })
}
