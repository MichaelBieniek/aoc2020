const { exception } = require('console');
const fs = require('fs');
const input = fs.readFileSync('./day5.dat').toString();

/**
 * 
 * @param {string} mode - one of 'F' or 'B'
 * @param {number} lower - first row
 * @param {number} upper - last row 
 * Returns tuple indicating new range
 */
function partition(mode, lower = 0, upper = 127) {
    if(mode === 'F' || mode === 'L') {
        // take the lower half
        const newUpper = Math.floor((upper - lower)/2) + lower;
        //console.log('returning upper half', lower, newUpper);
        return [lower, newUpper];
    } 
    // assume upper half
    const newLower = Math.ceil((upper-lower)/2) + lower;
    //console.log('returning lower half', newLower, upper);
    return [newLower, upper];    
};

function determineSeatId(seatCode = '') {
    let rows = [0,127];
    let cols = [0,7];
    seatCode.split('').forEach(char => {
        if(char === 'F' || char === 'B') {
            // rows
            rows = partition(char, ...rows);
        } else {
            // columns
            cols = partition(char, ...cols);
        }
    })
    const [rowA, rowB] = rows;
    const [colA, colB] = cols;
    if(rowA !== rowB || colA !== colB) {
        throw new Exception('Did not arrive at specific seat');
    };
    // return seat id
    return {
        id: (rowA * 8) + colA,
        row: rowA,
        col: colA,        
    }
}

const results = [];

const inputArr = input.split('\r\n');

inputArr.forEach(inputItem => {
    results.push(determineSeatId(inputItem));
})

// get top seat value (Answer A)
console.log(Math.max(...results.map(x => x.id)));

// find our seat (Answer B) 
const resultsB = results.filter(seat => {
    const {id, row, col} = seat;
    if( row === 0 || row === 127) {
        return false;
    }
    const seatUp = id + 1;
    const seatDown = id - 1;
    return !(results.some(x => x.id === seatUp) && results.some(x => x.id === seatDown));
});

// inspect array of the gap
console.log(resultsB);
