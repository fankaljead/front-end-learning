function ListNode(x) {
  this.val = x;
  this.next = null;
}
function solve(a = []) {
  let leftRecord = new Map(),
    rightRecord = new Map();
  let minStart = new ListNode(Number.MAX_VALUE);
  for (const l of a) {
    let pre = l;
    if (minStart.val > pre.val) {
      minStart = pre;
    }
    while (l.next !== null) {
      if (minStart.val > l.val) {
        minStart = l;
      }
      if (!leftRecord.has(pre)) {
        leftRecord.set(pre, l);
      }
      if (!rightRecord.has(l)) {
        rightRecord.set(l, pre);
      }
    }
  }
  let record = new Map();
  if (leftRecord.get(minStart).val < rightRecord.get(minStart).val) {
    record = leftRecord;
  } else {
    record = rightRecord;
  }
  let cur = minStart;
  while (record.get(cur) != minStart) {
    cur.next = record.get(cur);
    cur = cur.next;
  }
  cur.next = null;
  return minStart;
}

function solve(a = []) {
  let leftRecord = new Map(),
    rightRecord = new Map();
  let minStart = new ListNode(Number.MAX_VALUE);
  for (let l of a) {
    let array = [];
    while (l !== null) {
      array.push(l.val);
      l = l.next;
    }
    for (let j = 1; j < array.length; ++j) {
      if (minStart > array[j]) {
        minStart = array[j];
      }
      if (!leftRecord.has(array[j - 1])) {
        leftRecord.set(array[j - 1], array[j]);
      }
      if (!rightRecord.has(array[j])) {
        rightRecord.set(array[j], array[j - 1]);
      }
    }
  }
  let res = [],
    record;
  if (leftRecord.get(minStart) < rightRecord.get(minStart)) {
    record = leftRecord;
  } else {
    record = rightRecord;
  }
  let cur = minStart;
  while (record.get(cur) != minStart) {
    res.push(cur);
    cur = record.get(cur);
  }
  res.push(cur);
  function getList(array = []) {
    let node = new ListNode(array[0]);
    let cur = node;
    for (let i = 1; i < array.length; ++i) {
      cur.next = new ListNode(array[i]);
      cur = cur.next;
    }
    cur.next = null;
    return node;
  }
  return getList(res);
}
 