class Queue<T> {    
    items:T[] = [];

    enter(item:T){
        this.items.push(item);
    }
    exit():T | undefined{
        return this.items.shift();
    }
    reset(){
        this.items = [];
    }
    print(){
        console.log(this.items);
    }
}


const queue = new Queue<number>;

queue.enter(3);
queue.enter(5);
console.log(queue.exit());
