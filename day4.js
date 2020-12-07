const fs = require('fs');
const input = fs.readFileSync('./day4.dat').toString();

const passportObjs = [];

const inputArr = input.split('\r\n');

let passportObj = {};


const yearValid = (year, min, max) => {
    try {
        let yearInt = parseInt(year);
        return year >= min && year <= max
    }
    catch(error) {
        return false;
    }
}

const byrValid = byr => yearValid(byr, 1920, 2002);
const iyrValid = iyr => yearValid(iyr, 2010, 2020);
const eyrValid = eyr => yearValid(eyr, 2020, 2030);

function hgtValid(hgt = '') {
    try {
        if(hgt.endsWith('in')) {
            // inches
            const inches = parseInt(hgt.replace('in', ''));
            if(inches >= 59 && inches <= 76) {
                return true;
            }
            return false;
        } else if( hgt.endsWith('cm') ) {
            // cm
            const cms = parseInt(hgt.replace('cm', ''));
            if(cms >= 150 && cms <= 193) {
                return true;
            }
        } 
    } catch( e ) {
        return false;
    }
    // invalid otherwise
    return false;
}
const hgtValid2 = hgt => {
    const valid = hgtValid(hgt);
    return valid;
}

function hclValid(hcl = '') {
    return hcl.match(/^#[abcdef0123456789]{6}$/);
}

const validEcls = ['amb','blu','brn','gry','grn','hzl','oth'];
function eclValid(ecl) {
   return validEcls.some(x => x === ecl);
}

const pidValid = (pid = "") => pid.match(/^\d{9}$/);


for(let i = 0; i < inputArr.length; i++) {
    const line = inputArr[i];
    if(line.trim() === '') {
        passportObjs.push(passportObj);
        // reset passport obj
        passportObj = {};
    } else {
        // split line into k:v pairs
        const kvPairs = line.trim().split(' ');
        kvPairs.forEach(pair => {
            const [k,v] = pair.split(':');
            passportObj[k] = v;
        })
    }
}
passportObjs.push(passportObj);


function isPassportValid(obj) {
    return byrValid(obj['byr'])
        && iyrValid(obj['iyr'])
        && eyrValid(obj['eyr'])
        && hgtValid2(obj['hgt'])
        && hclValid(obj['hcl'])
        && eclValid(obj['ecl'])
        && pidValid(obj['pid'])
}

console.log(passportObjs.filter(obj =>  isPassportValid(obj)).length)