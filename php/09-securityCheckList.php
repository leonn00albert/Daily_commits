<?php 

require('./05-FileCache.php');

enum SecurityType:string {
    case AUTHENTICATION = 'authentication';
    case WEB = 'web';
    


}



class SecurityCheckList {
    private FileCache $store;
    public function __construct(private array $items = []) {
        $this->store =  new FileCache();
        $this->store->setData('list',$items);
    }
    public function addItem(Item $item){
      $this->items = json_decode($this->store->getData('list'));
      $this->items[] = $item;     
      $this->store->setData('list',$item);

    }
    
    private function calculateScore(){
        $score = [];
        foreach($this->items as $item){
            $item = $item->get();
            if($item->isChecked){
                $score[$item->securityType]++;
            }
        }
        return $score;
    }

    public function getList(){
      return $this->store->getData('list');
        
    }

}


class Item {
    private  bool $isChecked = false;
    public function __construct(public string $name,private SecurityType $securityType ) {
    }

    public function check(): self
    {
        $this->isChecked = !$this->isChecked;
        return $this;
    }

    public function get():object
    {
        return (object) [
            'name' => $this->name,
            'securityType' => $this->securityType,
            'isChecked' => $this->isChecked
        ];
    }


}


class CLI {

    private SecurityCheckList $list;
    public function __construct(){
        $this->list = new SecurityCheckList();
    }

    public function menu(){
        
        print(
            "1. Add list Item \n
             2. List Items \n
            "
            
        );
        $option = readline("Select option: \n"); 

        match($option) {
            "1" => $this->addItem(),
            "2" => $this->listItems()
        };
    }

    private function addItem(){

        $name = readline('Enter item name: '); 
        $i = 1;
        foreach (SecurityType::cases() as $type) { 
            echo $i . '. ' . $type->name . "\n";
            $i ++;
        }
        $st = readline("Security Type: "); 
    
        $st = match($st) {
            '1' => SecurityType::AUTHENTICATION
        };

        $item = new Item($name, $st);
        $this->list->addItem($item);
        $this->menu();

    }

    private function listItems(){
        print_r($this->list->getList());

    }
}
$cli = new CLI();
$cli->menu();