import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入仓库
import store from './store'

// 三级联动组件————全局组件
import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carsousel.name,Carsousel)
Vue.component(Pagination.name,Pagination)
// 引入mockServer.js ---mock数据
import '@/mock/mockServer'
// 引入swiper的样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus=this;
  },
  router,
  // 组件实列身上多了一个$store 属性
  store,
}).$mount('#app')
