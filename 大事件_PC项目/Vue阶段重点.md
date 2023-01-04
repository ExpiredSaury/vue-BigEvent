# 脚手架-了解

概念: 一个编写业务代码的平台(一套固定标准文件夹+文件+webpack配置+第三方依赖包(node_modules))

后续写代码和项目, 都要在脚手架平台环境上开发业务代码

使用:

* 首先确保本机安装了 @vue/cli 全局包, 拥有vue命令 (一次)

  > yarn global add @vue/cli

* 其次用vue命令, 创建和下载脚手架项目, 并自动下载第三方依赖包

  > vue create 项目文件夹名

  注意: 项目文件夹名, 要由小写英文, 数字, 中划线和下划线组成, 所在的路径上不能有特殊的符号

* 其次如何**启动**脚手架项目, 预览webpack打包后的项目在浏览器上

  > yarn serve

  注意: 在敲击此命令时, 一定一定一定要确保终端所在文件夹是package.json所在的文件夹

  原因: 因为自定义命令, 会找当前文件夹下的package.json文件

知道:

main.js -> webpack打包入口(项目最开始执行的文件)

调试工具devTools

它是谷歌浏览器的一个插件, 而且专为开发环境下Vue项目的调试的工具



# 语法

| 语法格式                                                 | 作用                                               | 举例                                                |
| -------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------- |
| <标签>{{ 表达式 }}</标签>                                | 标签内容位置, 显示表达式值                         | <h1>{{ msg }}</h1>                                  |
| <标签 :属性名="Vue变量" ></标签>                         | 把Vue变量值赋予给标签属性                          | <a :href="theUrl"></a>                              |
| <标签 @事件名="methods里方法名"></标签>                  | 给标签上直接绑定事件和处理函数                     | <button @click="addFn"></button>                    |
| <标签 @事件名="methods里方法名(值)"></标签>              | 触发事件时传值                                     | <button @click="addFn(5)"></button>                 |
| <标签 @事件名.修饰符="methods里方法名"></标签>           | 给事件添加额外的功能                               | <button @click.stop="addFn(5)"></button>            |
| <标签 v-html="Vue变量"></标签>                           | 把标签字符串解析成标签显示                         | <p v-html="'<span>我是标签字符串</span>'"></p>      |
| <标签 v-show="Vue变量></标签>                            | 用CSS的方式控制标签显示/隐藏(true显示/false隐藏)   | <div v-show="isShow"></div>                         |
| <标签 v-if="Vue变量"></标签>                             | 用JS创建/移除的方式控制标签显示/隐藏               | <div v-if="isShow"></div>                           |
| <标签 v-else></标签>                                     | 用来和v-if配合做互斥效果的                         | <div v-else></div>                                  |
| <标签 v-for="(值变量名, 索引变量名) in 目标结构"></标签> | 用目标结构数据循环创建所在标签结构(用数据循环标签) | <li v-for="(item, index) in arr" :key="index"></li> |
| <标签 v-model="Vue变量" />                               | 标签value属性和Vue变量双向绑定到一起               | <input v-model="userName" />                        |
| <标签 :class="{类名: 布尔值}"></标签>                    | 当布尔值为true的时候, 此类名生效(动态class)        | <p :class="{'redClass': true}"></p>                 |
|                                                          |                                                    |                                                     |
|                                                          |                                                    |                                                     |
|                                                          |                                                    |                                                     |
|                                                          |                                                    |                                                     |
|                                                          |                                                    |                                                     |
|                                                          |                                                    |                                                     |
|                                                          |                                                    |                                                     |

## 语法注意实现

复选框的时候, v-model关联变量类型:

* 非数组类型, 关联的是复选框的checked选中状态(true选中, false未选中)
* 数组类型, 关联的才是复选框的value属性值(选中时, 会把value值添加到数组中, 未选中会把值从数组里移除)

# 配置项

```js
export default {
    data() {
        return {
            变量名: 初始值
        }
    },
    methods: {
        方法名() {
            // 函数体里代码
            // 注意: 要调用变量/方法, 要使用this(代表当前.vue文件对应组件对象)
        }
    },
    computed: {
        计算属性名() {
            return 计算后的值
        },
        计算属性名: {
            set(接收要被赋予的新值) { // 当给计算属性变量, 赋予值的时候, 此set方法自动执行并接收新的值
                
            },
            get() {
                return 计算后的值
            }
        }
    },
    directives: {
        指令名字: { // 指令名字不需要包含v-开头, 但是使用的时候, 我们需要在标签上写v-指令名字
            inserted(原生标签变量名) { // 指令所在的标签, 第一次插入到真实DOM上, 此函数自动触发
                // 形参是指令所在的那个原生标签, 在这里可以对这个原生标签做功能扩展
            }
        }
    },
    watch: {
        要侦听的基础类型属性名(新值形参, 旧值新参) {
            
        },
        要侦听的引用类型属性名: {
            deep: true,
            handler(新值形参, 旧值形参) {
                
            }
        },
        ['侦听的对象.属性'](新值形参, 旧值形参) { // 可以直接侦听对象里某个基础类型属性值变化
            
        }
    }
}
```

> computed比methods好处, 有缓存的特性



# Vue中的组件

概念: 一个可以复用的Vue实例, 封装标签, 样式和Vue代码(心中活动: 代码里体现. .vue文件方式)

好处: 独立作用域, 便于复用和扩展

## 场景

什么时候, 决定封装组件

* 必须: 有一段标签, 重复使用
* 可选: 把一个页面, 拆分成多个组件, 拼装一个页面

## 使用

口诀:

1. 创建组件 (.vue文件, 封装标签, 样式, vue代码)
2. 引入组件 (import 组件对象变量名 from '组件文件路径')
3. 注册组件 (components里局部注册) { 组件标签名: 组件对象 }
4. 使用组件 (组件标签名, 摆在相应的位置上)

效果: 组件内编译好的标签和数据, 替换到你使用组件时, 对应标签上

## ==组件通信-父向子==

场景: 从1个.vue文件, 向另1个.vue文件传值

前提: 被引入的那个.vue组件就是子组件

口诀:

1. 子组件内, 定义props选项, 定义变量名, 使用在子组件内
2. 父组件内, 使用子组件标签时, 在属性上对应props变量传值进去

注意:

*  (遵守单项数据流): 数据从父级流向(传递)给子组件, 子组件内props本身是只读的(不能重新赋值)

问题: v-for在外面遍历子组件, 还是把数组传递到子组件内, 让子组件遍历?

> 关键: 你要想清楚, 你封装的这个组件(到底是一行内容, 还是一列内容带容器)
>
> 一行内容, 在外面使用组件循环
>
> 一列内容, 就把数组传入进去, 在其内部循环

## ==组件通信-子向父==

前提: 从子这个.vue文件, 向父.vue文件进行调用

口诀:  (自定义事件方式)

1. 子组件内, 恰当时机, 调用this.$emit('自定义事件名', 你要传递给父的数据)
2. 父组件内, 给子组件标签上, 绑定自定义事件, 和事件处理函数



> 补充: 组件通信方式有很多种, 先掌握最常用的上面2种即可



## 插槽

概念: 它是一种组件内标签分发的技术

场景: 组件内标签不确定的时候, 我们使用插槽技术

好处: 封装的这1个组件, 能够适应不同的业务场景

### 场景1-基础使用

公式:

1. 在组件内用<slot></slot>标签(Vue内置)组件占位

2. 父组件使用, 子组件标签, 夹着的地方, 传入具体标签替换

   ```vue
   <组件标签>
   	这里传入要替换slot位置的具体标签    
   </组件标签>
   ```

   

### 场景2-默认内容

> 使用的时候, 没有给插槽传入具体标签, 我们要设置默认显示的内容

公式:

1. 在组件内<slot></slot>中间夹着的地方, 放入具体的默认显示的内容



### 场景3-具名插槽

>  底和框大体相同, 封装1个组件, 在这个组件里有2处以上标签不确定的时候

公式:

1. 在<slot></slot>标签上, 用name属性起一个别名

2. 在使用此组件的时候, 在组件标签夹着的地方用<template v-slot:插槽名>

   ```vue
   <组件标签>
       <template v-slot:插槽名>
       	这里传入替换到名字相应slot标签位置的具体标签
       </template>
       <template #插槽名>
       	这里传入替换到名字相应slot标签位置的具体标签
       </template>
   </组件标签>
   ```

   

效果: 对应template和插槽名夹着的标签会分发给对应slot名字的标签处替换

简写:  把v-slot: 简写成 #



### 场景4-作用域插槽

> 使用组件时并使用插槽技术了, 然后想要使用组件内的变量

公式:

1. 在<slot></slot>标签上, 自定义属性和组件内变量值绑定

2. 在使用此组件时, 在组件标签夹着的地方用<template v-slot="变量名">

   ```vue
   <组件标签>
       <template v-slot="变量名">
       	这里就可以使用变量绑出来的组件内变量的值
       </template>
   </组件标签>
   ```

   

效果: 变量会收集到对应名字slot身上属性和值, 形成的是一个对象

## 内置属性和方法

> 组件对象(this)内置的一些属性和方法学习

### $refs

作用: 获取原生标签对象 / 获取组件对象

使用: 

1. 原生标签/组件标签上, 添加ref属性和别名
2. 在恰当的时机, 通过`this.$refs.别名`原地拿到对应原生标签对象/组件对象



注意: 如果用id和原生querySelector方法获取

原生标签 -> 获取到这个原生标签对象

组件标签 -> 根标签

### $nextTick

作用: 等待真实DOM的异步更新后, 再去执行某些代码

场景: 为了获取更新后的真实DOM

使用:

```js
this.$nextTick(() => {
    // 当Vue数据变化后, 异步更新真实DOM以后, 此回调函数会自动触发
})
```

## 组件-生命周期

概念: 从组件创建到销毁的过程

阶段: 4个阶段 (创建, 挂载, 更新, 销毁)

代码: 8个生命周期钩子(hook)函数

| 阶段         | 方法名1       | 方法名2   |
| ------------ | ------------- | --------- |
| 创建(初始化) | beforeCreate  | created   |
| 挂载         | beforeMount   | mounted   |
| 更新         | beforeUpdate  | updated   |
| 销毁         | beforeDestroy | destroyed |

created: 可以通过this组件对象, 访问我们在data/methods里定义的属性和方法

mounted: 可以获取第一次挂载的真实DOM

updated: 必须Vue数据变化更新, 导致真实DOM更新, 可以获取更新后的真实DOM (也可以用$nextTick)

destroyed: 销毁和释放掉此组件占用的全局资源(定时器和绑定在window/document等事件)

## 组件缓存

概念: vue内置的一个全局组件keep-alive (所以它可以独立使用), 它可以用来缓存一个组件, 防止组件的销毁和重新创建, 可以保存在内存中进行使用

使用: 

```vue
<keep-alive include="要缓存的组件名">
 <要缓存的组件标签>
</keep-alive>
```

额外给缓存的组件新增了2个钩子函数(因为created(执行一次)和destroyed不会执行)

* activated     - 激活
* deactivated - 非激活





# Vue路由

概念: 路径和组件的映射关系

作用: 切换业务场景

## 基础使用

1. 下载vue-router@3.5.4的包
2. 引入VueRouter函数
3. 使用Vue.use(VueRouter)注册插件 -> VueRouter函数对象内, 注册了RouterView和RouterLink全局组件 
4. 创建路由规则(路径和组件对象映射关系)数组(路由表)
5. 利用路由规则数组, 来生成路由对象 new VueRouter({ routes: 路由数组 })
6. 注入到new Vue({ router: 路由对象 })
7. 设置路由挂载点, 设置router-view标签

效果: 当你切换地址栏里路由路径地址, 匹配到的组件就会挂载到router-view标签的位置



## 切换跳转方式

1. 声明式导航
   * 方式1: <a href="#/路由地址"></a>
   * 方式2: 声明式导航<router-link to="/路由地址">首页</router-link>

2. 编程式导航

   * 方式1: this.$router.push({ path: '/路由地址' })
   * 方式2: this.$router.push({ name: '路由名字' }) // 注意: 路由名字在路由规则数组对象name属性上声明

   



## 传参

1. 声明式导航

   * <router-link to="/路由路径?参数名=值"></router-link>
     * 接收: $route.query.参数名
   * <router-link to="/路由路径/值"></router-link>
     * 注意: 这种方式, 需要在路由规则表(数组)里, 提前配置好匹配的路径path: '/路由路径/:参数名'
     * 接收: $route.params.参数名

2. 编程式导航

   方式1: path+query

   ```js
   this.$router.push({
       path: '/路由路径',
       query: {
           参数名: 值
       }
   })
   
   // 接收方: this.$route.query.参数名
   ```

   方式2: name+params

   ```js
   this.$router.push({
       name: '路由名字',
       params: {
           参数名: 值
       }
   })
   // 注意: 参数名要和路由规则对象里path: '/路由路径/:参数名' 一致 (值才会出现在路径上)
   
   // 接收方: this.$route.params.参数名
   ```



## 路由嵌套

1. (画面): 你要先确定在==哪个页面, 嵌套==路由(导航和挂载点)
2. 确定==嵌套几个子页面==, 创建相应页面vue文件组件
3. 引入到路由规则数组中, 在上级路由规则对象中加入==children配置==
4. 在上级页面里面加入导航和==router-view挂载点==



## 路由守卫

全局前置守卫:  守卫路由跳转的一个函数, 可以在里面做一些判断来决定是否跳转路由或取消或重定向路由





## 配置项

* 重定向: redirect
* 404: 路由表最后 path: "*"
* 路由模式: mode: "history"和"hash"值



# Vuex

概念: 集中式, 状态管理的机制

作用: 跨组件通信, 实现组件之间数据共享

存: 2个以上组件需要同步的变量(如果只有组件内自己使用的放在data里即可)

核心: 

* store (每个vue项目里唯一的数据仓库对象)
  * state: 唯一数据源(定义全局状态属性和初始值)
  * mutations: 唯一能够"同步"修改state数据地方(原因: 为了让vue调试工具可以追查)
  * actions: 执行异步请求代码的地方(注意: 也要把数据提交给mutations来影响state)
  * getters
  * modules

## 语法

* 定义格式

  ```js
  const store = new Vuex.Store({
      state: {
          属性名: 初始值
      },
      mutations: {
          函数名(state, 可选值) {
              // 可以用state形参修改值
          }
      },
      actions: {
          函数名(store) {
              // store相当于this.$store值
              // 可以写异步代码, 异步有结果后, store.commit()提交给mutations来映射state数据
          }
      },
      getters: {
          计算属性名(state) {
              return 值
          }
      },
      modules: {
          模块名: 模块对象
          模块名: {
          	state() {
      			return {
      				属性名: 初始值
  				}
  			},
              mutations: {},
      		actions: {},
              getters: {},
              modules: {}
      	}
      }
  })
  ```

* 使用格式

  * state使用

    * 直接使用:  this.$store.state.属性名

    * 映射使用: 

      ```js
      import { mapState } from 'vuex'
      
      export default {
          computed: {
              ...mapState(['要映射state属性名'])
          }
      }
      
      // 效果: 当前组件内也有了一个同名的计算属性, 值来自于vuex里state值
      ```

    * 分模块+命名空间

      * 直接使用: this.$store.state.模块名.属性名
      * 映射使用:

      ```js
      ...mapState('模块名', ['要映射state属性名'])
      
      // 注意: 
      ...mapState({
          '原地属性名': (state) => {
              return 取值过程
          }
      })
      ```

      

  * mutations使用

    * 直接使用: this.$store.commit('要触发的mutations函数名', 值)

    * 映射使用

      ```js
      import { mapMutations } from 'vuex'
      
      export default {
          methods: {
              ...mapMutations(['mutations里函数名'])
          }
      }
      
      // 效果: 当前组件内就有了同名的一个方法, 可以用this.来进行调用
      ```

    * 分模块+命令空间

      * 直接使用: this.$store.commit('模块名/要触发mutations函数名', 值)
      * 映射使用:

      ```js
      ...mapMutations('模块名', ['要映射state属性名'])
      ```

      

  * actions使用

    * 直接使用: this.$store.dispatch('actions里函数名')

    * 映射使用:

      ```js
      import { mapActions } from 'vuex'
      
      export default {
          methods: {
              ...mapActions(['actions里函数名'])
          }
      }
      
      // 效果: 当前组件内就有了同名的一个方法, 可以用this.来进行调用
      ```

    * 分模块+开启命名空间

      * 直接使用: this.$store.dispatch('模块名/actions里函数名')
      * 映射使用:

      ```js
      ...mapActions('模块名', ['要映射state属性名'])
      ```



* getters的使用

  * 直接使用: this.$store.getters.计算属性名

  * 映射使用

    ```js
    import { mapGetters } from 'vuex'
    
    export default {
        computed: {
            ...mapGetters(['要使用getters里属性名'])
        }
    }
    
    // 效果: 原地留下一个计算属性和函数, 在函数内源码中会返回vuex中getters属性的值
    ```

  * 分模块+命名空间

    * 直接使用: this.$store.getters['模块名/计算属性名字']
    * 映射使用

    ```js
    ...mapGetters('模块名', ['要使用getters里属性名'])
    ```



* modules

  > 分模块, 最后合并到根store对象上

  

## 注意

分模块, 默认只影响state的取值方式(不担心重名, 因为先.模块名就已经确定去哪个模块里找到state)

但是我们getters, mutations, actions, 如果多个模块里重名了, 逻辑页面调用都会执行 (这样其实不太好的)



分模块+开启命名空间: 影响state, getters, mutations, actions的使用, 更精准的来调用哪个模块内的东西



# 组件库

> 概念: 多个组件形成的一个仓库(包)

名字:

* element-ui  (饿了么团队出品-PC端)
* Mint-ui (饿了么团队-移动端)
* vant (有赞团队出品-移动端)
* ......

如果你的项目样式和组件库不太一样, 项目需要定制化开发(html+css自己写)

组件库使用:

1. 找到组件库官方文档, 如果没有官方文档, 可以去npmjs.com, 看它的README.md使用说明
2. 多读文档, 多看文档, 多试试, 多百度, 多用多总结...

某个组件使用:

1. 明确目标(你想要什么样的页面, table/导航/...)
2. 找组件(找类似的)
3. 用组件(把关键组件注册, 关键标签和代码复制到自己项目中试着运行查看)
4. 读组件(标签, 属性, 其他.. 多看文档多试试)
5. 删除多余的
6. 增加/修改一些, 让这个组件和我的目标更贴合

# 原理

## v-model本质

```vue
<标签 v-model="Vue变量"></标签>

<!-- 运行时, 会转变成这个样子 (本质) -->
<标签 :value="Vue变量" @input="val => Vue变量名 = val">
```

> 1. 会给所在标签value属性赋值, 把右侧Vue变量值赋予给value属性
> 2. 会给所在标签绑定input事件, 接收到的值赋予给右侧Vue变量

应用场景: 用v-modle, 可以给表单标签/组件, 实现双向数据绑定(前提: 组件内必须用value属性接值, 必须$emit用input事件)



# 注意(了解)

## v-for更新DOM条件

情况1: 调用能够改变**原数组的数组方法**, 会触发v-for更新DOM

> 原理: Vue源码对数组里, 能够改变原数组的方法做了重写(劫持), 本质上调用的还是数组原本的方法 Array.prototype.方法名 

情况2: 直接给变量赋予**新数组**, 会触发v-for更新DOM

> 原理: Vue的响应式原理, 对对象里属性做了(劫持-数据变化监听), 本质上它使用的Object.defineProperty

情况3: 调用Vue提供**$set方法**, 只更新数组里某个值, 会触发v-for更新DOM

## v-for就地更新

1. 数据变化, DOM是如何更新的?

   > 网页打开时创建虚拟DOM结构, 数据更新后, 创建新的虚拟DOM结构, 做对比, 找到差异再更新真实DOM

2. key属性作用?

   > 提高更新时, 对比新旧DOM差异的性能

3. key值要求?

   > 唯一的字符串或数字, (同级之间不建议重复)
   >
   > 口诀: 有id用id, 没id用索引

4. 新旧虚拟DOM对比的算法?

   > diff算法: 可以看gif图
   >
   > 无key, 用标签名同级对比找差异, 有key, 就用key的值来对比

5. 无key和key的值为索引, 更新效果是一致的

## 虚拟DOM

概念:  只保存标签节点相关的信息的JS对象

template => 虚拟DOM => 真实DOM

# 新项目注意

没有node_modules依赖包, 项目使用会报错

原因: 项目需要用的这些第三方依赖包才能启动

为何:

1. node_modules比较大, 不要让git管理和传递来传递去, 比较慢

2. 你只需要携带package.json和其他代码文件给到对方, 对方在原地用yarn命令 或者 npm i 命令, 自己会根据package.json记录的包和版本在本地自己下载会很快

   
