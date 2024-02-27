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


interface Shape {
    calculateArea():number
    calculatePerimeter():number
}

class Square implements Shape{
    private side:number = 0;

    constructor(side:number){
        this.side = side;
    }
    calculateArea():number {
        return this.side * this.side;
    }
    calculatePerimeter(): number {
        return (this.side * 4) ;
    }  
}

class Rectangle implements Shape{
    private width:number = 0;
    private height:number = 0;

    constructor(width:number,height:number){
        this.height = height;
        this.width = width;
    }
    calculateArea(): number {
        return this.width * this.height;
    }
    calculatePerimeter(): number {
        return (this.width * 2) + (this.height * 2); 
    }  
}

class Circle implements Shape{
    private diameter:number = 0;
    private radius:number = 0;

    constructor(diameter:number){
        this.diameter = diameter;
        this.radius = diameter / 2;
    }
    calculateArea():number {
        return Math.PI * (this.radius ** 2 );
    }
    calculatePerimeter(): number {
        return Math.PI * this.diameter;
    } 
}


const circle = new Circle(10);
console.log(circle.calculateArea());
console.log(circle.calculatePerimeter());