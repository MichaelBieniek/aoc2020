const fs = require('fs');
const input = fs.readFileSync('./day3.dat').toString();

const rows = input.split('\r\n');

function isTree(rows, x, y) {
    const row = rows[y];
    const normalizedX = x % row.length;
    return row.charAt(normalizedX) === '#';
}

let x = 0, y = 0;

let treesHit = 0;

const slope = [1,2];
const [xInc, yInc] = slope;

for(rowInd = 0; rowInd < rows.length; rowInd = rowInd + yInc) {
    
    y = rowInd;
    const treeHit = isTree(rows, x, y);
    console.log(`Trying (${x}, ${y}) - ${treeHit}`)
    if(treeHit) {
        treesHit++;
    }
    x = x + xInc;
}

console.log(treesHit);

/*
Right 1, down 1. 62
Right 3, down 1. 184
Right 5, down 1. 80
Right 7, down 1. 74
Right 1, down 2. 36
*/

console.log(36*74*80*184*62);

