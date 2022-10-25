let tdArr = (m = 3, n = 4) => {
    let r = [];
    for (let i = 0; i < m; i++) {
        r.push([]);
        for (let j = 0; j < n; j++) {
            r[i].push(i * n + j + 1);
        }
    }

    return r;
};

var spiralOrder = function (matrix = []) {
    let m = matrix.length;
    let n = matrix[0].length;
    let res = [];

    let i = 0,
        j = 0,bound=1000;
    while (true) {
        // left ===> right
        if ((i === 0 || matrix[i - 1][j] === bound) && matrix[i][j] !== bound) {
            console.log("left ===> right");
            while (j < n && matrix[i][j] !== bound) {
                res.push(matrix[i][j]);
                matrix[i][j++] = bound;
            }
            i++;
            j--;
            if (res.length === m * n) {
                break;
            }
        }
        // up ===> down
        if ((j === n - 1 || matrix[i - 1][j] === bound) && matrix[i][j] !== bound) {
            console.log("up ===> down");
            while (i < m && matrix[i][j] !== bound) {
                res.push(matrix[i][j]);
                matrix[i++][j] = bound;
            }
            j--;
            i--;
            if (res.length === m * n) {
                break;
            }
        }

        // right ===> left
        if ((j === n - 1 || matrix[i][j + 1] === bound) && matrix[i][j] !== bound) {
            console.log("right ===> left");
            while (j >= 0 && matrix[i][j] !== bound) {
                res.push(matrix[i][j]);
                matrix[i][j--] = bound;
            }
            j++;
            i--;
            if (res.length === m * n) {
                break;
            }
        }

        // down ===> up
        if ((j === n - 1 || matrix[i + 1][j] === bound) && matrix[i][j] !== 0) {
            console.log("down ===> up");
            while (i < m && matrix[i][j] !== 0) {
                res.push(matrix[i][j]);
                matrix[i--][j] = 0;
            }
            i++;
            j++;
            if (res.length === m * n) {
                break;
            }
        }
    }

    return res;
};

let matrix = tdArr(5, 4);
console.table(matrix);
console.table(spiralOrder(matrix));
