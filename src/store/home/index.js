// home模块的小仓库
import {reqCategoryList, reqGetBannerList,reqFloorList} from "@/api";
// 获取首页轮播图的数据

const state = {
    // state默认初始值不要乱写，与服务器返回值类型一致
    categoryList: [],
    bannerList: [],
    floorList:[],
};
const mutations = {// 修改state里面的状态
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },

//
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList=floorList
    }
};
const actions = {
// 通过api里面的接口函数调用，向服务器发送请求，获取服务器数据
    // {commit}是因为要用到commit 原本是categoryList(context,value){},用commit时需要封装context.commit,{commit}可以省略context,
    // 若不需要value 则可以不写
    async categoryList({commit}) {// 解构commit提交action
        let result = await reqCategoryList();
        console.log("result", result)
        if (result.code == 200) {// result.code==200 响应成功
            commit("CATEGORYLIST", result.data)
        }
        // reqCategoryList(data => {
        //     //运行在哪里呢你来操作
        //     console.log('aaa',data)
        //     if(data.code == 200) {
        //         commit("CATEGORYLIST", data.data)
        //     }
        // })
    },

//    获取首页轮播图数据
    async getBannerList({commit,}) {
        let result = await reqGetBannerList();
        console.log(result)
        if (result.code == 200) {// result.code==200 响应成功
            commit("BANNERLIST", result.data)
        }
    },

//    获取floor数据
    async getFloorList({commit,}) {
        let result = await reqFloorList();
        console.log(result)
        if (result.code == 200) {// result.code==200 响应成功
            commit("FLOORLIST", result.data)
        }
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
