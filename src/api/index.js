/*
对所有的api接口进行统一管理
* */
import requests from "@/api/request";
import mockRequests from "@/api/mockAjax";
// 三级联动接口
// /api/product/getBaseCategoryList get 请求 无参数
export const reqCategoryList = () => {
    // 发送请求:axios返回的对象是Promise对象
    return requests({
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
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor
export const reqFloorList = () => mockRequests.get('/floor')
// 获取搜索模块的数据 地址：/api/list  请求方式 post 需要带参数
/*
{
 "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/

// 需要接收外部数据传递的参数
// 当前这个接口，给服务器传递参数params,至少是一个空对象
export const reqGetSearchInfo=(params)=>requests({
    url:'/list',
    method:"post",
    data:params
})

// 获取商品详情页数据获取
export const reqGoodsInfo=(skuId)=>requests({
    url:`/item/${skuId}`,
    method:'get'
})
//将产品添加到购物车中 (获取更新某一个产品的个数)
export const reqAddOrderUpdateShopCart=(skuId,skuNum)=>requests({
    url:`/cart/addToCart/${ skuId }/${ skuNum }`,
    method:'post'
})
