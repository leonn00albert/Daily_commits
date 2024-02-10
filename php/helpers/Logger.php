<?php
class Logger {
    static $file = 'log.txt';

    public static function log($message, $level = 'INFO')
    {
        $date = date('Y-m-d H:i:s');
        $log = "[$date][$level] $message\n";
        file_put_contents(Logger::$file, $log, FILE_APPEND);
    }
}