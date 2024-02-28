// Exercise Title: Factory Pattern Practice

// Exercise Description:
// In this exercise, you will implement a simple example of the Factory Pattern in TypeScript. The Factory Pattern is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.
//
// 1. Define an interface named Product with a method operation().
// 2. Implement two concrete classes that implement the Product interface:
//    - ConcreteProduct1: This class should implement the operation() method to return a string indicating it's the result of ConcreteProduct1.
//    - ConcreteProduct2: This class should implement the operation() method to return a string indicating it's the result of ConcreteProduct2.
// 3. Define a Factory interface with a method createProduct() that returns a Product.
// 4. Implement two concrete factory classes that implement the Factory interface:
//    - ConcreteFactory1: This class should implement the createProduct() method to return an instance of ConcreteProduct1.
//    - ConcreteFactory2: This class should implement the createProduct() method to return an instance of ConcreteProduct2.
// 5. Create a Client class that takes a Factory object as a parameter in its constructor. The Client class should have a method named someOperation(). Inside this method, call createProduct() on the factory object, and then call operation() on the created product.
// 6. In the main() function, instantiate objects of ConcreteFactory1 and ConcreteFactory2, then instantiate Client objects with these factories and call their someOperation() method.
// 7. Run the main() function to see the output.


interface Product {
    operation():string;
}


class ConcreteProduct1 implements Product {
    operation(): string {
        return "Product1";
    }
}
class ConcreteProduct2 implements Product {
    operation(): string {
        return "Product2";
    }
}
interface Factory {
    createProduct():Product;
}

class ConcreteFactory1 implements Factory {
    createProduct(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteFactory2 implements Factory {
    createProduct(): Product {
        return new ConcreteProduct2();
    }
}


class Client {
    private factory:Factory;

    constructor(factory:Factory){
        this.factory = factory;
    }
    
    someOperation():void
    {
        console.log(this.factory.createProduct().operation());
    }
}

function main(){
    const client1 = new Client(new ConcreteFactory1);
    const client2 = new Client(new ConcreteFactory2);

    client1.someOperation();
    client2.someOperation();

}

main();