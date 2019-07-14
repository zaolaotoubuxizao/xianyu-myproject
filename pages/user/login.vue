<template>
  <div class="login">
    <div class="contain">
      <div class="loginInput">
        <div class="loginForm">
          <div class="formTitle">
            <span>登录</span>
            <span>注册</span>
          </div>
          <el-form
            :model="userLoginInfo"
            :rules="rules"
            ref="userLoginInfo"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input v-model="userLoginInfo.username" placeholder="用户名/手机"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="userLoginInfo.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-row>
              <a href="javascript:;">忘记密码</a>
            </el-row>
          </el-form>
          <el-row>
            <el-button type="primary" style="width:348px;margin:2px 0 0 24px;" @click="loginSubmit">登录</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userLoginInfo: {
        username: "1380013800",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
      loginSubmit(){
          this.$refs.userLoginInfo.validate(valid=>{
              if(valid){
                  console.log(111)
              }else{
                  this.$message.warning()
              }
          })
      }
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
    .loginInput {
      margin: 210px auto;
      width: 400px;
      height: 282px;
      background-color: #fff;
      .formTitle {
        height: 50px;
        display: flex;
        line-height: 50px;
        span {
          cursor: pointer;
          flex: 1;
          text-align: center;
        }
        span:first-child {
          color: #ffa500;
          border-top: 3px solid #ffa500;
        }
        span:last-child {   
          background-color: #eee;
        }
      }
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
          font-size: 14px;
        }
      }
    }
  }
}
</style>
