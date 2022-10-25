var longestSubsequence = function (arr = [], difference = 1) {
    if (arr.length <= 1) {
        return arr.length;
    }
    let res = 0,
        i = 0,
        j = 1,
        n = arr.length;

    while (true) {
        if (j >= n) {
            break;
        }
        while (j < n && arr[j - 1] + difference === arr[j]) {
            j++;
        }

        let len = j - i;
        if (res < len) {
            res = len;
        }
        i = j++;
    }

    return res;
};
// let arr = [1, 5, 7, 8, 6, 4, 2, 0, 5, 3, 1, 2, 0, -2],
// let arr = [1, 2, 0, -2],
let arr = [1, 5, 7, 8, 5, 3, 4, 2, 1],
    difference = -2;
console.log(longestSubsequence(arr, difference));
