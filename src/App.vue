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
