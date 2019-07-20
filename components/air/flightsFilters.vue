<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option v-for="(e,i) in data.options.airport" :key="i" :label="e" :value="e"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(e,i) in data.options.flightTimes"
            :key="i"
            :label="`${e.from}:00 - ${e.to}:00`"
            :value="e"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option v-for="(e,i) in data.options.company" :key="i" :label="e" :value="e"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option v-for="(e,i) in airSizeList" :key="i" :label="e.type" :value="e.size"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  // 使用props接受父组件传递过来的数据
  props: {
    // 数据
    data: {
      type: Object,
      // 默认是空数组
      default: {}
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      airSizeList: [
        { size: "L", type: "大" },
        { size: "M", type: "中" },
        { size: "S", type: "小" }
      ]
    };
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      console.log(this.data);
      const arr = this.data.flights;
      const newData = arr.filter(e => {
        return e.org_airport_name === value;
      });
      this.$emit("sendNewData", newData);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // 使用结构的方式可以拷贝数组
      console.log(value);
      const { from, to } = value;
      const newData = this.data.flights.filter(e => {
        // if(e.dep_time.)
        let start = e.dep_time.substring(0, e.dep_time.indexOf(":"));
        // console.log(start)
        return +from <= +start && +to >= +start;
      });
      console.log(newData)
      this.$emit("sendNewData", newData);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      const newData = this.data.flights.filter(e => {
        return e.airline_name === value;
      });
      this.$emit("sendNewData", newData);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      const newData = this.data.flights.filter(e => {
        return (e.plane_size === value);
      });
      this.$emit("sendNewData", newData);
    },
    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = ""; // 机场
      this.flightTimes = ""; // 出发时间
      this.company = ""; // 航空公司
      this.airSize = "";
      this.$emit("sendNewData", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>