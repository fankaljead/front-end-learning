# 第3章 DOM

## 3.1 文档： DOM 中的 “D”

**D**ocument

## 3.2 对象：DOM 中的 “O”

JavaScript 语言中的对象可以分为三种类型

- 用户自定义对象 user-defined object
- 内建对象 native object
- 宿主对象 host object

## 3.3 模型：DOM 中的 “M”

DOM 把一份文档表示出为一棵树

- `<html>`
    - `<head>`
        - `<meta>`
        - `<title>`
    - `<body>`
        - `<div>`
        - `<p>`

## 3.4 节点

文档是由节点 node 构成的集合

- 元素节点 element node
- 文本节点 text node
- 属性节点 attribute node
- CSS 

## 3.5 获取和设置属性

选取元素后，可以设法获取他的各个属性

- `getAttribute(attribute)`
- `setAttribute(attribute, value)`