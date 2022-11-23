import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
// 先把vueRouter原型对象上的push，先保存一份
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
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {
                isShow: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                isShow: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                isShow: false
            },
        },
        {// 进行占位
            // 可传可不传： 参数后面加上问号？ 代表params参数可传可不传
            // 传递是空串解决：使用undefined解决 params 参数可以传递，不传递（空字符串）
            path: '/search/:keyword?',
            component: Search,
            meta: {
                isShow: true
            },
            name: 'search',
            // 路由组件能不能传递props数据？能
            // 布尔值写法 ：params:true
            props: true,
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
});

