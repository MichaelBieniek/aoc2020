// puzzle: https://adventofcode.com/2020/day/9

const fs = require('fs');
const input = fs.readFileSync('./day9.dat').toString();

const inputArr = input.split('\r\n');

let slidingWindow = [];

function isValid(num, prevNum) {
    let valid = false;
    for(let i =0; i < prevNum.length; i++) {
        const curr = prevNum[i];
        valid = prevNum.some(x => {
            return x + curr === num;
        });
        if(valid) {
            break;
        }
    }
    return valid;
}

inputArr.forEach(num => {
    if(slidingWindow.length < 25) {
        slidingWindow.push(parseInt(num));
    } else {
        // check number
        const parsedNum = parseInt(num);
        if(!isValid(parsedNum, [...slidingWindow])) {
            console.log(parsedNum, 'is not valid');
        }

        slidingWindow.push(parseInt(num));
        slidingWindow.shift();
    }

})

// part A: 1504371145 is not valid

// part B, find nums that sum up to 1504371145

for(let i = 0; i < inputArr.length; i++) {
    // we'll start at each index, and continue until we bust
    let accum = 0;
    let offset = 0;
    while(accum <= 1504371145 && (i + offset) < inputArr.length) {
        accum += parseInt(inputArr[i+offset]);
        if(accum === 1504371145) {
            console.log('Found answer', i, offset);
        } else if(accum > 1504371145) {
            //console.log('Bust');
        }
        offset++
    }   

}

/*
Found answer 537 16
Found answer 652 0
*/

console.log(inputArr.slice(537, 537 + 16));

// sum lowest and higest number from that list
console.log(54418204 + 128860283);