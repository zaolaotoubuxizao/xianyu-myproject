<template>
    <el-row type="flex">
        <el-col :span='6'>航空信息</el-col>
        <el-col :span='6'>起飞时间</el-col>
        <el-col :span='6'>到达时间</el-col>
        <el-col :span='6'>价格</el-col>
    </el-row>   
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.el-row{
    height: 38px;
    border: 1px solid #ddd;
    background-color: #f6f6f6;
    margin-bottom: 12px;
    .el-col{
        color: #717780;
        line-height: 38px;
        text-align: center
    }
}
</style>


