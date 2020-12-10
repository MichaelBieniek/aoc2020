// puzzle: https://adventofcode.com/2020/day/8

const fs = require('fs');
const input = fs.readFileSync('./day8.dat').toString();

const instrArr = input.split('\r\n');

/**
 * Runs instruction set provided
 * @param {array} instructions 
 * Returns true if program completed, false if it hit loop
 */
function runProgram(instructions) {
    // we'll use this set to keep track of instr already run
    const instrSet = new Set();

    let pointer = 0;
    let loopInd = false;
    let done = false;
    let accum = 0;
    let executeCounter = 0;

    while(!loopInd && !done && executeCounter < 100000) {
        if(pointer === instructions.length) {
            // program done
            return accum;
        }
        executeCounter++;
        instrSet.add(pointer);
        const nextInstr = instructions[pointer];
        //console.log(`Running @ ${pointer} ${nextInstr}`);        
        const [code, arg] = nextInstr.split(' ');
        switch(code) {
            case 'nop': {
                // do nothing
                pointer++;  
                break;      
            }
            case 'acc': {
                accum = accum + parseInt(arg);
                pointer++;
                break;
            }
            case 'jmp': {
                pointer = pointer + parseInt(arg);
                break;
            }
        }
        if(pointer < 0) {
            return false;
        }

        // check next instruction
        // if already run, set loopInd
        if(instrSet.has(pointer)) {
            console.log(`hit loop, accum is ${accum}`);
            loopInd = true;
            return false
        }
    }
    return false;
}


// part A
runProgram(instrArr);

// part B
// change one instruction set

for(let i = 0; i < instrArr.length; i++) {
    const programVariant = [...instrArr];
    const [code, arg] = programVariant[i].split(' ');
    // vary just the one code if jmp/acc
    if(code === 'jmp') {
        programVariant[i] = `nop ${arg}`
    } else if(code === 'nop') {
        programVariant[i] = `jmp ${arg}`
    }
    const result = runProgram(programVariant);
    if(result) {
        console.log(`First program to complete when instr @ ${i} changed`);
        console.log(`Acc is ${result}`);
    }
}