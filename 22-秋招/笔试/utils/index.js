/**
 * 生成随机颜色
 * @returns random color
 */
const generateRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

/**
 * 随机打乱数组
 * @param {[]any} arr 需要随机打乱的数组
 * @returns 随机打乱后的数组
 */
const shuffleArray = (arr = []) => arr.sort(() => Math.random() - 0.5);

/**
 * 复制到剪切板
 * @param {string} text 复制的文本
 * @returns 复制状态
 */
const copyToClipboard = (text = "") =>
  navigator.clipboard &&
  navigator.clipboard.writeText &&
  navigator.clipboard.writeText(text);

/**
 * 检测暗色主题
 * @returns 是否为暗色主题
 */
const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

/**
 * 滚动到底部
 * @param {HTMLElement} element 需要滚动到底部的元素
 * @returns
 */
const scrollToBottom = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "end" });

/**
 * 等待函数
 * @param {number} ms 等待毫秒数
 * @param {function} fn 需要执行的函数
 * @returns
 */
const wait = async (ms = 1000, fn) =>
  await new Promise((resolve) =>
    setTimeout(() => {
      fn && resolve(fn());
    }, ms)
  );

wait(5000);
console.log(1000);
