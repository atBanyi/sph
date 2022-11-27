<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
<!--在Home,Search 显示，在登陆和注册页面隐藏-->
<!--<Footer v-show="$route.path=='/home'||$route.path=='/search'"/>-->
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    Header
  },
  mounted() {
    // 派发一个action||获取商品分类的三级联动数据
  // 1. 挂载完毕的生命周期的钩子，当三级联动组件挂载到页面上时向Vuex发送数据
  //  通知Vuex发送请求，获取数据存储于home仓库中
  this.$store.dispatch('home/categoryList')
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
