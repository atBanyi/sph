import Vue from "vue";
import Vuex from 'vuex'
// 引入小仓库
import home from './home'
import search from './search'
// 需要使用插件一次
Vue.use(Vuex)

// state 是仓库存储数据的地方
export const state={ // 初始化状态 这里放置的状态可以被多个组件共享
count:1
}
// mutation 是修改state的唯一手段
export const mutations={
ADD(state){
    state.count++
}
}
// action:处理actions可以书写自己的业务逻辑,不能修改state，也可以处理异步
export const actions={
add(commit){
    commit("ADD")
}
}
// getters ：理解为计算属性,用于简化仓库数据，让组件获取仓库更加方便
export const getters={

}
//对外暴露store 的一个实列
export default new Vuex.Store({
  modules:{
      // 注册小仓库模块
      home,
      search
    /*  state, // 状态
      mutations, // 包含多个更新state函数的对象
      actions, // 包含多个队形事件回调函数的对象
      getters // 包含多个getter计算属性函数的对象*/
  }
})
