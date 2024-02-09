<?php
/*
Exercise: Create a PHP script that automates the process of sending personalized email invitations to a list of recipients stored in a CSV file.

Instructions:

    1. Create a CSV file named recipients.csv with the following columns: Name and Email. Populate this file with the names and email addresses of the recipients.
    2. Write a PHP script named send_invitations.php that reads the recipients.csv file, composes personalized email invitations, and sends them to each recipient using PHP's mail() function or a library like PHPMailer.
    3. The email invitations should include a personalized greeting addressing each recipient by name.
    4. Test the script by running it from the command line or accessing it via a web browser.
    5. Handle any errors gracefully and log them to a file for later review.
*/

class MockMail
{
    public static function mail($email, $subject, $message)
    {
        try {
            echo "From: mock@email.com\n";
            echo "To: $email\n";
            echo "Subject: $subject\n";
            echo "$message\n\n";
            Logger::log("Email delivered to $email");    
        }catch(Exception $e){ 
            Logger::log($e->getMessage(), 'ERROR');
        }
     
    }
}



class CSVReader
{
    private $file;
    private $data;

    public function __construct($file)
    {
        $this->file = $file;
        $this->data = [];
    }

    public function read()
    {
        try{
            if (($handle = fopen($this->file, "r")) !== FALSE) {
                while (($row = fgetcsv($handle, 1000, ",")) !== FALSE) {
                    $this->data[] = $row;
                }
                fclose($handle);
                Logger::log("File $this->file read successfully");
            }  
        }catch(Exception $e){
            Logger::log($e->getMessage(), 'ERROR');
        }
    
    }

    public function getData()
    {
        return $this->data;
    }
}

class EmailSender
{
    private $recipients;
    private $subject;
    private $message;

    public function __construct($recipients, $subject, $message)
    {
        $this->recipients = $recipients;
        $this->subject = $subject;
        $this->message = $message;
    }

    public function send()
    {
        foreach ($this->recipients as $recipient) {
            try {

                $name = $recipient[0];
                $email = $recipient[1];
                $greeting = "Dear $name,";
                $body = "$greeting\n\n$this->message";
                Logger::log("Invitation sent to $name <$email>");
                MockMail::mail($email, $this->subject, $body);
            }
            catch(Exception $e) {
                Logger::log($e->getMessage(), 'ERROR');
            }
     
        }
    }
}

class Logger {
    static $file = 'log.txt';

    public static function log($message, $level = 'INFO')
    {
        $date = date('Y-m-d H:i:s');
        $log = "[$date][$level] $message\n";
        file_put_contents(Logger::$file, $log, FILE_APPEND);
    }
}

$csv = new CSVReader('files/recipients.csv');
$csv->read();

$recipients = $csv->getData();
$subject = 'You are invited!';
$message = 'Please join us for a special event.';
$sender = new EmailSender($recipients, $subject, $message);
$sender->send();
?>
