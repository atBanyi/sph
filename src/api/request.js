// 对axios二次封装
import axios from "axios";
// 1.利用axios的方法去创建一个axios的实列
// 引入进度条
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
// 引入进度条的样式
// start 代表进度条开始 done 代表进度条结束
// requests就是axios
const requests=axios.create({
    // 配置对象
    // 基础路径，发送请求时，路径当中会出现api
    baseURL:"/api",
    // 请求超过5秒就超时
    timeout:5000
})
// 请求拦截器：再发送请求之前，请求拦截器可以检测到，可以在请求发出去之前实现一些功能
requests.interceptors.request.use((config)=>{
    // config 配置对象，对象里面有一个属性很重要，header请求头
    console.log("发送请求")
    nprogress.start();// 请求时进度条开始
    return config;
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器相应的数据回来以后，相应拦截器就可以监测到，可以做一些事情
    // 进度条结束
    console.log("响应请求")
    nprogress.done();// 进度条结束
    return res.data;
},(error => {
    // 服务器响应失败的回调函数
    return Promise.reject(new Error('fail-响应失败'))
}))
// 对外暴露
export default requests;
