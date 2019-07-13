<template>
  <div class="header">
    <!-- 版心 -->
    <div class="contain">
      <!-- logo部分 -->
      <h1>
        闲云旅游
        <img src alt data-v-1992e634 />
      </h1>
      <!-- 导航部分 -->
      <div class="navigation">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </div>
      <!-- 用户信息登录部分 -->
      <div class="userInfo">
        <!-- 下拉菜单部分 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-bell"></i>
            消息
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span v-if="false">登录/注册</span>
        <span>
            <i>欢迎您&nbsp;&nbsp;&nbsp;</i>
          <el-dropdown>
            <span class="el-dropdown-link">
              <div class="userImg">
                <img src="@/static/user.jpg" alt />
              </div>
              黑猫
            <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click="quitOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    quitOut(){
      this.$router.push({path:'/user/login'})
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 3px 3px #ccc;
  box-sizing: border-box;
  .contain {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    h1 {
      height: 60px;
      width: 240px;
      text-indent: -999em;
      background: url("http://157.122.54.189:9093/images/logo.jpg") no-repeat;
    }
    .navigation {
      flex: 1;
      a {
        height: 60px;
        display: inline-block;
        text-align: center;
        padding: 20px;
        &:hover {
          color: #409eff;
          border-bottom: 5px solid #409eff;
        }
      }
      .nuxt-link-exact-active {
        background-color: #409eff;
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
    }
    .userInfo {
      text-align: center;
      line-height: 60px;
      .userImg{
        display: inline-block;
        width: 38px;
        height: 38px;
          vertical-align: middle;
          box-sizing: border-box;
        &:hover{
          outline: 2px solid #409eff;
          -moz-outline-radius: 50%;
        }
        img{
          width: 34px;
          height: 34px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>


