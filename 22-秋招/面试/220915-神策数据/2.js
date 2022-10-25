const data = [
  {
    id: 1,
    name: "node1",
    parentId: -1,
  },
  {
    id: 2,
    name: "node11",
    parentId: 1,
  },
  {
    id: 3,
    name: "node12",
    parentId: 1,
  },
  {
    id: 4,
    name: "node2",
    parentId: -1,
  },
  {
    id: 5,
    name: "node21",
    parentId: 2,
  },
  {
    id: 6,
    name: "node22",
    parentId: 2,
  },
  {
    id: 7,
    name: "node221",
    parentId: 6,
  },
];

function transform(data = data) {
  let res = {};
  let map = new Map();
  for (const node of data) {
    if (node.parentId === -1) {
      res[node.id] = node;
    } else {
      const parent = map.get(node.parentId);
      parent.children.push(node);
    }
    node.children = [];
    map.set(node.id, node);
  }

  return res;
}

console.log(JSON.stringify(transform(data), null, 2));
