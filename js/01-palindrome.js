/*
Challenge: Check if a String is Palindrome

Write a JavaScript function that takes a string as input and returns true if the string is a palindrome (reads the same backward as forward), and false otherwise. Ignore spaces, punctuation, and capitalization when determining if the string is a palindrome.

For example:
isPalindrome("A man, a plan, a canal, Panama"); // Should return true
isPalindrome("racecar"); // Should return true
isPalindrome("hello"); // Should return false
*/

function isPalindrome(str) {
    return str.replace(/[\W_]/g, "").toLowerCase() === str.replace(/[\W_]/g, "").toLowerCase().split("").reverse().join("");
}

console.log(isPalindrome("A man, a plan, a canal, Panama")); // Should return true
console.log(isPalindrome("racecar")); // Should return true
console.log(isPalindrome("hello")); // Should return false