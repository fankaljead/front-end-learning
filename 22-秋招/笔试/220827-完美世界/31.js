// 定义长度为 100 的循环链表，并进行翻转
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function solution(head) {
  if (!head) {
    return null;
  }
  if (head.next === head) {
    return head;
  }
  let tail = head.next;
  while (tail.next !== head) {
    tail = tail.next;
  }
  tail.next = null;

  reverseList(head);
  head.next = tail;

  return head;
}

function reverseList(head) {
  if (!head || !head.next) {
    return head;
  }
  let cur = head,
    pre = null,
    temp = null;

  while (cur) {
    temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }

  return pre;
}

function print(head) {
  let node = head;
  let r = "";
  while (node.next !== head) {
    r += String(node.val) + ", ";
    node = node.next;
  }
  r += String(node.val);
  console.log(r);
}

const N = 5;
function createHead() {
  let head = new ListNode(getRandomInt());
  let cur = head;
  let node;
  for (let i = 1; i < N; ++i) {
    node = new ListNode(getRandomInt());
    cur.next = node;
    cur = node;
  }
  node.next = head;

  return head;
}

function getRandomInt() {
  return Math.floor(N * Math.random());
}

function main() {
  const head = createHead();
  print(head);
  solution(head);
  print(head);
}

main();
