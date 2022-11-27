// 使用 Mock
import Mock from 'mockjs'
// 引入json数据格式，json没有暴露就直接引入进来，webpack 默认暴露 图片，json数据格式
import banner from './banner.json'
import floor from './floor.json'
// 第一个参数 请求地址，第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})
// 输出结果
