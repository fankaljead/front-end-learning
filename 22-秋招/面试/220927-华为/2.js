// [
//     {id: 1, name: 'child1', parentId: 0},
//     {id: 2, name: 'child2', parentId: 0},
//     {id: 6, name: 'child2_1', parentId: 2},
//     {id: 0, name: 'root', parentId: null},
//     {id: 5, name: 'child1_2', parentId: 1},
//     {id: 4, name: 'child1_1', parentId: 1},
//     {id: 3, name: 'child3', parentId: 0}
// ]

// 树型结构形式：
// [
//     {
//         id: 0,
//         name: "root",
//         parentId: null,
//         "children": [...]
//     }
// ]
const data = [
  { id: 1, name: "child1", parentId: 0 },
  { id: 2, name: "child2", parentId: 0 },
  { id: 6, name: "child2_1", parentId: 2 },
  { id: 0, name: "root", parentId: null },
  { id: 5, name: "child1_2", parentId: 1 },
  { id: 4, name: "child1_1", parentId: 1 },
  { id: 3, name: "child3", parentId: 0 },
];

function transform(data = []) {
  let obj = {};
  let map = new Map();

  for (const item of data) {
    const { id, parentId } = item;
    if (parentId === null || !map.has(parentId)) {
      map.set(id, item);
      item.children = [];
      obj[id] = item;
    } else {
      map.get(parentId).children.push(item);
    }
  }

  return obj;
}

console.log(JSON.stringify(transform(data), null, 2));
