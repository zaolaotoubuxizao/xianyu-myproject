<template>
  <div>
    <!-- 轮播图部分 -->
    <el-carousel :interval="3000" arrow="hover" height="700px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <h3>
          <img :src="$axios.defaults.baseURL+item.url" alt="" :title="item.desc" />
        </h3>
      </el-carousel-item>
    </el-carousel>
    <!-- tab栏部分 -->
    <div class="tabs">
      <el-row type="flex" justify="start">
        <span v-for="(item,index) in tabs" :key="index" @click="handleIndex(index)" class="tabsNav" >
          <div :class="{activeColor:currentTab==index}">{{item.title}}</div>
          <i :class="{active:currentTab==index}"></i>
        </span>
      </el-row>
      <div class="searchInput">
        <el-input style="width:550px" :placeholder="inputArr[currentTab].inputMsg" clearable v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banners: [],
      tabs: [
        { title: "攻略", path: "" },
        { title: "酒店", path: "" },
        { title: "机票", path: "" }
      ],
      currentTab:0,
      inputArr:[
        {
          inputMsg:'请输入城市',
        },
        {
          inputMsg:'请输入城市搜索酒店',
        },
        {
          inputMsg:'请输入目的地',
        },
      ],
      input5: ""
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    })
      .then(res => {
        // console.log(res)
        this.banners = res.data.data;
        console.log(this.banners);
        console.dir(this.$axios.defaults.baseURL);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleIndex(index){
      this.currentTab=index
    }
  }
};
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.tabs {
  position: absolute;
  top: 35%;
  left: 35%;
  z-index: 900;
  margin: 0 auto;
  .tabsNav {
    position: relative;
    width: 82px;
    height: 36px;
    display: block;
    line-height: 36px;
    text-align: center;
    overflow: hidden;
    font-size: 18px;
    cursor:pointer;
    color: #fff;
    z-index: 900;
    div{
      position: absolute;
      z-index: 1600;
      width: 100%;
      height: 100%;
    }
    i {
      z-index: 1000;
    position: absolute;
    left: 0;
    top: 0;
    width: 81px;
    height: 441px;
    background: rgba(0, 0, 0, 0.3);
    transform: rotate(152deg);
    transform-origin: right;
    margin-top: -20px;

}
.active{
  background-color: #eeeeee;
}
.activeColor{
  color: #000;
}

    /*     &:after{
  display: block;
  width: 264px;
  height: 163px;
  background-color: red;
  transform: rotate(62deg);
  transform-origin: top right;
    } */
  }
}
// .father{
//     width: 82px;
//     height: 36px;
//     background-color: #0094ff;
//     overflow: hidden;
// }

</style>


