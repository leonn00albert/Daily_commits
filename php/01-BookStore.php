<?php

/**
 * Problem Statement:
 * 
 * You are tasked with designing an object-oriented system for an online
 * bookstore. The system should allow users to browse books, add them to a
 * shopping cart, and make purchases. Each book has attributes such as title,
 * author, price, and genre.
 * 
 * Requirements:
 * 
 * 1. Implement a Book class with properties for title, author, price, and
 *    genre. Include getter and setter methods for accessing and modifying
 *    these properties.
 * 
 * 2. Create a Bookstore class that acts as a central repository for managing
 *    books. This class should have methods to add new books, retrieve books by
 *    title, author, or genre, and display all available books.
 * 
 * 3. Design a ShoppingCart class to handle the shopping cart functionality.
 *    Users should be able to add books to the cart, remove them, and calculate
 *    the total price of items in the cart.
 * 
 * 4. Implement a User class to represent users of the online bookstore. Users
 *    should be able to register, log in, and log out. Each user should have a
 *    unique identifier, username, email, and password.
 * 
 * 5. Ensure proper validation for user inputs, such as validating email formats
 *    and enforcing strong password policies.
 * 
 * 6. Implement a Purchase class to represent a purchase made by a user. Each
 *    purchase should contain information about the user, the books purchased,
 *    total price, and purchase date.
 * 
 * 7. Design the system in a way that promotes code reusability, modularity,
 *    and maintainability.
 * 
 * Additional Information:
 * 
 * - You can assume that the online bookstore will be accessed via a web
 *   interface, so consider implementing appropriate methods for handling HTTP
 *   requests and responses if necessary.
 * - Consider implementing appropriate error handling mechanisms to handle
 *   exceptions and edge cases gracefully.
 * - Test your implementation thoroughly to ensure that all features work as
 *   expected.
 */


class Book
{
    function __construct(private string $title, private string $author, private float $price, private string $genre)
    {
        $this->title = $title;
        $this->author = $author;
        $this->price = $price;
        $this->genre = $genre;
    }

    public function getTitle(): string
    {
        return $this->title;
    }
    public function setTitle(string $title): void
    {
        $this->title = $title;
    }
    public function getAuthor(): string
    {
        return $this->author;
    }
    public function setAuthor(string $author): void
    {
        $this->author = $author;
    }

    public function getPrice():float
    {
        return $this->price;
    
    }
    public function __toString(): string
    {
        return "Title: {$this->title}, Author: {$this->author}, Price: {$this->price}, Genre: {$this->genre}";
    }
}


class Bookstore
{
    private array $users = [];
    function __construct(private array $books = [])
    {
        $this->books = $books;
        
    }

    public function addBook(Book $book): void
    {
        $this->books[] = $book;
    }

    public function getBooksByTitle(string $title): array
    {
        return array_filter($this->books, fn($book) => $book->getTitle() === $title);
    }

    public function getBooksByAuthor(string $author): array
    {
        return array_filter($this->books, fn($book) => $book->getAuthor() === $author);
    }

    public function getBooksByGenre(string $genre): array
    {
        return array_filter($this->books, fn($book) => $book->getGenre() === $genre);
    }
    public function displayAllBooks(): array
    {
        return $this->books;
    }

    public function addUser(User $user): void
    {
        $this->users[] = $user;
    }

    

}


class ShoppingCart
{
    function __construct(private array $items = [])
    {
        $this->items = $items;
    }

    public function addItem(Book $book): void
    {
        $this->items[] = $book;
    }

    public function displayAllBooks(): array
    {
        return $this->items;
    }

    public function clearCart(): void
    {
        $this->items = [];
    }

    public function removeItem(Book $book): void
    {
        $this->items = array_filter($this->items, fn($item) => $item !== $book);
    }

    public function getTotalPrice(): float
    {
        return array_sum(array_map(fn($item) => $item->getPrice(), $this->items));
    }
}


class User
{
    function __construct(private string $id, private string $username, private string $email, private string $password)
    {
        $this->id = $id;
        $this->username = htmlspecialchars($username);
        $this->email =  is_string(filter_var($email, FILTER_VALIDATE_EMAIL)) ? $email : 'Invalid Email';
        $this->password = password_hash($password, PASSWORD_DEFAULT);
    }

    public function register(Bookstore $bookstore): void
    {
        $bookstore->addUser($this);
    }

    public function authenticate(string $password): bool
    {
        if(!password_verify($password, $this->password)) {
            return false;
        }
        else {
            return true;
        }
    }
    public function __toString()
    {
        return "User: [ID: {$this->id}, Username: {$this->username}, Email: {$this->email}]";
    }

    public function __debugInfo()
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
        ];
    }

}

class Purchase
{
    function __construct(private User $user, private array $books, private float $totalPrice, private string $purchaseDate)
    {
        $this->user = $user;
        $this->books = $books;
        $this->totalPrice = $totalPrice;
        $this->purchaseDate = $purchaseDate;
    }

    public function __toString(): string
    {
        $booksString = implode(', ', $this->books);
        return "User: {$this->user}, Books: {$booksString}, Total Price: {$this->totalPrice}, Purchase Date: {$this->purchaseDate}";
    }
}


$bookstore = new Bookstore();

$bookstore->addBook(new Book('The Alchemist', 'Paulo Coelho', 10.99, 'Fiction'));
$bookstore->addBook(new Book('The Catcher in the Rye', 'J.D. Salinger', 12.99, 'Fiction'));
$bookstore->addBook(new Book('To Kill a Mockingbird', 'Harper Lee', 9.99, 'Fiction'));
$bookstore->addBook(new Book('1984', 'George Orwell', 11.99, 'Fiction'));



$user = new User('1', 'john_doe','john@email.com','gsfdsd');
$shoppingCart = new ShoppingCart();
$user->register($bookstore);

$shoppingCart->addItem($bookstore->displayAllBooks()[0]);
print(new Purchase($user, $shoppingCart->displayAllBooks(), $shoppingCart->getTotalPrice(), date('Y-m-d')));
$shoppingCart->clearCart();