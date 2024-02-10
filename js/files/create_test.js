const fs = require('fs');

// Define the file size in bytes (100MB)
const fileSizeInBytes = 100 * 1024 * 1024;

// Create a writable stream
const writableStream = fs.createWriteStream('input.txt', { highWaterMark: 1024 * 1024 });

// Function to generate random characters efficiently
function generateRandomChar() {
    return String.fromCharCode(Math.floor(Math.random() * (126 - 32 + 1) + 32));
}

// Write random text data to the file
function writeData() {
    let remaining = fileSizeInBytes;
    while (remaining > 0) {
        // Generate a chunk of data up to 10MB at a time
        const chunkSize = Math.min(remaining, 10 * 1024 * 1024);
        const chunk = Array(chunkSize).fill().map(generateRandomChar).join('');
        writableStream.write(chunk);
        remaining -= chunkSize;
    }
    // Close the stream once writing is complete
    writableStream.end();
}

// Write data to the file
writeData();

console.log('File creation started.');

writableStream.on('finish', () => {
    console.log('File created successfully.');
});
