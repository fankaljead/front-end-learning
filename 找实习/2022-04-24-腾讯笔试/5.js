function moveSort(ids = [], sort = [], moves = []) {
  let [move, start, to] = moves;
  if (start === 0) {
    ids.splice(0, 1, move);
    pr();
    return;
  }
  if (to === 0) {
    ids.splice(0, 1);
    ids.push(move);
    pr();
    return;
  }

  let index = ids.indexOf(move);
  ids.splice(index, 1);
  index = ids.indexOf(start);
  ids.splice(index + 1, 0, move);
  pr();
  return;

  function pr() {
    for (let i = 0, len = ids.length - 1; i <= len; ++i) {
      console.log(`${ids[i]},${sort[i]}`);
    }
  }
}

let ids = ["a", "b", "c", "d", "e", "f"];
let sort = [1, 3, 6, 8, 9, 19];
// let moves = ["a", "f", 0];
let moves = ["e", "a", "b"];

moveSort(ids, sort, moves);
