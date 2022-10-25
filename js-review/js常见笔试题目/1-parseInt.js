const arr = ["1", "2", "11"].map(parseInt);
console.log(arr); // [ 1, NaN, 3 ]

// Array.prototype.map((item, index, arr) => {})
// parseInt(string: string, radix: number)