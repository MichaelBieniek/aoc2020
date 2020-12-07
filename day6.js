// puzzle: https://adventofcode.com/2020/day/6

const fs = require('fs');
const input = fs.readFileSync('./day6.dat').toString();

const inputLines = input.split('\r\n');

// will keep track of counts for each group separately
const groups = [];
const groupsPartB = [];

// we'll use a set for part A
let answerSet = new Set();

// we'll use an object k:v pair for part B
let answerSetPartB = {
    _total: 0,
};

function processPartB(answers, groups) {
    const totalPeople = answerSetPartB._total;
    delete answerSetPartB._total;
    let allAnswerYes = 0;
    for (const property in answerSetPartB) {
        if(answerSetPartB[property] === totalPeople) {
            allAnswerYes++;
        }
    }
    groupsPartB.push(allAnswerYes)    
}

inputLines.forEach((line = '') => {
    
    if(line.trim() === '') {
        // if we hit a blank line, we're starting a new group, push answer count to groups 
        // and create a new set for the next group
        // Part A
        groups.push(answerSet.size);
        answerSet = new Set();

        // Part B
        processPartB(answerSetPartB, groupsPartB);
        answerSetPartB = {
            _total: 0,
        };
                
        return;
    }
    const lineArr = line.split('');
    lineArr.forEach(char => answerSet.add(char));
    lineArr.forEach(char => {
        // keep count of each answer
        answerSetPartB[char] = answerSetPartB[char] ? answerSetPartB[char] + 1 : 1;
    });
    answerSetPartB._total = answerSetPartB._total + 1;
});

// last group needs to be pushed to groups
if(answerSet) {
    groups.push(answerSet.size);
}
if(answerSetPartB) {
    processPartB(answerSetPartB, groupsPartB);
}

// answer A, sum values
console.log('Part A', groups.reduce((accum, curr) => accum + curr, 0));

// answer B
console.log('Part B',groupsPartB.reduce((accum, curr) => accum + curr, 0));
