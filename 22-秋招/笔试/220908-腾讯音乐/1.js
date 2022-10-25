function solution(arr = [1, 2, 3, 4]) {
  let sum = arr.reduce((a, b) => a + b);

  return sum;
}

function main() {
  console.log(solution());
}

main();

function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
}

function getBinaryTree(preOrder, inOrder) {
  function buildTree(preOrder, inOrder, preStart, preEnd, inStart, inEnd) {
    let arr = [];
    if (preStart > preEnd) {
      arr.push(null);
      return arr;
    }
    let num = preOrder[preStart];
    let idx = inStart;
    for (let i = inStart; i <= inEnd; ++i) {
      if (inOrder[i] === num) {
        idx = i;
        let left = buildTree(
          preOrder,
          inOrder,
          preStart + 1,
          preStart + idx - inStart,
          inStart,
          idx - 1
        );
        let right = buildTree(
          preOrder,
          inOrder,
          preStart + idx - inStart + 1,
          preEnd,
          idx + 1,
          inEnd
        );
        for (const l of left) {
          for (const r of right) {
            const root = new TreeNode(num);
            root.left = l;
            root.right = r;
            arr.push(root);
          }
        }
      }
    }

    return arr;
  }

  return buildTree(
    preOrder,
    inOrder,
    0,
    preOrder.length - 1,
    0,
    inOrder.length - 1
  );
}
