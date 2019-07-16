<template>
  <el-form :model="userLoginInfo" :rules="rules" ref="userLoginInfo" class="demo-ruleForm">
    <el-form-item prop="username">
      <el-input v-model="userLoginInfo.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="userLoginInfo.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-row>
      <a href="javascript:;">忘记密码</a>
    </el-row>
    <el-row>
      <el-button type="primary" style="width:348px" @click="loginSubmit">登录</el-button>
    </el-row>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      userLoginInfo: {
        username: "13800138000",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginSubmit() {
      this.$refs.userLoginInfo.validate(valid => {
        if (valid) {
          // 未封装到vuex的store中
          //   console.log(111);
          // this.$axios({
          //   url: "/accounts/login",
          //   method: "POST",
          //   data: this.userLoginInfo
          // })
          //   .then(res => {
          //     //   console.log(res);
          //     if (res.status === 200) {
          //       this.$message.success("登录成功");
          //       // console.log(res.data)
          //       // 将数据存入vuex的store中，调用方法，注意nuxt框架自动封装，每个模块都是单独的数据，名字就是命名空间
          //       this.$store.commit("user/setUserInfo", res.data);
          //       // console.log(this.$store.state.user.userInfo)
          //       this.$router.push({ path: "/" });
          //     } else {
          //       this.$message.warning(res.message);
          //     }
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
          this.$store.dispatch("user/login",this.userLoginInfo)
        } else {
          this.$message.warning("你输入的账号密码格式有误");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-form {
  margin: 0 auto;
  margin-top: 24px;
  width: 348px;
  text-align: center;
  .el-input {
    width: 348px;
    height: 20px;
  }
  a {
    display: block;
    float: right;
    font-size: 12px;
    color: #409eff;
  }
  button {
    margin-top: 4px;
    margin-bottom: 24px;
  }
}
</style>


