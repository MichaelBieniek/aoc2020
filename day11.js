// puzzle: https://adventofcode.com/2020/day/11

const fs = require("fs");
const input = fs.readFileSync("./day11.dat").toString();

const inputArr = input.split("\r\n");

// build the grid

const squares = [];

inputArr.forEach((row, y) => {
  const cols = row.split("");
  cols.forEach((element, x) => {
    squares.push({
      x,
      y,
      element,
    });
  });
});

/**
 * Retrieves square at specified location from squares.
 * Returns false if square invalid
 * @param {*} x
 * @param {*} y
 * @param {*} squares
 */
const fetchSquare = (x, y, squares) => squares.find((square) => square.x === x && square.y === y);

// check adjacent chairs
// each direction until edge
// return first seat '#'

const fetchSquareRay = (square, x, y, squares) => {
  const { x: currX, y: currY } = square;
  const newSquare = fetchSquare(currX + x, currY + y, squares);
  if (newSquare) {
    if (newSquare.element === "#") {
      // found occupied
      return 1;
    }
    if (newSquare.element === "L") {
      // found empty, phew
      return 0;
    }
    // else recurse
    return fetchSquareRay(newSquare, x, y, squares);
  }
  // hit edge
  return 0;
};

function broadcastOccupiedCheck(square, squares) {
  // check 8 points
  const occupied =
    fetchSquareRay(square, 0, +1, squares) +
    fetchSquareRay(square, 0, -1, squares) +
    fetchSquareRay(square, 1, 0, squares) +
    fetchSquareRay(square, 1, -1, squares) +
    fetchSquareRay(square, 1, +1, squares) +
    fetchSquareRay(square, -1, 0, squares) +
    fetchSquareRay(square, -1, +1, squares) +
    fetchSquareRay(square, -1, -1, squares);
  return occupied;
}

function round(squares) {
  const newSquares = squares.map((e) => Object.assign({}, e));
  squares.forEach((square) => {
    const { element, x, y } = square;
    // check seat status
    switch (element) {
      case ".": {
        // tile
        break;
      }
      case "L": {
        // empty seat
        // can we sit in it?
        if (!broadcastOccupiedCheck(square, squares)) {
          const square = newSquares.find((square) => square.x === x && square.y === y);
          if (square) {
            square.element = "#";
          }
        }
        break;
      }
      case "#": {
        // occupied
        // stand up?
        if (broadcastOccupiedCheck(square, squares) >= 5) {
          // yup.
          const square = newSquares.find((square) => square.x === x && square.y === y);
          if (square) {
            square.element = "L";
          }
        }
        break;
      }
    }
  });
  return newSquares;
}

let prevSquares = undefined;
let currentSquares = squares;
let counter = 0;

while (JSON.stringify(prevSquares) !== JSON.stringify(currentSquares) && counter < 100000) {
  prevSquares = currentSquares;
  currentSquares = round(currentSquares);
  counter++;
}

console.log(counter);

console.log(currentSquares.filter((square) => square.element === "#").length);
