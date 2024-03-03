var LinkNode = /** @class */ (function () {
    function LinkNode(data, next, prev) {
        if (next === void 0) { next = undefined; }
        if (prev === void 0) { prev = undefined; }
        this.next = next;
        this.data = data;
        this.prev = prev;
    }
    return LinkNode;
}());
var Head = /** @class */ (function () {
    function Head(list) {
        this.position = 0;
        this.list = list;
    }
    Head.prototype.add = function (node) {
        if (this.list) {
            node.prev = this.list;
            this.list.next = node;
        }
    };
    Head.prototype.forward = function () {
        if (this.list) {
            this.list = this.list.next;
            this.position++;
        }
        return this;
    };
    Head.prototype.backward = function () {
        if (this.list && this.position != 0) {
            this.list = this.list.prev;
            this.position--;
        }
        return this;
    };
    Head.prototype.start = function () {
        for (var i = this.position; i > 0; i--) {
            this.backward();
        }
    };
    Head.prototype.print = function () {
        if (this.list) {
            console.log(this.list.data);
        }
        else {
            console.log('no list');
        }
    };
    return Head;
}());
var linkedList = new LinkNode("test");
var head = new Head(linkedList);
head.add(new LinkNode("test2"));
head.forward();
head.add(new LinkNode("test3"));
head.forward();
head.start();
head.print();
