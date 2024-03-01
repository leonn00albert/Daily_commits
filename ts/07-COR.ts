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

interface Handler {
    setNext(handler: Handler): Handler
    handle(operator:string, integer: number): number | undefined
}

abstract class AbstractHandler implements Handler {
    static count:number = 0;
    private nextHandler: Handler | null = null;
    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }
    handle(operator:string, integer: number): number | undefined {
        if(this.nextHandler){
            return this.nextHandler.handle(operator,integer);
        }
    }
}

class ConcreteHandler1 extends AbstractHandler  {
    handle(operator:string, integer: number): number | undefined {
        if (operator === 'min') {
            AbstractHandler.count  -= integer;
            return AbstractHandler.count; 
        } 
        else if (operator === 'add'){
            AbstractHandler.count  += integer;
            return AbstractHandler.count; 
        }
        else {
            return super.handle(operator,integer);
        }
    }
}
class ConcreteHandler2 extends AbstractHandler  {
    handle(operator:string, integer: number): number | undefined {
        if (operator === 'multiply') {
            AbstractHandler.count *= integer;
            return AbstractHandler.count; 
        } 

        else if (operator === 'divide') {
            AbstractHandler.count /= integer;
            return AbstractHandler.count; 
        } 
        else {
            return super.handle(operator,integer);
        }
    }
}

class ConcreteHandler3 extends AbstractHandler  {
    handle(operator:string, integer: number): number | undefined {
        if (operator === 'power') {
            AbstractHandler.count **= integer;
            return AbstractHandler.count; 
        } 

        else {
            return super.handle(operator,integer);
        }
    }
}


const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
const handler3 = new ConcreteHandler3();


handler1.handle('min',20);
handler1.handle('add',20);
handler1.handle('add',20);
handler1.setNext(handler2);
handler1.handle('multiply',10);
handler1.handle('min',20);
handler1.handle('min',20);
handler1.handle('divide',2);
handler1.handle('divide',8);
handler1.setNext(handler3);
handler1.handle('power',2);



console.log(AbstractHandler.count)
