
interface ListNode {
    data:any;
    next:ListNode | undefined;
    prev:LinkNode | undefined;
}
class LinkNode  implements ListNode{
    data:any;
    next:ListNode | undefined;
    prev:ListNode | undefined;
    constructor(data:any, next:ListNode | undefined = undefined ,prev:ListNode | undefined = undefined  ){
        this.next = next;
        this.data = data;
        this.prev = prev;
    }
}

class Head {
    list:ListNode | undefined;
    position:number = 0;

    constructor(list:LinkNode){
        this.list = list
    }

    add(node:LinkNode){
        if(this.list){
            node.prev = this.list;
            if(this.list.next){
                node.next = this.list.next;
            }
            this.list.next = node;
      
        }else{
            this.list = node;
        }
        return this;
    }

    forward(){
        if(this.list){
            if(this.list.next){
                this.list = this.list.next;
                this.position++;
            }
        
        }

        return this;
    }

    backward(){
        if(this.list && this.position!= 0){
            if(this.list.prev){
                this.list = this.list.prev;
                this.position--

            }
        }
        return this;
    }

    start(){
        for(let i = this.position; i > 0; i--){
            this.backward();
        }
        return this;
       
    }
    end(){
        if(this.list){
            while (this.list.next){
                this.forward();
              }  
        }
        return this;

    }
    print(){
        if(this.list){
            console.log(this.list.data);
        }else{
            console.log('no list')
        }
        return this;
    }

    reset(){
        this.list = undefined;
        this.position = 0;
        return this;
    }

    getPosition():number
    {
        return this.position;
    }
}
let linkedList = new LinkNode("test",);
const head = new Head(linkedList);
head.add(new LinkNode("test2")).forward().add(new LinkNode("test3")).add(new LinkNode("test4")).forward().forward().print().start().end();
head.print().reset().print();
head.add(new LinkNode("test2"))
head.add(new LinkNode("test2"))

head.forward();
console.log(head.getPosition())




