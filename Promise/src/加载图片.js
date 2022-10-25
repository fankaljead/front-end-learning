// 现有8个图片资源的url，已经存储在数组urls中，且已有一个函数function loading，
// 输入一个url链接，返回一个Promise，
// 该Promise在图片下载完成的时候resolve，下载失败则reject。
// 要求：任何时刻同时下载的链接数量不可以超过3个。
// 请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。

var urls = [
    "https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg",
    "https://www.kkkk1000.com/images/getImgData/gray.gif",
    "https://www.kkkk1000.com/images/getImgData/Particle.gif",
    "https://www.kkkk1000.com/images/getImgData/arithmetic.png",
    "https://www.kkkk1000.com/images/getImgData/arithmetic2.gif",
    "https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg",
    "https://www.kkkk1000.com/images/getImgData/arithmetic.gif",
    "https://www.kkkk1000.com/images/wxQrCode2.png",
];

function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            console.log("一张图片加载完成");
            resolve();
        };
        img.onerror = reject;
        img.src = url;
    });
}
