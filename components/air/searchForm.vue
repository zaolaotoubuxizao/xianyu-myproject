<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="searchForm.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="searchForm.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker 
        type="date" 
        placeholder="请选择日期" 
        style="width: 100%;" 
        v-model="searchForm.departDate"
        @change="handleDate"
        value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      searchForm: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {},

    // 出发城市输入框获得焦点时触发
    // value 是输入框的值，cb是回调函数，必须返回一个数组，里面每一项是有value的对象，接收要展示的列表
    queryDepartSearch(value, cb) {
      if (!value) {
        return cb([]);
      }
      // 请求城市的列表
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res);
        // 推荐列表的数据
        const { data } = res.data;
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        if(newData.length > 0){
            // 默认选择第一个
            this.searchForm.departCity = newData[0].value;
            this.searchForm.departCode=newData[0].sort;
            cb(newData);
        }else{
            cb([])
        }
      });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      if (!value) {
        return cb([]);
      }
      // 请求城市的列表
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res);
        // 推荐列表的数据
        const { data } = res.data;
        // 新增一个对象有value的数组，且将市去掉
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        // console.log(newData)
        // 默认选择第一个
        this.searchForm.destCity = newData[0].value;
        this.searchForm.destCode=newData[0].sort;
        cb(newData);
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
        // 将新选择的城代名和代码初始化到表单中
        this.searchForm.departCity = item.value;
        this.searchForm.departCode=item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
        // 将新选择的城代名和代码初始化到表单中
        this.searchForm.destCity = item.value;
        this.searchForm.destCode=item.sort
    },

    // 确认选择日期时触发
    handleDate(value) {
        console.log(value)
    },

    // 触发和目标城市切换时触发
    handleReverse() {
        const {destCity,destCode,departCity,departCode}=this.searchForm
        this.searchForm.departCity=destCity
        this.searchForm.departCode=destCode
        this.searchForm.destCity=departCity
        this.searchForm.destCode=departCode
    },

    // 提交表单是触发
    handleSubmit() {
        // console.log(this.searchForm)
        // 验证表单非空
        const rules={
            departCity:{
                value:this.searchForm.departCity,
                message:'请选择出发城市'
            },
            destCity:{
                value:this.searchForm.destCity,
                message:'请选择到达城市'},
            departDate:{
                value:this.searchForm.departDate,
                message:'请选择出发时间'}
        }
        // 设置一个开关变量
        var flag=false;
        // 调用原生的对象的方法获取每一个键
        // console.log(Object.keys(rules))
        Object.keys(rules).forEach(v => {
            if(flag) return;
            if(!rules[v].value){
                flag=true;
                this.$confirm(rules[v].message,"提示",{
                    type:'warning',
                    confirmButtonText: '确定',
                    showCancelButton: false,
                })
            }
        });
        if(!flag){
          // 将搜索历史存入本地储存
          const arr= JSON.parse(localStorage.getItem("searchAirData"))||[];
          if(arr.length===4){
            arr.pop()
          }
          arr.unshift(this.searchForm)
          localStorage.setItem("searchAirData",JSON.stringify(arr))
            this.$router.push({
                path:'/air/flights',
                query:this.searchForm
            }) 
        }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
