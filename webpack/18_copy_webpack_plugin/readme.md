## css-loader

- 安装

```sh
npm i -D css-loader
```

- 配置

  - 行内 loader
    ```js
    import "css-loader!../css/login.css";
    ```
  - 配置文件中

    ```js
    const path = require("path");

    module.exports = {
      entry: "./src/index.js",
      output: {
        filename: "build.js",
        path: path.resolve(__dirname, "dist"), // 这里必须为绝对路径
      },
      module: {
        rules: [
          {
            test: /\.css$/, // 一般为一个正则表达式，用于匹配需要处理的文件类型
            use: [
              {
                loader: "css-loader",
              },
            ],
          },
        ],
      },
    };
    ```

## style-loader

- 安装

```sh
npm i -D style-loader
```

- **注意**
  `use` 属性的 `loader` 执行顺序为从右往左，或者是从下往上

- 作用 
  `style-loader` 会在 `head` 标签前添加一个 `style` 标签，并把样式放在里面


## Less Loader
- 安装
```sh
npm i -D less
npm i -D less-loader
```


## browserslistrc

1. 工程化
2. 兼容性： CSS JS 
3. 如何实现兼容
4. 到底要兼容哪些平台
  - [caniuse](https://caniuse.com)
  - >1%
  - default
  - dead
  - last 2 version

- 安装 
```sh
npm i -D browserslist
```

- 配置
  - `webpack.config.js` 中增加 `browseslist` 属性
    ```js
    browserslist: [">%1", "last 2 version", "not dead"],
    ```
  - 全局增加 `.browserslistrc` 配置文件
    ```
    >1%
    last 2 version
    not dead
    ```

## postcss
[postcss 工作流程](https://www.bilibili.com/video/BV1iv411N7jg?p=9&spm_id_from=pageDriver)

- 为什么需要 PostCSS？
  - PostCSS 是通过 JS 转换样式的工具 
  - less-loader -> css -> css-loader

- 安装
```sh
npm i -D postcss
```

- 不能直接在命令行中使用，需要安装 `postcss-cli`
```sh
npm i -D postcss-cli
```

[autoprefixer](https://autoprefixer.github.io/)

- `postcss` cli 使用
```sh
npx postcss -o ret.css ./src/css/test.css
```
这里相当于独立的工具，需要加上相应插件
```sh
npm i -D autoprefixer
```

重新使用 `postcss` cli 工具转换 css
```sh
npx postcss --use autoprefixer -o ret.css ./src/css/test.css
```

添加厂商前缀的 css 代码如下：
```css
.title {
  display: grid;
  transition: all .5s;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  /* background: linear-gradient(to bottom, white, black); */
}
```

- postcss
  - postcss-cli
  - autoprefixer


## PostCSS Loader
- 安装
```sh
npm i -D postcss-loader
```

- 配置
`postcss-loader` 应该在 `css-loader` 之前工作
```js
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
        ],
      },
    ],
  },
```

- postcss-preset-env 适配最新的 CSS 语法 （例如 rgba ）
  - 安装 
    ```sh
    npm i -D postcss-preset-env
    ```
  - 预设 插件的集合
  - 配置
    ```js
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    require("autoprefixer"),
                    require("postcss-preset-env"),
                  ],
                },
              },
            },
          ],
        },
    },
    ```
  - `autoprefixer` 已经包含到 `postcss-preset-env` 中，而且这里可以简写成字符串形式，不需要写 `require`
    ```js
      module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    "postcss-preset-env",
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    ```
- 处理 less 文件，放在 `less-loader` 左边
```js
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  // require("autoprefixer"),
                  // require("postcss-preset-env"),
                  "postcss-preset-env",
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          ,
          "less-loader",
        ],
      },
    ],
  },
```
但是这样导致相同的配置写了两遍，产生冗余

这里使用全局的 `postcss.config.js` 配置，内容如下：
```js
module.exports = {
  plugins: [require("postcss-preset-env")],
};
```

然后修改 `webpack.config.js` ，只需要把 `postcss-loader` 的地方写成 `postcss-loader` 即可
```js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
```


## Import Loaders
- 现在的问题在于直接在 css 文件中引入其他 css 文件的样式，postcss 并不会生效
 - 已知
  1. login.css @ import test.css
  2. login.css 可以被匹配，当他匹配到之后 postcss-loader 进行工作
  3. 基于当前代码，postcss-loader 拿到了 login.css 代码后分析基于我们的筛选条件，并不需要额外处理
  4. 最终将代码直接交给 css-loader
  5. 此时 css-loader 是可以处理 @import 文件，这个时候拿到 test.css，但 loader 不会回头找 
  6. 最终将处理好的 css 代码交给 style-loader 进行展示

- 在 `css-loader` 里配置 importLoaders
```js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
    ],
  },
```
`importLoaders` 的值大小表示向后查找的 loader 数量


## File Loader
打包图片：
  - img src
  - background url

- 安装 
```sh
npm i -D file-loader
```

- 配置
```js
{
  test: /\.(png|svg|gif|jpe?g)$/,
  use: ["file-loader"],
},
```

- 图片展示需要
  - 使用 `require` 导入图片， 需要添加 `.default` 
  - 配置 `file-loader` 的 `options` 的 `esModule: false`
    ```js
    {
      test: /\.(png|svg|gif|jpe?g)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            esModule: false, // 不转为 esModule
          },
        },
      ],
    },
    ```
  - 使用 emModule 直接导入
    ```js
    import oImgSrc from "../img/cartoon-girl-2018-7.jpg";

    oImg.src = oImgSrc;
    ```

  - css-loader 在读取 `background-image` 的 `url` 时会使用 `require` 语法，会导致背景图片展示失败，解决办法是在 css-loader 中配置 `esModule: false`
  ```js
   {
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: { importLoaders: 1, esModule: false },
        },
        "postcss-loader",
      ],
      },
  ```


## File Loader Config
- 自定义图片名称
- 自定义图片路径

- file-loader `options` `name` 占位符
  - `[ext]`: 扩展名
  - `[name]`: 文件名
  - `[hash]`: 文件内容
  - `[contentHash]`: 
  - `[hash:<length>]`
  - `[path]`: 

- 例如 
  ```js
    {
    test: /\.(png|svg|gif|jpe?g)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[hash:6].[ext]", // 占位符
        },
      },
    ],
  },
  ```
  然后执行 
  ```sh
  npm run build
  ```
  生成的 `dist` 目录如下
  ```sh
  ❯ ll dist
  .rw-r--r-- zxh users 5.1 KB Fri Nov 12 14:18:43 2021  build.js
  .rw-r--r-- zxh users  61 KB Fri Nov 12 14:18:43 2021  cartoon-girl-2018-7.7f1367.jpg
  ```

- 加上 `outputPath` 图片存放的位置，例如：
```js
{
  test: /\.(png|svg|gif|jpe?g)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[hash:6].[ext]", // 占位符
        outputPath: "img",
      },
    },
  ],
},
```
或者直接写到 `name` 里面：
```js
{
  test: /\.(png|svg|gif|jpe?g)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "img/[name].[hash:6].[ext]", // 占位符
      },
    },
  ],
},
```


打包后的 `dist` 目录如下：
```sh
❯ ll dist
.rw-r--r-- zxh users 5.1 KB Fri Nov 12 14:22:34 2021  build.js
drwxr-xr-x zxh users 4.0 KB Fri Nov 12 14:22:34 2021  img
❯ ll dist/img
.rw-r--r-- zxh users 61 KB Fri Nov 12 14:22:34 2021  cartoon-girl-2018-7.7f1367.jpg
```

## url-loader
- 安装
```sh
npm i -D url-loader
```

这是 `dist` 里面没有生成的 img 图片
- url-loader 把当前图片打包成 base64 格式
- file-loader 为拷贝

1. url-loader base64 uri 加入文件中，减少请求次数
2. file-loader 将资源拷贝至指定目录，分开请求
3. url-loader 内部其实也可以调用 file-loader 
4. `limit` 

```js
{
  test: /\.(png|svg|gif|jpe?g)$/,
  use: [
    {
      loader: "url-loader",
      options: {
        name: "img/[name].[hash:6].[ext]", // 占位符
        limit: 25 * 1024,
      },
    },
  ],
},
```

## asset module
webpack5 新增

asset module type

1. asset/resource --> file-loader (输出路径)
2. asset/inline   --> url-loader (所有 data uri)
3. asset/source   --> raw-loader
4. asset (parser)

- 全局配置
  在 `output` 里面设置 `assetModuleFilename` 设置图片路径，最后的文件类型不需要加上 `.`
  ```js
  output: {
    filename: "build.js",
    publicPath: " /dist/",
    path: path.resolve(__dirname, "dist"), // 这里必须为绝对路径
    assetModuleFilename: "img/[name].[hash:4][ext]",
  },
  ```

- 局部配置
  ```js
  {
    test: /\.(png|svg|gif|jpe?g)$/,
    type: "asset/resource",
    generator: {
      filename: "img/[name].[hash:4][ext]",
    },
  },
  ```

- 大小控制
  ```js
    {
    test: /\.(png|svg|gif|jpe?g)$/,
    type: "asset",
    generator: {
      filename: "img/[name].[hash:4][ext]",
    },
    parser: {
      dataUrlCondition: {
        maxSize: 25 * 1024,
      },
    },
  },
  ```


## pack font
- 字体下载 [icon font](https://icofont.com/process/download?type=1&uid=1636777496)
- 配置
  ```js
    {
    test: /\.(ttf|woff2?)$/,
    type: "asset/resource",
    generator: { filename: "font/[name].[hash:3][ext]" },
  },
  ```


## Plugin
1. loader: 特定类型 转换
2. plugin: 做更多事情 ()

- index.js
  - a.css --> css-loader 
  -                  --> plugin  ---> css 压缩
  - b.css --> css-loader 

- clean-webpack-plugin
  - 安装 
    ```sh
    npm i -D clean-webpack-plugin
    ```
  - 配置 本质上相当于自定义一个 `class` 
    ```js
    class MyPlugin {
      constructor() {

      }
      apply() {

      }
    }
    ```
    - 导入
      ```js
      const { CleanWebpackPlugin } = require("clean-webpack-plugin");
      ```
    - `webpack.config.js` 配置
      ```js
      plugins: [
        new CleanWebpackPlugin() // 参数查看相应插件官网
      ],
      ```

## html plugin
**作用**: 

- 安装
  ```sh
  npm i -D html-webpack-plugin
  ```

- 说明
  - 安装后会自动生成 `index.html` 

- 配置
  - 导入
    ```js
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    ```
  - 配置
    ```js
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "17 Webpack5 Html Plugin",
        template: "./public/index.html",
      }),
    ],
    ```
     
- 定义常量插件 `define-plugin` webpack 自带
  ```js
  const { DefinePlugin } = require("webpack");
  plugins: [
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
  ],
  ```

## copy plugin
我们不期望对 `public` 目录的静态资源进行打包操作，而是直接拷贝

- 安装
  ```sh
  npm i -D copy-webpack-plugin
  ```

- 配置
  - 导入
    ```js
    const CopyWebpackPlugin = require("copy-webpack-plugin");
    ```

  - 配置 `plugins`
    ```js
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            // to: "dist"
            globOptions: {
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
    ]
    ```