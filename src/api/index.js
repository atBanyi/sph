/*
对所有的api接口进行统一管理
* */
import requests from "@/api/request";
import mockRequests from "@/api/mockAjax";
// 三级联动接口
// /api/product/getBaseCategoryList get 请求 无参数
export const reqCategoryList = () => {
    // 发送请求:axios返回的对象是Promise对象
   return  requests({
            url: '/product/getBaseCategoryList',
            method: 'get',
        }
    )
 /*
 export const reqCategoryList = (callBack) => {
 requests({
            url: '/product/getBaseCategoryList',
            method: 'get',
        }
    ).then(r => {
        callBack(r)
    })*/
}


//获取banner (Home 首页轮播图接口)
export const reqGetBannerList = () =>mockRequests.get('/banner')

