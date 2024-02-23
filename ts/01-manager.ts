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

*/

interface Product  {
    id : number
    name: string,
    price: number
    description: string
}

class ProductManager {
    private products: Product[];

    constructor(){
        this.products = [];
    }

    addProduct(product :Product ):void
    {
        this.products.push(product)
    }
    getProductById(id:number):Product | undefined
    {
        return this.products.find( p => p.id === id);
    }

}


const manager = new ProductManager();
const product:Product = {
    id: 0,
    name: 'test',
    price: 10,
    description: 'test'
}

manager.addProduct(product);
console.log(manager.getProductById(1));