var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Stack = /** @class */ (function () {
    function Stack() {
        this.array = [];
    }
    Stack.prototype.push = function (elm) {
        this.array = __spreadArray(__spreadArray([], this.array, true), [elm], false);
    };
    Stack.prototype.pop = function () {
        return this.array.pop();
    };
    Stack.prototype.isEmpty = function () {
        return this.array.length == 0;
    };
    Stack.prototype.size = function () {
        return this.array.length;
    };
    Stack.prototype.clear = function () {
        this.array = [];
    };
    Stack.prototype.contains = function (needle) {
        return this.array.some(function (elm) { return elm == needle; });
    };
    Stack.prototype.mininum = function () {
        return this.array[0];
    };
    Stack.prototype.maximum = function () {
        return this.array[this.array.length - 1];
    };
    Stack.prototype.swap = function () {
        var tmp = this.array[this.array.length - 2];
        this.array[this.array.length - 2] = this.array[this.array.length - 1];
        this.array[this.array.length - 1] = tmp;
    };
    Stack.prototype.toArray = function () {
        return this.array;
    };
    Stack.prototype.toString = function () {
        return this.array.join(",");
    };
    return Stack;
}());
var numberStack = new Stack();
numberStack.push(2);
numberStack.push(3);
numberStack.swap();
console.log(numberStack.toString());
