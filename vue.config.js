const { defineConfig } = require('@vue/cli-service')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    // 入口文件
    index: {
      entry: 'src/main.js'
    }
  },
  // lintOnSave: true,      // 关闭语法检查

  /** 自定义 Webpack 配置 */
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },

  devServer: {
    proxy: {
      '/h3': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/h3': '' },    // 请求路径中的 /h3 去掉
        // ws: true,          // 用于支持 websocket
        /** changeOrigin 通俗的说 如果为true 则会像服务器撒谎 把自己的地址改变为 请求的后端服务器的 host 建议
         * 如果为否 则不撒谎 为自己的 host
         */
        changeOrigin: true // 用于控制请求头中的 host的值 
      }
      // ,
      // '/hat2': {
      //   target: 'http://localhost:8001',
      // }
    }
  },
  /** 简单版 */
  // devServer: {
  //   proxy: 'http://localhost:8000'
  // },
})
