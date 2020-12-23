const createThemeColorReplacerPlugin = require('./config/plugins/color-replacer')

module.exports = {
    // 部署应用包时的基本URL
    // process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/'
    publicPath: '/',

    // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
    // 注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
    outputDir: 'dist',

    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: '',

    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',

    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
    // 然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。
    // 如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
    filenameHashing: true,

    // 在 multi-page 模式下构建应用。
    pages: undefined,

    // Type: boolean | 'warning' | 'default' | 'error'
    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
    // process.env.NODE_ENV !== 'production'
    lintOnSave: 'warning',

    // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    runtimeCompiler: false,

    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    transpileDependencies: [],

    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,

    // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
    crossorigin: undefined,

    // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
    // 如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
    integrity: false,

    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
    // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
    configureWebpack: () => {

    },

    // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    chainWebpack: (config) => {
        // 颜色替换器插件
        config.plugin('colorReplacer').use(createThemeColorReplacerPlugin())
    },

    css: {
        // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。
        // 设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
        requireModuleExtension: true,

        // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
        // 生产环境下是 true，开发环境下是 false
        extract: false,

        // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
        sourceMap: false,

        // 向 CSS 相关的 loader 传递选项
        // 支持的 loader 有：css-loader postcss-loader sass-loader less-loader stylus-loader
        loaderOptions: {
            less: {
                lessOptions: {
                    // 修改全局less变量
                    // https://cli.vuejs.org/zh/guide/css.html
                    modifyVars: {},
                    // css中开启js支持
                    javascriptEnabled: true
                }
            }
        }

    },

    // 所有 webpack-dev-server 的选项都支持
    // 有些值像 host、port 和 https 可能会被命令行参数覆写。
    // 有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。
    devServer: {
        // host
        host: 'localhost',

        // port
        port: 8088,

        // https
        https: false,

        // hotOnly
        hotOnly: false,

        // open
        open: false,

        disableHostCheck: true, // 内网穿透

        // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
        proxy: {
            '/api': {
                target: 'http://localhost:80',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'http://localhost:80'
                }
            },
            '/api/v2': {
                target: '<other_url>'
            }
        },
    },

    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: require('os').cpus().length > 1,

    //向 PWA 插件传递选项。
    pwa: {},

    // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
    pluginOptions: {}

}