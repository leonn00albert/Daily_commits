/*
Stream Transformation Challenge

Write a Node.js script that reads text from an input file (input.txt),
transforms the text to uppercase using streams, and writes the transformed
text to an output file (output.txt). Your solution should utilize streams for
efficient handling of potentially large files.

Instructions:

    1. Create a file named input.txt in the same directory as your Node.js
    script. Add some text content to this file.
    2. Implement a Node.js script that reads text from input.txt, transforms
    the text to uppercase using streams, and writes the transformed text to
    output.txt.
    3. Execute your script using Node.js (node your_script.js) and verify
    that output.txt contains the text from input.txt converted to uppercase.
    4. Optimize your solution to handle large files efficiently and ensure
    minimal memory consumption.

Challenge Tips:

    - Use the fs module to create readable and writable streams for file I/O.
    - Utilize the stream.Transform class or a similar mechanism to transform
    the text to uppercase.
    - Implement error handling and graceful termination of streams.
    - Consider memory usage and efficiency when designing your solution.
*/


const fs = require('fs');

const outputFileName = 'output.txt';
const read = function (file) {

    fs.createReadStream(file, {
        highWaterMark: 100 * 1024 * 1024
    }).on('data', (chunk) => {

        fs.writeFile(outputFileName, chunk.toString().toUpperCase(), (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });

    });


}
const memoryUsage = process.memoryUsage();

// Print memory usage information
console.log('Memory Usage:');
console.log('  - Heap Total:', (memoryUsage.heapTotal / 1024 / 1024).toFixed(2), 'MB');
console.log('  - Heap Used:', (memoryUsage.heapUsed / 1024 / 1024).toFixed(2), 'MB');
console.log('  - External:', (memoryUsage.external / 1024 / 1024).toFixed(2), 'MB');
console.log('  - RSS:', (memoryUsage.rss / 1024 / 1024).toFixed(2), 'MB');

console.time('CPU Benchmark');
read('files/input.txt');
console.timeEnd('CPU Benchmark');
