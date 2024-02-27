// Assignment:
// Create a TypeScript exercise focusing on Object-Oriented Programming (OOP)
// principles. Define a Shape interface with methods calculateArea() and
// calculatePerimeter(). Implement Rectangle, Circle, and Square classes
// implementing this interface. Rectangle should take width and height as
// parameters, Circle should take radius, and Square should take side length.
// Each class should implement methods to calculate its area and perimeter.
// Ensure to use access modifiers, type annotations, and generics wherever
// applicable. Test the classes by creating instances of each and calling their
// methods.
var Square = /** @class */ (function () {
    function Square(side) {
        this.side = 0;
        this.side = side;
    }
    Square.prototype.calculateArea = function () {
        return this.side * this.side;
    };
    Square.prototype.calculatePerimeter = function () {
        return (this.side * 4);
    };
    return Square;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.width = 0;
        this.height = 0;
        this.height = height;
        this.width = width;
    }
    Rectangle.prototype.calculateArea = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.calculatePerimeter = function () {
        return (this.width * 2) + (this.height * 2);
    };
    return Rectangle;
}());
var Circle = /** @class */ (function () {
    function Circle(diameter) {
        this.diameter = 0;
        this.radius = 0;
        this.diameter = diameter;
        this.radius = diameter / 2;
    }
    Circle.prototype.calculateArea = function () {
        return Math.PI * (Math.pow(this.radius, 2));
    };
    Circle.prototype.calculatePerimeter = function () {
        return Math.PI * this.diameter;
    };
    return Circle;
}());
var circle = new Circle(10);
console.log(circle.calculateArea());
console.log(circle.calculatePerimeter());
