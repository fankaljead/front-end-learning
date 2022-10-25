// 单链表
function List() {
    let Node = function (element) {
        this.element = element;
        this.next = null;
    }

    // 初始化头结点
    let head = null;

    let length = 0;

    this.getList = function () {
        return head;
    };

    this.search = function (elemnt) {
        let p = head;
        if (!p) {
            return false;
        }
        while (p) {
            if (p.element === elemnt) {
                return true
            }
            p = p.next;
        }
        return false;
    };

    this.append = function (elemnt) {
        let node = new Node(elemnt);
        let p = head;
        if (!head) {
            head = node;
        } else {
            while (p.next) {
                p = p.next;
            }
            p.next = node;
        }
        length += 1;
    };

    this.insert = function (position, elemnt) {
        let node = new Node(elemnt);
        if (position >= 0 && position <= length) {
            let prev = head,
                curr = head,
                index = 0;
            if (position == 0) {
                node.next = head;
                head = node;
            } else {
                while (index < position) {
                    prev = curr;
                    curr = curr.next;
                    ++index;
                }
                prev.next = node;
                node.next = curr;
            }
            length += 1;
        } else {
            return null;
        }
    };

    this.remove = function (elemnt) {
        let p = head,
            prev = head;
        if (!head) return;
        while (p) {
            if (p.element === elemnt) {
                p = p.next;
                prev.next = p;
            } else {
                prev = p;
                p = p.next;
            }
        }
    };

    this.isEmpty = function () {};

    this.size = function () {};
}

// 测试 
let list = new List();
for (let i = 0; i < 5; ++i) {
    list.append(i);
}

list.insert(5, 11);
list.remove(4);


console.log(list.search(4));
console.log(list.search(11));