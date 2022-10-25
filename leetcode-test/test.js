// let heightMap = [
//     [1, 4, 3, 1, 3, 2],
//     [3, 2, 1, 3, 2, 4],
//     [2, 3, 3, 2, 3, 1],
// ];
// // let heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]

// let minus = (heightMap = [[]], bouns = -1) => {
//     for (let i = 0; i < heightMap.length; i++) {
//         for (let j = 0; j < heightMap[i].length; j++) {
//             heightMap[i][j] += bouns;
//         }
//     }
// };

// let check = (heightMap = [[]], bouns = -1) => {
//     let count = 0;
//     for (let i = 0; i < heightMap.length; i++) {
//         for (let j = 0; j < heightMap[i].length; j++) {
//             if (
//                 i !== 0 &&
//                 j != heightMap[i].length - 1 &&
//                 i !== heightMap.length - 1 &&
//                 heightMap[i][j] === bouns
//             ) {
//                 count++;
//                 heightMap[i][j] = 0;
//             }
//         }
//     }

//     return count;
// };

// console.table(heightMap);

// minus(heightMap);
// console.table(heightMap);

// minus(heightMap);
// console.table(heightMap);

// minus(heightMap);
// console.table(heightMap);

// minus(heightMap);
// console.table(heightMap);

// let sqrt = (num = 0) => {
//     let snum = num.toString();
//     let isOdd = snum.length % 2;

//     let ans = 0;
// };

// let x = ~~(3.4/2);
// console.log(x);

let nums = [
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5],
];
// console.table(nums);

let tdArr = (m = 3, n = 4) => {
    let r = [];
    for (let i = 0; i < m; i++) {
        r.push([]);
        for (let j = 0; j < n; j++) {
            r[i].push(0);
        }
    }

    return r;
};

let arr = tdArr(3, 3);
// console.log(arr);

let generateMatrix = function (n) {
    let r = tdArr(n, n);

    let i = 0,
        j = 0;
    let count = 1;
    let sn = n * n;
    let times = 1;
    let ttimes = 2 * n - 1;
    while (times <= ttimes) {
        // left ===> right
        if ((i === 0 || r[i - 1][j] !== 0) && r[i][j] === 0) {
            console.log("left ===> right");
            while (j < n && r[i][j] === 0) {
                r[i][j++] = count++;
            }
            i++;
            j--;
            if (count - 1 === sn) {
                break;
            }
        }

        // up ===> down
        if ((j === n - 1 || r[i - 1][j] !== 0) && r[i][j] === 0) {
            console.log("up ===> down");
            while (i < n && r[i][j] === 0) {
                r[i++][j] = count++;
            }
            j--;
            i--;
            if (count - 1 === sn) {
                break;
            }
        }

        // right ===> left
        if ((j === n - 1 || r[i][j + 1] !== 0) && r[i][j] === 0) {
            console.log("right ===> left");
            while (j >= 0 && r[i][j] === 0) {
                console.log("i:", i);
                console.log("j:", j);
                r[i][j--] = count++;
            }
            j++;
            i--;
            if (count - 1 === sn) {
                break;
            }
        }

        // down ===> up
        if ((j === n - 1 || r[i + 1][j] !== 0) && r[i][j] === 0) {
            console.log("down ===> up");
            while (i < n && r[i][j] === 0) {
                r[i--][j] = count++;
            }
            i++;
            j++;
            if (count - 1 === sn) {
                break;
            }
        }

        console.table(r);
    }

    return r;
};
let s = [
    "A",
    " ",
    "m",
    "a",
    "n",
    ",",
    " ",
    "a",
    " ",
    "p",
    "l",
    "a",
    "n",
    ",",
    " ",
    "a",
    " ",
    "c",
    "a",
    "n",
    "a",
    "l",
    ":",
    " ",
    "P",
    "a",
    "n",
    "a",
    "m",
    "a",
];
// console.log(s.length);
// console.table(generateMatrix(10));
var reverseString = function (s) {
    let len = s.length;
    let half = ~~(len / 2);
    console.log("half:", half);
    for (let i = 0; i < half; i++) {
        [s[i], s[len - i - 1]] = [s[len - i - 1], s[i]];
    }
};

// console.log(s);
// reverseString(s);
// console.log(s);

// arr = ["a", "b", "c"];
// console.log(arr.join(""));

// console.log("+" === "+");

class MonoQueue {
    constructor() {
        this.queue = [];
    }
    pop(value) {
        if (this.queue.length && value === this.queue[0]) {
            this.queue.shift();
        }
    }
    push(value) {
        while (
            this.queue.length &&
            value > this.queue[this.queue.length - 1]
        ) {
            this.queue.pop();
        }
        this.queue.push(value);
    }
    front() {
        return this.queue[0];
    }
}

let mq = new MonoQueue();
mq.push(1);
mq.push(3);
mq.push(-1);
mq.push(3);
mq.push(5);
console.log(mq);
