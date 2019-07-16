// nuxt已经把store（vuex）关联到应用，只需要维护各个模块
// 每个模块下面通常需要三个属性

import {Message} from "element-ui";


// state:存数据
export const state = () => ({
  userInfo: {
    token: '',
    user: {
      nickname: '',
      defaultAvatar: '',
      username: ''
    }
  }
  // 利用短路运算做判断，如果本地储存没有数据，则给空对象
  // userInfo:JSON.parse(window.localStorage.getItem("dwxProject"))||{}
  // 但是发现nuxt框架是支持nodejs的项目，在这里无法接收到locationStorage里的数据，所以要判断当前环境是否是浏览器环境
})

// mutations: 同步设置修改state的数据
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
    // 保存到本地
    // localStorage.setItem("dwxProject",JSON.stringify(data))
  },
  clearUserInfo(state) {
    // if(process.browser){
    //     localStorage.removeItem("dwxSsrProject")
    // }
    state.userInfo = {
      token: '',
      user: {
        nickname: '',
        defaultAvatar: '',
        username: ''
      }
    }
  }
}

// actions: 异步设置修改state的数据
export const actions = {
  // 负责登录的请求
  // 第一个参数是store对象
  // 第二个参数
  login({
    commit
  }, data) {
    // 登录的接口
    this.$axios({
        url: "/accounts/login",
        method: "POST",
        data
      })
      .then(res => {
        //   console.log(res);
          Message.success("登录成功");
          // console.log(res.data)
          // 将数据存入vuex的store中，调用方法，注意nuxt框架自动封装，每个模块都是单独的数据，名字就是命名空间
          commit("setUserInfo", res.data);
          // console.log(this.$store.state.user.userInfo)
          this.$router.push({
            path: "/"
          });
      })
  },

  // 用户注册
  register({
    commit
  }, data) {
    //   注册的接口
    this.$axios({
        url: '/accounts/register',
        method: 'POST',
        data
      })
      .then(res => {
        // console.log(res)
        commit("setUserInfo",res.data)
        Message({
          type:"success",
          message:'注册成功正在为你自动跳转'
        })
        setTimeout(() => {
          this.$router.back()
        }, 2000);
        // this.$router.push("/")
      })
  }

}
