// 创建一个二维数组

function createMultiDimentionArray(N = 4, M = 5, initial = 1) {
  let arr = Array.from(Array(N), () => new Array(M).fill(initial));

  return arr;
}

let N = 5,
  M = 6,
  initial = 2;

console.log(createMultiDimentionArray(N, M, initial));

// 冒泡排序
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// 堆排序
function heapSort(arr) {
  let len = arr.length;
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapify(arr, len, i);
  }
  for (let i = len - 1; i >= 0; i--) {
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(arr, i, 0);
  }
  return arr;
}
function heapify(arr, len, i) {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let largest = i;
  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== i) {
    let temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    heapify(arr, len, largest);
  }
}