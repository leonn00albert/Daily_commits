
class Stack<T> {
    private array: T[];

    constructor(){
        this.array = []
    }
    push(elm:T){
        this.array = [...this.array,elm];
    }
    pop():T | undefined{
        return this.array.pop();
    }
    isEmpty():boolean
    {
        return this.array.length == 0;
    }
    size():number
    {
        return this.array.length;
    }
    clear():void
    {
        this.array = [];
    }
    contains(needle:T): boolean
    {
        return this.array.some((elm)=> elm == needle);
    }
    mininum():T | undefined
    {
        return this.array[0];
    }
    maximum():T |undefined
    {
        return this.array[this.array.length -1];
    }
    swap():void
    {
        let tmp = this.array[this.array.length -2]
        this.array[this.array.length -2] = this.array[this.array.length -1];
        this.array[this.array.length -1] = tmp;
    }
    toArray(): T[]
    {
        return this.array;
    }
    toString():string
    {
        return this.array.join(",");
    }
}

const numberStack  = new Stack<number>();
 
numberStack.push(2);

numberStack.push(3);
numberStack.swap();

console.log(numberStack.toString())