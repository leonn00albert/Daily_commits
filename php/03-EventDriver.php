<?php

require 'helpers/Logger.php';

/*
Create a simple event-driven PHP application. Implement a basic system where
events can be triggered and listeners can respond to those events.

Requirements:

    Define an Event class with properties for event name and any relevant data.
    Implement an EventDispatcher class responsible for managing events and
    listeners. Create a few sample events and listeners for demonstration
    purposes.

Additional Event Types:

    1. 'user_logged_in' - Triggered when a user successfully logs in.
    2. 'user_logged_out' - Triggered when a user logs out.
    3. 'item_added_to_cart' - Triggered when an item is added to the shopping cart.
    4. 'item_removed_from_cart' - Triggered when an item is removed from the shopping cart.
*/

interface EventDispatcher
{
    public function addListener(string $eventName, $listener):void;
    public function dispatch(Event $event): void;
    public function removeListener(string $eventName, int $id = 0):void;
    public function getListeners(): array;
}

abstract class Event
{
    public string $name;
    public array $data;
    public string $id;
    public function __construct(string $name, array $data)
    {
        $this->id = uniqid();
        $this->name = $name;
        $this->data = $data;
    }
}

class UserEvent extends Event
{
    public function __construct($name, $data)
    {
        parent::__construct($name, $data);
    }
}

class UserEventDispatcher implements EventDispatcher
{
    private $listeners = [];

    public function addListener($eventName, $listener): void
    {
        $this->listeners[$eventName][] = $listener;
    }

    public function removeListener(string $eventName, int $id = 0):void
    {
        if (isset($this->listeners[$eventName])) {
            foreach ($this->listeners[$eventName] as $key => $listener) {
                unset($this->listeners[$eventName][$key]);
            }
        }
    }

    public function dispatch($event): void
    {
        $eventName = $event->name;
        if (isset($this->listeners[$eventName])) {
            foreach ($this->listeners[$eventName] as $listener) {
                $listener($event);
            }
        }
    }

    public function getListeners():array
    {
        return $this->listeners;
    }
}

$eventDispatcher = new UserEventDispatcher();

$eventDispatcher->addListener('user.registered', function ($event) {
    Logger::log("User registered with email: {$event->data['email']}");
    echo "Send welcome email to {$event->data['email']}\n";
});

$eventDispatcher->addListener('user_logged_in', function ($event) {
    Logger::log("User logged in with email: {$event->data['email']} at {$event->data['time']}");
    echo "Send login notification to {$event->data['email']}\n";
});

$event = new UserEvent('user.registered', ['email' => 'email@test.com']);
$eventDispatcher->dispatch($event);
$eventDispatcher->removeListener('user.registered');
$eventDispatcher->addListener('user.registered', function ($event) {
    Logger::log("User registered with email: {$event->data['email']}");
    echo "New event test to {$event->data['email']}\n";
});
$event = new UserEvent('user_logged_in', ['email' => 'email@test.com', 'time' => time()]);
$eventDispatcher->dispatch($event);

$event = new UserEvent('user.registered', ['email' => 'email@test.com']);
$eventDispatcher->dispatch($event);
