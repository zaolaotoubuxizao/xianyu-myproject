<template>
  <el-form :model="registerForm" :rules="rules" ref="registerForm" class="demo-ruleForm">
    <el-form-item prop="username">
      <el-input v-model="registerForm.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-input v-model="registerForm.captcha" placeholder="验证码">
        <el-button type="info" slot="append" @click="getCaptcha">发送验证码</el-button>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input v-model="registerForm.nickname" placeholder="你的名字"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkpassword">
      <el-input type="password" v-model="registerForm.checkpassword" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-row>
      <el-button type="primary" class="registerBtn" style="width:348px" @click="registerSubmit">注册</el-button>
    </el-row>
  </el-form>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkpassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkpassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    registerSubmit() {
      this.$refs.registerForm.validate(valid=>{
        console.log(valid)
        if(valid){
          let { checkpassword, ...registerForm } = this.registerForm;
          // console.log(registerForm)
          this.$store.dispatch("user/register", registerForm);
        }else{
          console.log(this.rules)
        }
      })
    },
    getCaptcha() {
      if(!this.registerForm.username){
        this.$message.warning('请输入手机号')
        return
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: this.registerForm.username }
      }).then(res => {
        // console.log(res)
        this.$confirm(`您获取的验证码为${res.data.code}`, "提示",{
          style:"info",
          confirmButtonText:'确定',
          showCancelButton:false,
        } )
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
  .registerBtn {
    margin-bottom: 24px;
  }
}
</style>
