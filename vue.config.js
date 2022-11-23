const {resolve} = require("@babel/core/lib/vendor/import-meta-resolve");
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    // 代理配置
    proxy: {
      // 这里的api 表示如果我们的请求地址有/api的时候,就出触发代理机制
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn/', // 我们要代理请求的地址
        // 路径重写
       /* pathRewrite: {
          // 路径重写  localhost:8888/api/login  => www.baidu.com/api/login
          '/api': '' // 假设我们想把 localhost:8888/api/login 变成www.baidu.com/login 就需要这么做
        },*/
      },
    }
  }
})
