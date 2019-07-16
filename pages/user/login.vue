<template>
  <!-- 登录页 -->
  <div class="login">
    <!-- 版心 -->
    <div class="contain">
      <!-- 表单结构 -->
      <div class="loginForm">
        <!-- 表单上部标题 -->
        <div class="formTitle">
          <span @click="currentTab=0" :class="{active:currentTab==0}">登录</span>
          <span @click="currentTab=1" :class="{active:currentTab==1}">注册</span>
        </div>
        <loginForm v-if="currentTab==0"/>
        <registerForm v-else/>
      </div>
    </div>
  </div>
</template>
<script>
import loginForm from "@/components/user/loginForm.vue"
import registerForm from "@/components/user/registerForm.vue"
export default {
  components:{
    loginForm,
    registerForm
  },
  data() {
    return {
      currentTab:1,
    };
  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
.login {
  height: 700px;
  background: url("../../static/th03.jpg") no-repeat;
  .contain {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .loginForm {
      margin: 210px auto;
      width: 400px;
      // height: 282px;
      background-color: #fff;
      .formTitle {
        height: 50px;
        display: flex;
        line-height: 50px;
        span {
          cursor: pointer;
          flex: 1;
          text-align: center;
          background-color: #eee;
        }
        .active {
          color: #ffa500;
          border-top: 3px solid #ffa500;
          background-color: #fff;
        }
      }

    }
  }
}
</style>
