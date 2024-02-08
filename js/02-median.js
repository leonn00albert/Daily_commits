/**
 * Function to calculate the median of an array of numbers
 * and visualize the array as a bar graph using ASCII characters.
 * @param {number[]} arr - The input array of numbers.
 * @returns {number} The median of the input array.
 */

function median(arr) {
    let med = middle = Math.floor(arr.length / 2);
    arr.sort((a, b) => a - b);
    if(arr.length % 2 !== 0) {
        let midleTwo = Math.floor((arr.length) / 2) + 1;
        med = (arr[med] + arr[midleTwo]) / 2;
    }
    console.log("Total: " +  arr.length);
    console.log("Sum: " + arr.reduce((a, b) => a + b, 0));
    console.log("Median: " + med);
    const counts = {};
    arr.forEach((num) => {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
    });

    Object.keys(counts).forEach((key) => {
        let bar = "";
        num = key * counts[key];
        for (let i = 0; i < num; i++) {
            bar += "|";
        }
        
        console.log(key + subtractSpaces(key) + ": " + bar);
    });
}


function subtractSpaces(inputString) {
    var charCount = inputString.length;
    var resultSpaces = 4 - charCount;
    var spaces = "";
    for (var i = 0; i < resultSpaces; i++) {
        spaces += " ";
    }
    
    return spaces;
}
median([3, 2, 1, 4, 5,6, 6, 7, 8,2,3,5,1,5,6,7,8,11,3,4,6,8,9,2,1,6,9,8,8,4,5,4,3,6,5,4,2,1,5,3,4,4,4,5,6,8, 9, 10]); // 5