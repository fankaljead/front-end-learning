var a = 123456.6789;
console.log(a.toLocaleString()); // 123,456.679 默认 3 位 小数

console.log(
  a.toLocaleString("zh", {
    minimumFractionDigits: 5,
    maximumFractionDigits: 5,
    minimumIntegerDigits: 10,
    style: "currency",
    currency: "CNY",
  })
);

// https://juejin.cn/post/7136864563172999176
