
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
            this.list.next = node;
        }
        return this;
    }

    forward(){
        if(this.list){
            this.list = this.list.next;
            this.position++;
        }

        return this;
    }

    backward(){
        if(this.list && this.position!= 0){
            this.list = this.list.prev;
            this.position--
        }
        return this;
    }

    start(){
        for(let i = this.position; i > 0; i--){
            this.backward();
        }
        return this;
       
    }
    print(){
        if(this.list){
            console.log(this.list.data);
        }else{
            console.log('no list')
        }
    }

}
let linkedList = new LinkNode("test",);
const head = new Head(linkedList);
head.add(new LinkNode("test2")).forward().add(new LinkNode("test3")).forward().start().print();




