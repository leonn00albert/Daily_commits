/*
Exercise: Chain of Responsibility Pattern

A company wants to implement a system for handling customer support tickets. They have identified several categories of tickets, each requiring a different level of expertise to handle. The Chain of Responsibility pattern seems like a good fit for this scenario.

Task:
1. Define an interface named Handler with the following methods:
    - setNext(handler: Handler): Handler;
    - handle(request: string): string | null;

2. Implement an abstract class named AbstractHandler that implements the Handler interface. This class should contain the following:
    - A private property named nextHandler of type Handler | null, initialized to null.
    - An implementation for the setNext(handler: Handler) method that sets the next handler in the chain.
    - An implementation for the handle(request: string) method that passes the request to the next handler if there is one, otherwise returns null.

3. Implement concrete handler classes:
    - ConcreteHandler1: This handler should handle requests related to a specific condition. If it can't handle the request, it should pass it to the next handler in the chain.
    - ConcreteHandler2: This handler should handle requests related to another specific condition. If it can't handle the request, it should pass it to the next handler in the chain.

4. Create instances of the concrete handler classes and set up the chain by linking them together.
5. Test the chain by passing different types of requests through it and observe the handling results.

Expected Output:
- When a request matches the condition of a specific handler, that handler should handle it.
- If a request does not match any handler's condition, it should not be handled and should return null.

Example Usage:
const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();

handler1.setNext(handler2);

console.log(handler1.handle('specific_condition_for_handler_2')); // Output: Handled by ConcreteHandler2
console.log(handler1.handle('specific_condition_for_handler_1')); // Output: Handled by ConcreteHandler1
console.log(handler1.handle('unhandled_condition')); // Output: null
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AbstractHandler = /** @class */ (function () {
    function AbstractHandler() {
        this.nextHandler = null;
    }
    AbstractHandler.prototype.setNext = function (handler) {
        this.nextHandler = handler;
        return handler;
    };
    AbstractHandler.prototype.handle = function (operator, integer) {
        if (this.nextHandler) {
            return this.nextHandler.handle(operator, integer);
        }
    };
    AbstractHandler.count = 0;
    return AbstractHandler;
}());
var ConcreteHandler1 = /** @class */ (function (_super) {
    __extends(ConcreteHandler1, _super);
    function ConcreteHandler1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConcreteHandler1.prototype.handle = function (operator, integer) {
        if (operator === 'min') {
            AbstractHandler.count -= integer;
            return AbstractHandler.count;
        }
        else if (operator === 'add') {
            AbstractHandler.count += integer;
            return AbstractHandler.count;
        }
        else {
            return _super.prototype.handle.call(this, operator, integer);
        }
    };
    return ConcreteHandler1;
}(AbstractHandler));
var ConcreteHandler2 = /** @class */ (function (_super) {
    __extends(ConcreteHandler2, _super);
    function ConcreteHandler2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConcreteHandler2.prototype.handle = function (operator, integer) {
        if (operator === 'multiply') {
            AbstractHandler.count *= integer;
            return AbstractHandler.count;
        }
        else if (operator === 'divide') {
            AbstractHandler.count /= integer;
            return AbstractHandler.count;
        }
        else {
            return _super.prototype.handle.call(this, operator, integer);
        }
    };
    return ConcreteHandler2;
}(AbstractHandler));
var ConcreteHandler3 = /** @class */ (function (_super) {
    __extends(ConcreteHandler3, _super);
    function ConcreteHandler3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConcreteHandler3.prototype.handle = function (operator, integer) {
        var _a;
        if (operator === 'power') {
            (_a = AbstractHandler).count = Math.pow(_a.count, integer);
            return AbstractHandler.count;
        }
        else {
            return _super.prototype.handle.call(this, operator, integer);
        }
    };
    return ConcreteHandler3;
}(AbstractHandler));
var handler1 = new ConcreteHandler1();
var handler2 = new ConcreteHandler2();
var handler3 = new ConcreteHandler3();
handler1.handle('min', 20);
handler1.handle('add', 20);
handler1.handle('add', 20);
handler1.setNext(handler2);
handler1.handle('multiply', 10);
handler1.handle('min', 20);
handler1.handle('min', 20);
handler1.handle('divide', 2);
handler1.handle('divide', 8);
handler1.setNext(handler3);
handler1.handle('power', 2);
console.log(AbstractHandler.count);
