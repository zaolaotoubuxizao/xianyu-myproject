<template>
  <div>
    <!--头部组件 -->
    <Header></Header>
    <!-- 内容占位符（组件） -->
    <nuxt />
    <!-- 脚步组件 -->
    <Footer></Footer>
  </div>
</template>
<script>
// 引入头部脚步组件
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,
ol,
li {
  list-style: none;
}
input,a{
  outline: none;
}
a {
  color: #000;
  text-decoration: none;
}
a:hover {
  color: #409eff;
}
</style>
