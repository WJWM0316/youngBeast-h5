require("@babel/polyfill")
const path = require('path');
const fs = require('fs')
const configENV = require("./config.js")
const webpack = require("webpack")
const moduleDir = path.resolve(__dirname, 'src/templates')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PostcssPxToViewport = require('postcss-px-to-viewport')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [
      require('autoprefixer')(),
      require('postcss-assets')({}),
      require('postcss-px-to-viewport')({
        viewportWidth: 750 / 2,
        selectorBlackList: ['body']
      })
    ]
  }
}
const sassResourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [
      path.resolve(__dirname, 'src/assets/reset.scss'),
      path.resolve(__dirname, 'src/assets/vars.scss'),
      path.resolve(__dirname, 'src/assets/font.scss'),
      path.resolve(__dirname, `src/assets/${process.env.NODE_ENV === 'production' ? 'pro' : 'dev'}.scss`)
    ]
  }
}
const miniCssExtractPluginLoader = {
  loader:  MiniCssExtractPlugin.loader,
  options: {
    hmr: process.env.NODE_ENV === 'development',
    sourceMap: true
  }
}
const pluginsArray = (env, argv) => {
  let array = [
    ...htmlWebpackPlugin,
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      allChunks:true
    }),
    new OptimizeCSSAssetsPlugin(),
  ]
  if (argv['report']) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    array.push(
      new BundleAnalyzerPlugin({
        //  可以是`server`，`static`或`disabled`。
        //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
        //  在“静态”模式下，会生成带有报告的单个HTML文件。
        //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
        analyzerMode: 'server',
        //  将在“服务器”模式下使用的主机启动HTTP服务器。
        analyzerHost: '127.0.0.1',
        //  将在“服务器”模式下使用的端口启动HTTP服务器。
        analyzerPort: 8888, 
        //  路径捆绑，将在`static`模式下生成的报告文件。
        //  相对于捆绑输出目录。
        reportFilename: 'report.html',
        //  模块大小默认显示在报告中。
        //  应该是`stat`，`parsed`或者`gzip`中的一个。
        //  有关更多信息，请参见“定义”一节。
        defaultSizes: 'parsed',
        //  在默认浏览器中自动打开报告
        openAnalyzer: true,
        //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
        generateStatsFile: false, 
        //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
        //  相对于捆绑输出目录。
        statsFilename: 'stats.json',
        //  stats.toJson（）方法的选项。
        //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
        //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        statsOptions: null,
        logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
      })
    )
    
  }
  return array
}
module.exports = (env, argv) => {
  let entryObj = {}
      htmlWebpackPlugin = []
  const enter = argv['enter']

  // 没有指定目录则全部打包
  if (!argv['enter']) {
    let moduleItems = fs.readdirSync(moduleDir)
    moduleItems.forEach(item => {
      entryObj[item] = [path.resolve(__dirname, `src/templates/${item}/index.js`)]
      htmlWebpackPlugin.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, `src/index.html`),
          base: true,
          chunks: [item],
          filename: `${item}.html`,
          minify: { // 压缩 HTML 的配置
            collapseWhitespace: true,
            removeComments: true,
            useShortDoctype: true
          }
        })
      )
    })
  } else {
    console.log(222)
    entryObj[argv['enter']] = [path.resolve(__dirname, `src/templates/${argv['enter']}/index.js`)]
    htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `src/index.html`),
        base: true,
        chunks: [argv['enter']],
        filename: `${argv['enter']}.html`,
        minify: { // 压缩 HTML 的配置
          collapseWhitespace: true,
          removeComments: true,
          useShortDoctype: true
        }
      })
    )
  }
  


  let config = {
      entry: {
        ...entryObj
      },
      output: {
        filename: `js/[name].[contenthash:8].js`,
        chunkFilename: 'js/[name].js',
        path: path.join(__dirname, `dist`)
      },
      resolve: {
        modules: [
          path.resolve(__dirname, 'node_modules'),
        ],
        alias: {
          '@': path.resolve(__dirname, 'src'),
          'API': path.resolve(__dirname, 'src/api'),
          'CONFIG': path.resolve(__dirname, 'config'),
          'ASSETS': path.resolve(__dirname, 'src/assets'),
          'UTILS': path.resolve(__dirname, 'src/utils')
        }
      },
      module: {
        rules: [
        {
          test: /\.(jpe?g|png|gif)$/,
          loader: 'url-loader',
          options: {
            // Inline files smaller than 10 kB (10240 bytes)
            limit: 10 * 1024,
          },
        },
        {
          test: /\.svg$/,
          loader: 'svg-url-loader',
          options: {
            // Inline files smaller than 10 kB (10240 bytes)
            limit: 10 * 1024,
            // Remove the quotes from the url
            // (they’re unnecessary in most cases)
            noquotes: true,
          },
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          loader: 'image-webpack-loader',
          options: {
            optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
              enabled: true,
            },
            pngquant: { // 使用 imagemin-pngquant 压缩 png
              quality: [0, 1],
              speed: 4
            },
          }
        },
        {
          test: /\.art$/,
          use: [{
            loader: "art-template-loader"
          }]
        },
        {
          test: /\.(sc|c|le)ss$/,
          use: [
            process.env.NODE_ENV !== 'test' ? miniCssExtractPluginLoader : 'style-loader',
            "css-loader",
            "less-loader",
            "sass-loader",
            postcssLoader,
            sassResourcesLoader
          ]
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file"
        },
        {
          test: /\.(woff|woff2)$/,
          loader: "url?prefix=font/&limit=5000"
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/octet-stream"
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=image/svg+xml"
        },
        {
          test: /\.(js|js.map)$/,
          use:{
            loader:'babel-loader?cacheDirectory'
          },
          exclude: path.resolve(__dirname, 'node_modules'),
          
        }]
      },
      plugins: pluginsArray(env, argv),
      // optimization: { // 优化项
      //   splitChunks: { //分割代码块
      //     cacheGroups: { // 缓存
      //       // commons: { // 公共的代码
      //       //   name: "commons", // 抽离出来的模块名
      //       //   chunks: 'all', // 初始化，从入口文件开始抽离
      //       //   minSize: 0, // 如果这个代码大于0字节
      //       //   minChunks: 2, // 这个代码引用多少次才需要抽离
      //       // },
      //       vendors: { // 抽取第三方模块
      //         test: /node_modules/,
      //         name: 'vendor',
      //         chunks: 'all',
      //       }
      //     }
      //   }
      // }
    
  }
  // 开发环境
  if (process.env.NODE_ENV === 'test') {
    // config.devtool = 'eval'
    config.devServer = {
      //服务器的IP地址，可以使用IP也可以使用localhost
      host: '127.0.0.1',
      //服务端压缩是否开启
      compress:true,
      //配置服务端口号
      port:8090,
      hothot: true // 开启配置
    }
  } else {
    config.devtool = 'cheap-module-source-map'
  }
  return config
}
