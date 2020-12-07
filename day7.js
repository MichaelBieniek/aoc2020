// puzzle: https://adventofcode.com/2020/day/7

const fs = require('fs');
const input = fs.readFileSync('./day7.dat').toString();

const rules = input.split('\r\n');

// <bag type> contain a <bag type>, b <bag type>, [... n <bag type>].



let allRules = {}

function processRule(ruleLine) {
    const bagRule = {};
    const [lhs, rhs] = ruleLine.split(' contain ');
    const outsideBag = lhs.replace(' bags', '');
    if(rhs.trim() === 'no other bags.') {
        // we're done, don't do anything
        return [outsideBag, null];
    } else {
        const insideBags = rhs.replace('.', '').split(', ');
        insideBags.forEach(bag => {
            // number is first characters
            const numBag = parseInt(bag.substring(0, 1));
            const bagType = bag.substring(2, bag.indexOf(' bag'));
            bagRule[bagType] = numBag;
        });
        allRules[outsideBag, bagRule];
    }
    return [outsideBag, bagRule];
}

// build the complete rule set and store it in allRules
rules.forEach( ruleLine => {
    const processedRule = processRule(ruleLine);
    if(processedRule) {
        const [outsideBag, bagRule] = processedRule;
        allRules[outsideBag] = bagRule;
    }   
});

console.log(allRules);

function searchBag(allRules, bagType, refBagDetails) {
    
    const contents = allRules[bagType];
    let foundGoldBag = false;
    if(contents) {
        //console.log(bagType, 'has', Object.keys(contents))
        Object.keys(contents).forEach(insideBagType => {
            refBagDetails.total = refBagDetails.total + contents[insideBagType];
            if(insideBagType === 'shiny gold') {
                //console.log(bagType, 'can containy shiny gold');
                foundGoldBag = true;
            } else {
                //console.log(`Rummaging through ${insideBagType}`)
                const innerResult = searchBag(allRules, insideBagType, refBagDetails);                                
                if(innerResult) {
                    // found gold bag in nested bag
                    //console.log('Nested bag had shiny bag')
                    foundGoldBag = true;
                }
            }
        });
    } 
    return foundGoldBag;
}

const answerSet = new Set();

// process each rule one by one and see if they have a gold bag
Object.keys(allRules).forEach( outsideBagType => {
    console.log(`Searching in ${outsideBagType}`);
    const bagDetailsOut = { total: 0 };
    const foundShinyGold = searchBag(allRules, outsideBagType, bagDetailsOut);
    console.log('Search results:', foundShinyGold)
    if(foundShinyGold) {
        answerSet.add(outsideBagType);
        console.log('Found shiny gold bag');
    }
    console.log('');
    
});

console.log('Part A: Answer Set Size', answerSet.size);

// for part B, we just want to walk the tree
const shinyGoldBagDetails = { total: 0 };
searchBag(allRules, 'shiny gold', shinyGoldBagDetails);

console.log('Part B: Shiny gold bag details', shinyGoldBagDetails);
