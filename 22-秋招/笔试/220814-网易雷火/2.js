// 使用先序遍历和中序遍历输出后序遍历
// 先序遍历：ABDECGF
// 中序遍历：DBEACG
// 后序遍历：DBEACG
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
function recreateRoot( preStr ,  midStr ) {
    if(preStr.length == 0 || midStr.length == 0) {
        return null;
    }
    var root = new TreeNode(preStr[0]);
    var index = midStr.indexOf(preStr[0]);
    root.left = recreateRoot(preStr.slice(1, index + 1), midStr.slice(0, index));
    root.right = recreateRoot(preStr.slice(index + 1), midStr.slice(index + 1));
    return root;
}

// 后序遍历
function postOrder(root) {
    if(root == null) {
        return;
    }
    postOrder(root.left);
    postOrder(root.right);
    console.log(root.val);
}
function postOrder(root){

}