<?php 

enum SecurityType:string {
    case AUTHENTICATION = 'authentication';
    case WEB = 'web';
    


}


class SecurityCheckList {
    public function __construct(private array $items = []) {
        
    }
    public function addItem(Item $item){
        $this->items[] = $item;
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

    
    public function menu(){
        
        print(
            "1. Add list Item \n"
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

        

    }

    private function listItems(){
    }
}

$cli = new CLI();
$cli->menu();