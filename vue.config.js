const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  baseUrl: './',
  css: {
    // 自动加载
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme',
          './src/assets/stylus/variables.styl',
          './src/assets/stylus/mixin.styl',
        ]
      },
      // 修改基数
      postcss: {
        plugins: [
          require('postcss-px2rem')({ remUnit: 64 }), // 换算的基数
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    },
  },
  // 配置别名
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_com', resolve('src/components'))
      .set('_api', resolve('src/api'))
      .set('_views', resolve('src/views'))
      .set('_assets', resolve('src/assets'))
  },
}
