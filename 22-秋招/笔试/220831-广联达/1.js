const solve = (n = 5, arr1 = [], arr2 = []) => {
  // let visited = new Array(n + 1).fill(false);
  // let res = 0;
  // let i = 0,
  //   j = 0;
  // while (i < n) {
  //   if (!visited[arr1[j]]) {
  //     visited[arr2[i]] = true;
  //     if (arr2[i] !== arr1[j]) {
  //       res++;
  //       i++;
  //     } else {
  //       i++;
  //       j++;
  //     }
  //   } else {
  //     j++;
  //   }
  // }
  // return res;

  let count = 0,
    i = 0,
    j = 0;
  let visited = new Array(n).fill(false);
  while (j < n) {
    if (!visited[arr1[i]]) {
      visited[arr2[j]] = true;
      if (arr1[i] !== arr2[j]) {
        j++, count++;
      } else {
        i++, j++;
      }
    } else {
      i++;
    }
  }

  return count;
};

// 输入输出相关
const readline = readline || read_line;
// 输入
// 从一行中读取一列数组
const readArray = () => {
  const line = readline();
  return line.split(" ").map(Number);
};

// 读取一行为一个数字
const readInt = () => {
  return parseInt(readline());
};

function main() {
  const n = readInt();
  const arr1 = [];
  for (let i = 0; i < n; ++i) {
    arr1.push(readInt());
  }
  const arr2 = [];
  for (let i = 0; i < n; ++i) {
    arr2.push(readInt());
  }

  const res = solve(n, arr1, arr2);
  console.log(res);
}

main();
