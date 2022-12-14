// home模块的小仓库
import {reqCategoryList} from "@/api";


const state = {
    a: 1,
    // state默认初始值不要乱写，与服务器返回值类型一致
    categoryList: [],
};
const mutations = {// 修改state里面的状态
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    }
};
const actions = {
// 通过api里面的接口函数调用，向服务器发送请求，获取服务器数据
    // {commit}是因为要用到commit 原本是categoryList(context,value){},用commit时需要封装context.commit,{commit}可以省略context,
    // 若不需要value 则可以不写
   async  categoryList({commit}) {// 解构commit提交action
        let result =await reqCategoryList();
       console.log("result",result)
        if (result.code ==200) {// result.code==200 响应成功
            commit("CATEGORYLIST", result.data)
        }
       // reqCategoryList(data => {
       //     //运行在哪里呢你来操作
       //     console.log('aaa',data)
       //     if(data.code == 200) {
       //         commit("CATEGORYLIST", data.data)
       //     }
       // })
    }
};
const getters = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
