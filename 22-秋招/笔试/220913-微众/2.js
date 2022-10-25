function deleteP(arr = ["123", [1, 2, 3], [1, 2, 3], "a", "a"]) {
  return [...new Set(arr)];
}


console.log(deleteP());
