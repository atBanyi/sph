// search模块的小仓库
import {reqGetSearchInfo} from "@/api";

const state={
searchList: {}
};
// 修改状态
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList;
    }
};
const actions={
//    获取search模块的数据
   async getSearchList({commit},params={}){
        // reqGetSearchInfo() 调用时获取服务器对象至少传递一个参数（空对象）
        // params 形参是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result= await reqGetSearchInfo(params);
        if (result.code==200){
            commit('GETSEARCHLIST',result.data)
        }
        console.log(result)
    }
};
const getters={
// 计算属性 在项目中是为了简化数据而生
// 主要作用是简化仓库中的数据
// 当前形参中的state，当前仓库中的state
    goodsList(state){
        // state.searchList.goodsList如果服务器数据回来了没有问题就是一个空数组
        // 加入网络不给力|没有网路，state.searchList.goodsList返回undefined
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    },
    attrsList(state){
        return state.searchList. attrsList;
    }
};
export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}
