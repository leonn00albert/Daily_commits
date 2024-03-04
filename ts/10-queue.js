var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
    }
    Queue.prototype.enter = function (item) {
        this.items.push(item);
    };
    Queue.prototype.exit = function () {
        return this.items.shift();
    };
    Queue.prototype.reset = function () {
        this.items = [];
    };
    Queue.prototype.print = function () {
        console.log(this.items);
    };
    return Queue;
}());
var queue = new Queue;
queue.enter(3);
queue.enter(5);
queue.print();
console.log(queue.exit());
queue.print();
