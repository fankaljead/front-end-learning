function DoublyLinkedList() {
    let Node = function (element) {
        this.element = element;
        this.prev = null;
        this.next = null;
    };

    let head = null;
    let tail = null;
    let length = 0;

    this.search = function (element) {};
    this.insert = function (position, element) {};
    this.removeAt = function (position) {};
    this.isEmpty = function () {
        return length === 0
    };
    this.size = function () {
        return length
    };
}

