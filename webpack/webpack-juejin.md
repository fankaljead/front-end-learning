# Webpack

## 1. 概念篇

### 1.1 Webpack 是什么

Webpack 是一种前端资源构建工具，一个静态模块打包器。

- **前端资源构建工具：** 主要理解一下这个前端资源是哪些资源。这些前端资源就是浏览器不认识的 web 资源， 比如 sass、less、ts，包括 js 里的高级语法。这些资源要能够在浏览器中正常工作，必须一一经过编译处理。而 webpack 就是可以集成这些编译工具的一个总的构建工具。
- **静态模块打包器：** 静态模块就是 web 开发过程中的各种资源文件，webpack 根据引用关系，构建一个依赖关系图，然后利用这个关系图将所有静态模块打包成一个或多个 bundle 输出。

### 1.2 为什么需要 Webpack

回答这个问题，可以和还没有 Webpack、没有构建工具时对比一下，就能明显地感觉出来了。这里就来列举一下不使用构建工具时的痛点。

- web 开发时调用后端接口跨域，需要其他工具代理或者其他方式规避。
- 改动代码后要手动刷新浏览器，如果做了缓存还需要清缓存刷新。
- 因为 js 和 css 的兼容性问题，很多新语法学习了却不能使用，无论是开发效率和个人成长都受影响。
- 打包问题。需要使用额外的平台如 jekins 打包，自己编写打包脚本，对各个环节如压缩图片，打包 js、打包 css 都要一一处理。 ......

而这些问题，Webpack 都提供了解决方案，你只需要做一些简单的配置就可以上手使用了。当然，Webpack 做的还不止这些。

## 2. 使用篇

### 2.1 Webpack 核心配置

#### 2.1.1 `entry`

**入口（entry）**：指示 Webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

```js
// string方式： 单入口，打包形成一个chunk，输出一个buldle文件。chunk的名称默认是main.js
entry: "./src/index.js",
// array方式：多入口，所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
entry: ["./src/index.js", "./src/test.js"],
// object：多入口，有几个入口文件就形成几个chunk，输出几个bundle文件。此时chunk的名称就是对象key值
entry:{
    index: "./src/index.js",
    test: "./src/test.js",
}
```

#### 2.1.2 `output`

**输出（output）**：指示 Webpack 打包后的资源 bundles 输出到哪里，以及如何命名。

```js
output: {
    // 输出文件目录（将来所有资源输出的公共目录，包括css和静态文件等等）
    path: path.resolve(__dirname, "dist"), //默认
    // 入口文件名称（指定名称+目录）
    filename: "[name].js", // 默认
    // 所有资源引入公共路径前缀，一般用于生产环境，小心使用
    publicPath: "",
    /* 
    非入口文件chunk的名称。所谓非入口即import动态导入形成的chunk或者optimization中的splitChunks提取的公共chunk
    它支持和 filename 一致的内置变量
    */
    chunkFilename: "[contenthash:10].chunk.js",
    clean: true, // 打包前清空输出目录，相当于clean-webpack-plugin插件的作用,webpack5新增。
    /* 当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到library */
    library: {
        name: "[name]",//整个库向外暴露的变量名
        type: "window"//库暴露的方式
    }
},
```

#### 2.1.3 `loader`

**Loader：**Webpack 自身只能理解 JavaScript 和 json 文件，loader 让 Webpack 能够处理其他文件。
 这里列举几类常见文件的loader配置。

```js
rules: [
    {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理。执行顺序，从右至左，从下至上
        use: [
            // 创建style标签，将js中的样式资源（就是css-loader转化成的字符串）拿过来，添加到页面head标签生效
            "style-loader",
            // 将css文件变成commonjs一个模块加载到js中，里面的内容是样式字符串
            "css-loader",        
             {

                 // css 兼容处理 postcss，注意需要在package.json配置browserslist
                 loader: "postcss-loader",
                 options: {
                     postcssOptions: {
                         ident: "postcss",
                         // postcss-preset-env插件：帮postcss找到package.json中的browserslist配置，根据配置加载指定的兼容性样式      
                         plugins: [require("postcss-preset-env")()],
                     },
                 },
             },
        ],
    },
    {
        test: /\.js$/,
        // 注意需要在package.json配置browserslist，否则babel-loader不生效
        // js兼容处理 babel
        loader: "babel-loader", // 规则只使用一个loader时推荐写法
        options: {
            presets: [
                [
                    "@babel/preset-env",// 预设：指示babel做怎么样的兼容处理 
                    {
                        useBuiltIns: "usage", //按需加载
                        corejs: {
                            version: "3",
                        },
                        targets: "defaults",
                    }
                ]
            ]
        }
    },
    /* 
    Webpack5.0新增资源模块(asset module)，它是一种模块类型，允许使用资源文件（字体，图标等）而无需     配置额外 loader。支持以下四个配置
    asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
    asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
    asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
    asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资     源体积限制实现。
    */
    // Webpack4使用file-loader实现
    {
        test: /\.(eot|svg|ttf|woff|)$/,
        type: "asset/resource",
        generator: {
            // 输出文件位置以及文件名
            filename: "fonts/[name][ext]"
        },
    },
    // Webpack4使用url-loader实现
    {
        //处理图片资源
        test: /\.(jpg|png|gif|)$/,
        type: "asset",
        generator: {
            // 输出文件位置以及文件名
            filename: "images/[name][ext]"
        },
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024 //超过10kb不转base64
            }
        }
    },
],
```



#### 2.1.4 `plugins`

**插件（plugins）**：可以用于执行范围更广的任务。从打包优化和压缩，一直到重新定义环境中的变量等。

```js
// CleanWebpackPlugin帮助你在打包时自动清除dist文件，学习时使用比较方便
// const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //从webpack5开始，webpack内置了该功能，只要在ouput中配置clear为true即可

// HtmlWebpackPlugin帮助你创建html文件，并自动引入打包输出的bundles文件。支持html压缩。
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 该插件将CSS提取到单独的文件中。它会为每个chunk创造一个css文件。需配合loader一起使用
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 该插件将在Webpack构建过程中搜索CSS资源，并优化\最小化CSS
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

// vue-loader V15版本以上，需要引入VueLoaderPlugin插件，它的作用是将你定义过的js、css等规则应用到vue文件中去。
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: [
                    // MiniCssExtractPlugin.loader的作用就是把css-loader处理好的样式资源（js文件内），单独提取出来 成为css样式文件
                    MiniCssExtractPlugin.loader,//生产环境下使用，开发环境还是推荐使用style-loader
                    "css-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:"index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/built.css",
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new VueLoaderPlugin(),
    ]
}
```



#### 2.1.5 `mode`

**模式（mode）**:指示 Webpack使用相应模式的配置。默认为production。
 搬一下官网的表格，还是有必要知道一下我们平常使用最多的两种模式，Webpack都做了什么。

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development. 为模块和 chunk 启用有效的名。 |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。为模块和 chunk  启用确定性的混淆名称，FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin 和 TerserPlugin 。 |
| none        | 不使用任何默认优化选项                                       |

- DefinePlugin：定义全局变量process.env.NODE_ENV，区分程序运行状态。
- FlagDependencyUsagePlugin：标记没有用到的依赖。
- FlagIncludedChunksPlugin：标记chunks，防止chunks多次加载。
- ModuleConcatenationPlugin：作用域提升(scope hosting)，预编译功能，提升或者预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度。
- NoEmitOnErrorsPlugin：防止程序报错，就算有错误也继续编译。
- TerserPlugin：压缩js代码。

#### 2.1.6 其他常用配置

- `resolve`

    ```js
    // 解析模块的规则：
    resolve: {
        // 配置 解析模块路径别名：可简写路径。
        alias: {
            "@": path.resolve(__dirname, "src")
        },
            // 配置 省略文件路径的后缀名。默认省略js和json。也是webpack默认认识的两种文件类型
        extensions: [".js", ".json", ".css"], // 新加css文件
                // 告诉webpack解析模块是去找哪个目录
                // 该配置明确告诉webpack，直接去上一层找node_modules。
        modules: [path.resolve(__dirname, "../node_modules")],
    },
    ```

    

- `devServer`

    ```js
    // devServer（开发环境下配置）：
        devServer: {
            // 运行代码的目录
            contentBase: path.resolve(__dirname, "build"),
            // 为每个静态文件开启gzip压缩
            compress: true,
            host: "localhost",
            port: 5000,
            open: true, // 自动打开浏览器
            hot: true, //开启HMR功能
            // 设置代理
            proxy: {
                // 一旦devServer(5000端口)接收到/api/xxx的请求，就会用devServer起的服务把请求转发到另外一个服务器（3000）
                // 以此来解决开发中的跨域问题
                api: {
                    target: "htttp://localhost:3000",
                    // 发送请求时，请求路径重写：将/api/xxx  --> /xxx （去掉/api）
                    pathRewrite: {
                        "^api": "",
                    },
                },
            },
        },
    ```

    

- `optimization`

    ```js
     // optimization（生产环境下配置）
        optimization: {
            // 提取公共代码
            splitChunks: {
                chunks: "all",
            },
            minimizer: [
                // 配置生产环境的压缩方案：js和css
                new TerserWebpackPlugin({
                    // 多进程打包
                    parallel: true,
                    terserOptions: {
                        // 启动source-map
                        sourceMap: true,
                    },
                }),
            ],
        },
    ```

    

### 2.2 Webpack 打包优化

#### 2.2.1 开发环境优化

- `HMR` 模块热替换
- `source-map`

#### 2.2.2 生产环境优化

- `oneOf`
- 缓存
- 多进程打包 `thread-loader`
- `extenals` 外部扩展
- `dll` 动态链接库
- `Tree Shaking` 树摇
- `Code Split` 代码分割

## 3. Webpack 原理篇

### 3.1 编写 `loader`

### 3.2 编写 `plugin`

### 3.3 手写简易 `Webpack`