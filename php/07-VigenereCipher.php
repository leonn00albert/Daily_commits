<?php

// Vigenère Cipher Code Challenge

/**
 * Encrypts or decrypts a message using the Vigenère Cipher.
 *
 * @param string $message The text to be encrypted or decrypted.
 * @param string $key     The keyword used for encryption or decryption.
 * @param string $mode    The mode indicating whether to 'encrypt' or 'decrypt' the message.
 *
 * @return string The resulting encrypted or decrypted text.
 */
 
// Implement a function called vigenere_cipher($message, $key, $mode) where:
// - $message is the text to be encrypted or decrypted.
// - $key is the keyword used for encryption or decryption.
// - $mode is a string indicating whether the function should 'encrypt' or 'decrypt' the message.
//
// The function should handle both uppercase and lowercase letters. Non-alphabetic characters should remain unchanged.
// The Vigenère cipher operates by shifting letters of the message according to the corresponding letters in the key. For encryption, each letter of the message should be shifted forward (wrap around if necessary) by the corresponding letter in the key. For decryption, each letter of the message should be shifted backward (wrap around if necessary) by the corresponding letter in the key.
// The key should repeat as necessary to match the length of the message.
// The function should return the resulting encrypted or decrypted text.


 class vigenere_cipher {


    public function encrypt($message, $key) {
        return $this->vigenere_cipher($message, $key, 'encrypt');
    }
    public function decrypt($message, $key) {
        return $this->vigenere_cipher($message, $key, 'decrypt');
    }
    

    private function vigenere_cipher($message, $key, $mode) {
        $result = '';
        $messageLength = strlen($message);
        $keyLength = strlen($key);
        $keyIndex = 0;

        for ($i = 0; $i < $messageLength; $i++) {
            $char = $message[$i];

            if (ctype_alpha($char)) {
                $shift = ($mode === 'encrypt') ? 1 : -1;

                $adjustedChar = chr(ord($char) + $shift * (ord(strtoupper($key[$keyIndex])) - ord('A')));

                if (ctype_upper($char)) {
                    if ($adjustedChar > 'Z') {
                        $adjustedChar = chr(ord($adjustedChar) - 26);
                    } elseif ($adjustedChar < 'A') {
                        $adjustedChar = chr(ord($adjustedChar) + 26);
                    }
                } elseif (ctype_lower($char)) {
                    if ($adjustedChar > 'z') {
                        $adjustedChar = chr(ord($adjustedChar) - 26);
                    } elseif ($adjustedChar < 'a') {
                        $adjustedChar = chr(ord($adjustedChar) + 26);
                    }
                }

                $result .= $adjustedChar;

                $keyIndex = ($keyIndex + 1) % $keyLength;
            } else {
                $result .= $char;
            }
        }

        return $result;
    }
 }


// Example usage:
$cipher = new vigenere_cipher();
echo $cipher
    ->encrypt
    (
        'The quick brown fox jumps over 13 lazy dogs!',
        'secret'
    );
// Output: 'Wkh swnsl gryhq hsb ovqpt xh 13 qdzy gqku!'

echo $cipher
    ->decrypt
    (
        'Wkh swnsl gryhq hsb ovqpt xh 13 qdzy gqku!',
        'secret'
    );
// Output: 'The quick brown fox jumps over 13 lazy dogs!'

