import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
Vue.use(VueRouter)
// 先把vueRouter原型对象上的push，replace先保存一份
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;
//重写push|replace方法
// 第一个参数： 告诉原来push的方法，你往哪里跳转（传递哪些参数）
// 第二个参数 ：成功的回调
// 第三个参数： 失败的回调
// call与apply区别
// 相同点：都可以调用函数一次，篡改上下文
// 不同点：call与apply传递参数；call传递参数用逗号隔开,apply,传递数组

VueRouter.prototype.push=function (location,resolve,reject){
    if (resolve&&reject){
        originPush.call(this,location,resolve,reject)
    }else {
        originPush.call(this,location,()=>{},()=>{})
    }
    alert(123)
}
VueRouter.prototype.replace=function (location,resolve,reject){
    if (resolve&&reject){
        originReplace.call(this,location,resolve,reject)
    }else {
        originReplace.call(this,location,()=>{},()=>{})
    }
    alert(123)
}

export default new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to,from,savadPosition){
        return{
            y:0
        }
    }
});

