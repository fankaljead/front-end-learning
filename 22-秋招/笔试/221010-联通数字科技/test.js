class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function removeHead(head, n) {
  let ret = new ListNode(0, head),
    slow = (fast = ret);
  while (n--) {
    fast = fast.next;
  }
  if (!fast) {
    return ret.next;
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return ret.next;
}

function solution(headArr = [1, 2, 3, 4, 5], n = 2) {
  const head = new ListNode(headArr[0]);
  let cur = head;
  for (let i = 1; i < headArr.length; i++) {
    const node = new ListNode(headArr[i]);
    cur.next = node;
    cur = node;
  }

  return removeHead(head, n);
}

function main() {
  const input = "head = [1,3,0 ], n=1".replace(/, /, ",");
  const index = input.indexOf("],");
  const headStr = input
    .substring(0, index + 1)
    .split("=")[1]
    .trim();
  const nStr = input
    .substring(index + 1)
    .split("=")[1]
    .trim();
  console.log(headStr, nStr);

  const head = JSON.parse(headStr);
  const n = JSON.parse(nStr);

  const res = solution(head, n);
  print(res);
}

function print(head) {
  let str = "[";
  if (head) {
    let cur = head;
    while (cur.next) {
      str += cur.val + ",";
      cur = cur.next;
    }
    str += cur.val;
  }

  str += "]";

  console.log(str);
}

main();
