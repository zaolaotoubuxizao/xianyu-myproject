<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @sendNewData="handleFlightsList" />

        <!-- 航班头部布局 -->
        <FlightsListHead/>

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <!-- size-change：切换条数时候触发 -->
        <!-- current-change: 页数切换时候触发 -->
        <!-- current-page: 当前页数 -->
        <!-- page-size: 当前页面的条数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="flightData.flights.length"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  // 注册组件
  components: {
    FlightsListHead,
    FlightsFilters,
    FlightsItem,
    FlightsAside
  },
  data() {
    return {
      flightData: {
        flights: [],
        info: {},
        options: {}
      }, //航班总数居
      // 用于缓存大数据，一旦赋值后不能被更改，将此数据传入筛选组件
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      },

      pageNum: 1,
      pageSize: 4,
      total: 0
    };
  },
  computed: {
    // 使用计算属性监听航班列表数据的变化，假如发生变化则重新计算切割数据列表，达到分页效果
    dataList() {
      // 切割的索引开始=当前页*页容量，切割的数量=当前页码数*页容量
      return this.flightData.flights.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageSize * this.pageNum
      );
    } // 航班列表数据，用于循环flightItem组件
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.pageNum=1
      this.$axios({
        url: "airs",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flightData = res.data;
        // 下面的值赋值之后不能被修改，展开得到新的对象
        this.cacheFlightsData = { ...res.data };
        // this.dataList = res.data.flights;
      });
    },
    // 改变页容量
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum=1
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.pageNum = val;
    },
    // 接收子组件传递过来的刷选的数据，进行赋值渲染
    handleFlightsList(data){
      this.flightData.flights=data
      this.pageNum=1
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>