function transform(list = [{ id: 1, parentId: null, name: "guangdong" }]) {
  let map = {},
    node,
    tree = [],
    i;
  for (i = 0; i < list.length; i++) {
    map[list[i].id] = list[i];
    list[i].children = [];
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== null) {
      map[node.parentId].children.push(node);
    } else {
      tree.push(node);
    }
  }
  return tree;
}

console.log(transform());
