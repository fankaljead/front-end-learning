

1. ```js
    const promise = new Promise((resolve, reject) => {
        console.log(1)
        resolve()
        console.log(2)
    })
    promise.then(() => {
        console.log(3)
    })
    console.log(4)
    ```

    输出：

    ```sh
    1
    2
    4
    3
    ```

    解析：
    Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的。

2. ```js
    const first = () => (new Promise((resolve, reject) => {
        console.log(3);
        let p = new Promise((resolve, reject) => {
            console.log(7);
            setTimeout(() => {
                console.log(5);
                resolve(6);
            }, 0)
            resolve(1);
        });
        resolve(2);
        p.then((arg) => {
            console.log(arg);
        });
    
    }));
    
    first().then((arg) => {
        console.log(arg);
    });
    console.log(4);
    ```

    解析：
    这道题主要理解js执行机制。

    第一轮事件循环，先执行宏任务，主script，new Promise立即执行，输出 3，执行p这个new Promise操作，输出  7，发现setTimeout，将回调函数放入下一轮任务队列（Event  Quene），p的then，暂且命名为then1，放入微任务队列，且first也有then，命名为then2，放入微任务队列。执行console.log(4),输出 4，宏任务执行结束。

    再执行微任务，执行then1,输出 1，执行then2,输出 3.

    第一轮事件循环结束，开始执行第二轮。第二轮事件循环先执行宏任务里面的，也就是setTimeout的回调，输出 5.resolve(6)不会生效，因为p的Promise状态一旦改变就不会再变化了。

3. 