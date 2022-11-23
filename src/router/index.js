import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
export default new VueRouter({
    routes:[
        {
           path:'/home',
           component:Home,
            meta:{
               isShow:true
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{
                isShow:false
            }
        },
        {
            path:'/register',
            component:Register,
            meta:{
                isShow:false
            },
        },
        {// 进行占位
            path:'/search/:keyword',
            component:Search,
            meta:{
                isShow:true
            },
            name:'search',
        },
        {
            path:'*',
            redirect:'/home'
        }
    ]
})
