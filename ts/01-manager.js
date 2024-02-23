/*
Define a TypeScript interface representing a 'Product' with the following properties:

    id: number
    name: string
    price: number
    description: string

Implement a class named 'ProductManager' that:

    has a property 'products' which is an array of 'Product' objects.
    has a method 'addProduct' that takes a 'Product' object as a parameter and adds it to the 'products' array.
    has a method 'getProductById' that takes an ID (number) as a parameter and returns the corresponding 'Product' object if found, otherwise returns null.

Define a generic class named 'Stack' that represents a basic stack data structure (Last In, First Out).

    It should have a private array property to store the stack elements.
    Implement methods 'push' to add an element to the stack, 'pop' to remove and return the top element from the stack, and 'isEmpty' to check if the stack is empty.

Create an instance of 'Stack' with number type and demonstrate pushing, popping, and checking if it's empty.
Extend the 'Stack' class to a new class named 'TypedStack' that allows only a specific type of elements (using generics).

    Ensure that attempting to push an element of a different type results in a compilation error.

Create an instance of 'TypedStack' with string type and demonstrate the functionality.

    */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ProductManager = /** @class */ (function () {
    function ProductManager() {
        this.products = [];
    }
    ProductManager.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    ProductManager.prototype.getProductById = function (id) {
        return this.products.find(function (p) { return p.id === id; });
    };
    return ProductManager;
}());
var manager = new ProductManager();
var product = {
    id: 0,
    name: 'test',
    price: 10,
    description: 'test'
};
manager.addProduct(product);
console.log(manager.getProductById(0));
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
    return Stack;
}());
var stack = new Stack();
stack.push(2);
stack.push(3);
console.log(stack);
