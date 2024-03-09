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
            if (this.list.next) {
                node.next = this.list.next;
            }
            this.list.next = node;
        }
        else {
            this.list = node;
        }
        return this;
    };
    Head.prototype.forward = function () {
        if (this.list) {
            if (this.list.next) {
                this.list = this.list.next;
                this.position++;
            }
        }
        return this;
    };
    Head.prototype.backward = function () {
        if (this.list && this.position != 0) {
            if (this.list.prev) {
                this.list = this.list.prev;
                this.position--;
            }
        }
        return this;
    };
    Head.prototype.start = function () {
        for (var i = this.position; i > 0; i--) {
            this.backward();
        }
        return this;
    };
    Head.prototype.end = function () {
        if (this.list) {
            while (this.list.next) {
                this.forward();
            }
        }
        return this;
    };
    Head.prototype.print = function () {
        if (this.list) {
            console.log(this.list.data);
        }
        else {
            console.log('no list');
        }
        return this;
    };
    Head.prototype.reset = function () {
        this.list = undefined;
        this.position = 0;
        return this;
    };
    Head.prototype.getPosition = function () {
        return this.position;
    };
    return Head;
}());
var linkedList = new LinkNode("test");
var head = new Head(linkedList);
head.add(new LinkNode("test2")).forward().add(new LinkNode("test3")).add(new LinkNode("test4")).forward().forward().print().start().end();
head.print().reset().print();
head.add(new LinkNode("test2"));
head.add(new LinkNode("test2"));
head.forward();
console.log(head.getPosition());
