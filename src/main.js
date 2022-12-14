import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入仓库
import store from './store'

// 三级联动组件————全局组件
import TypeNav from '@/components/TypeNav'
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  // 组件实列身上多了一个$store 属性
  store
}).$mount('#app')
