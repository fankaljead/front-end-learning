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