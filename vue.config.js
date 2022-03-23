const path = require('path')
module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
    open: true,  //启动项目时是否自动在浏览器打开
    proxy: {
      '/api': {
        target: 'http://39.107.120.5:8088',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""  // /api/ / 凡是/api开头的地址都可以跨域
        }
      }
    }
  },

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 'primary-color': '#64BE8A'
          },
          javascriptEnabled: true
        }
      }
    },
    requireModuleExtension: true
  },

  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },

  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.less', '.css']
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/css/style/var.less')]
    }
  }
}