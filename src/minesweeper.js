/*
Part 1:
const blankLine = '  |   |  ';
const guessLine = '1 |   |  ';
const bombLine = '  | B |  ';

console.log("This is what an empty board would look like:");
console.log(blankLine);
console.log(blankLine);
console.log(blankLine);

console.log("This is what a board with a guess and a bomb on it would look like:");
console.log(guessLine);
console.log(bombLine);
console.log(blankLine);
*/

// Part 2:
/*
const printBoard = (board) => {
  console.log("Current Board:");
  console.log(board[0].join(' | '));
  console.log(board[1].join(' | '));
  console.log(board[2].join(' | '));
};

let board = [[' ', ' ', ' '],
             [' ', ' ', ' '],
             [' ', ' ', ' ']];

printBoard(board);
board[0][1] = '1';
board[2][2] = 'B';
printBoard(board);
*/

//Part 3

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (var i = 0; i < numberOfRows; i++) {
  let row = [];
    for (var j = 0; j < numberOfColumns;j++) {
          row.push(' ');
    }
    board.push(row);
  }
	return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (var i = 0; i < numberOfRows; i++) {
  let row = [];
    for (var j = 0; j < numberOfColumns;j++) {
          row.push(null);
    }
    board.push(row);
  }

  numberOfBombsPlaced = 0;

  while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(numberOfRows * Math.random());
      let randomColumnIndex = Math.floor(numberOfColumns * Math.random());
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
      // The code in your while loop has the potential to place bombs on top of already existing bombs. This will be fixed when you learn about control flow.
  }
  return board;
};
// Part4 - step 5 - My solution:
/*
const getNumberOfNeighborBombs = (board, clickedTileRowIndex, clickedTileColumnIndex) => {
  let numberOfNeighborBombs = 0;

  if (board[clickedTileRowIndex][clickedTileColumnIndex] !== 'B') {
    for (var i = clickedTileRowIndex - 1; i <= clickedTileRowIndex + 1; i++) {
      if (i >= 0 && i < board.length){
        for (var j = clickedTileColumnIndex - 1; j <= clickedTileColumnIndex + 1; j++) {
          if (j >= 0 && j < board[clickedTileColumnIndex].length){
            if (board[i][j] === 'B') {
              numberOfNeighborBombs++;
            }
            //console.log(i + ' ' + j);
          }
        }
      }
    }
  } else {
    console.log('Bomb');
  }
  return numberOfNeighborBombs;
};
*/

// Part4 step 5 - CodeCademy solution:

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1, -1], [-1, 0], [-1, +1],
                           [0, -1], [0, +1], [+1, -1],
                           [+1, 0], [+1,  + 1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighborOffsets.forEach(offSet => {
    const neighborRowIndex = rowIndex + offSet[0];
    const neighborColumnIndex = columnIndex + offSet[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows
      && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!.');
    return;
  } else if (bombBoard[rowIndex][columnIndex] == 'B'){
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }

};

const printBoard = (board) => {
  console.log(
    board.map(row => row.join(' | ')).join('\n')
  );
};

let playerBoard = generatePlayerBoard(3,3);
let bombBoard = generateBombBoard(3,3,3);

console.log("Player Board: ");
printBoard(playerBoard);

console.log("Bomb Board: ");
printBoard(bombBoard);

//console.log(getNumberOfNeighborBombs(bombBoard, 0, 0));
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);
