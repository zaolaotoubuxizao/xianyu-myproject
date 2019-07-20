<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in orderForm.users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input
              placeholder="姓名"
              v-model="orderForm.users[index].username"
              class="input-with-select"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input
              placeholder="证件号码"
              v-model="orderForm.users[index].id"
              class="input-with-select"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            @change="changeInsurances(item,index)"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="orderForm.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="orderForm.contactPhone" placeholder="请输入内容">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="orderForm.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      insurances: [],
      // 提交订单表单数据
      orderForm: {
        users: [
          {
            username: "",
            id: ""
          }
        ],
        insurances: [],
        contactName: "",
        contactPhone: "",
        invoice:false,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id,
        captcha: ""
        
      },
    };
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    
    this.$axios({
      url: "/airs/" + id,
      params: {
        seat_xid
      }
    }).then(res => {
      // console.log(res)
      //   const { users, insurances, contactName } = res.data;
      //   this.insurances = insurances;
      this.insurances = res.data.insurances;
    //   console.log(this.insurances);
    });
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      // 增加数组数据，遍历生成乘车人html结构
      this.orderForm.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.orderForm.users.splice(index, 1);
    },

    // 选中保险时触发
    changeInsurances(item, index) {
      // 判断当前保险是否已经存入id
      let flag = this.orderForm.insurances.indexOf(item.id);
      if (flag > -1) {
        // -1则代表这个数组中没有这个id
        this.orderForm.insurances.splice(index, 1);
      } else {
        this.orderForm.insurances.push(item.id);
      }
    //   console.log(this.orderForm.insurances);
    },
    // 发送手机验证码
    handleSendCaptcha() {
      if (!this.orderForm.contactPhone) {
        this.$message.warning("请输入手机号");
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: this.orderForm.contactPhone }
      }).then(res => {
        this.$confirm(`您获取的验证码为${res.data.code}`, "提示", {
          style: "info",
          confirmButtonText: "确定",
          showCancelButton: false
        });
      });
    },

    // 提交订单
    handleSubmit() {
    //   console.log(this.orderForm);
        // console.log(this.$store.state.user.userInfo.token)
        this.$axios({
            url:"/airorders",
            method:"POST",
            data:this.orderForm,
            headers:{
                // token规范来自于JWT
                Authorization: `Bearer ${ this.$store.state.user.userInfo.token }`
                }
        })
            .then(res=>{
                // console.log(res)
                this.$message.success(res.data.message)
                
            })
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>