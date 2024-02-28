// Exercise Title: Factory Pattern Practice
var ConcreteProduct1 = /** @class */ (function () {
    function ConcreteProduct1() {
    }
    ConcreteProduct1.prototype.operation = function () {
        return "Product1";
    };
    return ConcreteProduct1;
}());
var ConcreteProduct2 = /** @class */ (function () {
    function ConcreteProduct2() {
    }
    ConcreteProduct2.prototype.operation = function () {
        return "Product2";
    };
    return ConcreteProduct2;
}());
var ConcreteFactory1 = /** @class */ (function () {
    function ConcreteFactory1() {
    }
    ConcreteFactory1.prototype.createProduct = function () {
        return new ConcreteProduct1();
    };
    return ConcreteFactory1;
}());
var ConcreteFactory2 = /** @class */ (function () {
    function ConcreteFactory2() {
    }
    ConcreteFactory2.prototype.createProduct = function () {
        return new ConcreteProduct2();
    };
    return ConcreteFactory2;
}());
var Client = /** @class */ (function () {
    function Client(factory) {
        this.factory = factory;
    }
    Client.prototype.someOperation = function () {
        console.log(this.factory.createProduct().operation());
    };
    return Client;
}());
function main() {
    var client1 = new Client(new ConcreteFactory1);
    var client2 = new Client(new ConcreteFactory2);
    client1.someOperation();
    client2.someOperation();
}
main();
